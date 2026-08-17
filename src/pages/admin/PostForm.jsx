import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save,
  X,
  Upload,
  Plus,
  Trash2,
  Eye,
  Check,
  ExternalLink,
  Copy,
  LayoutTemplate
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postsService, categoriesService } from '../../services/supabaseService.js';
import { getCategories, clearCache } from '../../data/postsSupabase.js';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    author: 'TechZone BD',
    featured: false,
    published: true,
    thumbnail_url: '',
    push_form_heading: '',
    push_form_subheading: '',
    push_form_buttons: []
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const cats = await getCategories();
      console.log('Loaded categories:', cats);
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const postData = await postsService.getById(id);

      if (postData) {
        const promptData = await promptsService.getByPostId(id);

        setFormData({
          title: postData.title || '',
          slug: postData.slug || '',
          description: postData.description || '',
          category_id: postData.category_id || '',
          author: postData.author || 'TechZone BD',
          featured: postData.featured || false,
          published: postData.published !== false,
          thumbnail_url: postData.thumbnail_url || '',
          push_form_heading: postData.push_form_heading || '',
          push_form_subheading: postData.push_form_subheading || '',
          push_form_buttons: postData.push_form_buttons?.map(btn => ({
            ...btn,
            emoji: btn.emoji || '🔗'
          })) || []
        });

        setImagePreview(postData.thumbnail_url || '');
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addButton = (type) => {
    const newButton = {
      type: type,
      text: '',
      emoji: type === 'link' ? '🔗' : undefined,
      copyText: type === 'copy' ? '' : undefined,
      url: type === 'link' ? '' : undefined,
      backgroundColor: '',
      textColor: ''
    };
    setFormData(prev => ({
      ...prev,
      push_form_buttons: [...prev.push_form_buttons, newButton]
    }));
  };

  const updateButton = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      push_form_buttons: prev.push_form_buttons.map((btn, i) =>
        i === index ? { ...btn, [field]: value } : btn
      )
    }));
  };

  const removeButton = (index) => {
    setFormData(prev => ({
      ...prev,
      push_form_buttons: prev.push_form_buttons.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      const tempId = id || 'temp';
      const imageUrl = await postsService.uploadThumbnail(file, tempId);
      
      setFormData(prev => ({ ...prev, thumbnail_url: imageUrl }));
      setImagePreview(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (!formData.thumbnail_url) newErrors.thumbnail_url = 'Thumbnail image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      const postData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        category_id: formData.category_id,
        author: formData.author,
        featured: formData.featured,
        published: formData.published,
        thumbnail_url: formData.thumbnail_url,
        push_form_heading: formData.push_form_heading,
        push_form_subheading: formData.push_form_subheading,
        push_form_buttons: formData.push_form_buttons
      };

      let savedPost;
      if (isEditing) {
        savedPost = await postsService.update(id, postData);
      } else {
        savedPost = await postsService.create(postData);
      }

      clearCache();
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      console.error('Error details:', error.message);
      console.error('Error code:', error.code);
      alert(`Failed to save post: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/posts')}
          className="inline-flex items-center gap-2 text-dark-600 hover:text-dark-900 transition-colors"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-sm text-dark-600 mt-1">
              {isEditing ? 'Update your blog post' : 'Create a new blog post'}
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r-from-primary text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{isEditing ? 'Update' : 'Publish'}</span>
              </>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.title ? 'border-red-500' : 'border-dark-200'
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-900`}
                placeholder="Enter post title..."
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.slug ? 'border-red-500' : 'border-dark-200'
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-900`}
                placeholder="post-url-slug"
              />
              {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Description *
              </label>
              <div className={`rounded-xl border ${
                errors.description ? 'border-red-500' : 'border-dark-200'
              } focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all`}>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  placeholder="Brief description of the post..."
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link'],
                      ['clean']
                    ],
                    clipboard: {
                      matchVisual: false,
                    }
                  }}
                  formats={[
                    'header', 'bold', 'italic', 'underline', 'strike',
                    'color', 'background', 'list', 'bullet', 'link'
                  ]}
                  className="min-h-[120px]"
                />
              </div>
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              <p className="text-xs text-dark-500 mt-2">
                Add links, bold text, highlights, and formatting to make your description more engaging.
              </p>
            </div>

            {/* Push Form Dashboard Options */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft space-y-4">
              <label className="text-sm font-bold text-dark-900 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4" />
                Redirect URL or Copy Link Buttons
              </label>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  name="push_form_heading"
                  value={formData.push_form_heading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  placeholder="e.g., Shazam Premium APK"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2">
                  Subheading (Optional)
                </label>
                <textarea
                  name="push_form_subheading"
                  value={formData.push_form_subheading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                  rows={2}
                  placeholder="e.g., Download the latest version"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2">
                  Buttons
                </label>
                <div className="space-y-3">
                  {formData.push_form_buttons.map((button, index) => (
                    <div key={index} className="p-4 rounded-xl border border-dark-200 bg-dark-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {button.type === 'link' ? (
                            <ExternalLink className="w-4 h-4 text-primary-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-primary-600" />
                          )}
                          <span className="text-sm font-bold text-dark-900">
                            {button.type === 'link' ? 'Link Button' : 'Copy Button'} #{index + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeButton(index)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {button.type === 'link' && (
                          <>
                            <div>
                              <label className="block text-xs font-bold text-dark-900 mb-1">
                                Emoji
                              </label>
                              <select
                                value={button.emoji || '🔗'}
                                onChange={(e) => updateButton(index, 'emoji', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                              >
                                <option value="🔗">🔗 Link</option>
                                <option value="📥">📥 Download</option>
                                <option value="🎁">🎁 Gift</option>
                                <option value="🚀">🚀 Rocket</option>
                                <option value="⭐">⭐ Star</option>
                                <option value="💎">💎 Diamond</option>
                                <option value="🔥">🔥 Fire</option>
                                <option value="✨">✨ Sparkles</option>
                                <option value="🎯">🎯 Target</option>
                                <option value="📱">📱 Mobile</option>
                                <option value="💻">💻 Computer</option>
                                <option value="🎮">🎮 Gaming</option>
                                <option value="🎵">🎵 Music</option>
                                <option value="📷">📷 Camera</option>
                                <option value="🎧">🎧 Headphones</option>
                                <option value="⚡">⚡ Lightning</option>
                                <option value="🌟">🌟 Glowing Star</option>
                                <option value="💡">💡 Light Bulb</option>
                                <option value="🎪">🎪 Circus</option>
                                <option value="🎨">🎨 Art</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-dark-900 mb-1">
                                Button Text
                              </label>
                              <input
                                type="text"
                                value={button.text}
                                onChange={(e) => updateButton(index, 'text', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                                placeholder="e.g., Download Now"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-dark-900 mb-1">
                                URL
                              </label>
                              <input
                                type="url"
                                value={button.url || ''}
                                onChange={(e) => updateButton(index, 'url', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                                placeholder="https://example.com"
                              />
                            </div>
                          </>
                        )}

                        {button.type === 'copy' && (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-dark-900 mb-1">
                              Text to Copy
                            </label>
                            <input
                              type="text"
                              value={button.copyText || ''}
                              onChange={(e) => updateButton(index, 'copyText', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                              placeholder="e.g., https://example.com"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-dark-900 mb-1">
                            Background Color
                          </label>
                          <input
                            type="color"
                            value={button.backgroundColor || '#0ea5e9'}
                            onChange={(e) => updateButton(index, 'backgroundColor', e.target.value)}
                            className="w-full h-10 rounded-lg border border-dark-200 cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-dark-900 mb-1">
                            Text Color
                          </label>
                          <input
                            type="color"
                            value={button.textColor || '#ffffff'}
                            onChange={(e) => updateButton(index, 'textColor', e.target.value)}
                            className="w-full h-10 rounded-lg border border-dark-200 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addButton('link')}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dark-200 text-dark-700 text-sm font-medium hover:bg-dark-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Add Link Button
                    </button>
                    <button
                      type="button"
                      onClick={() => addButton('copy')}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dark-200 text-dark-700 text-sm font-medium hover:bg-dark-50 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Add Copy Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Thumbnail Upload */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Thumbnail Image *
              </label>
              
              {imagePreview || formData.thumbnail_url ? (
                <div className="relative mb-4">
                  <img
                    src={imagePreview || formData.thumbnail_url}
                    alt="Thumbnail preview"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, thumbnail_url: '' }));
                      setImagePreview('');
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-dark-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                  <Upload className="w-8 h-8 text-dark-400 mx-auto mb-2" />
                  <p className="text-sm text-dark-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-dark-500 mb-4">
                    PNG, JPG up to 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Choose File
                      </>
                    )}
                  </label>
                </div>
              )}
              
              {!imagePreview && !formData.thumbnail_url && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="thumbnail-upload-main"
                />
              )}
              
              {errors.thumbnail_url && <p className="text-red-600 text-sm mt-1">{errors.thumbnail_url}</p>}
            </div>

            {/* Category */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.category_id ? 'border-red-500' : 'border-dark-200'
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none bg-white`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id || cat.slug} value={cat.id || cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-600 text-sm mt-1">{errors.category_id}</p>}
            </div>

            {/* Author */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft">
              <label className="block text-sm font-bold text-dark-900 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-900"
              />
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl border border-dark-200 p-6 shadow-soft space-y-4">
              <label className="text-sm font-bold text-dark-900">
                Post Options
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-dark-700">Featured post</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-dark-700">Published</span>
              </label>

            </div>

            {/* Preview Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-colors"
            >
              <Eye className="w-5 h-5" />
              Preview Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}