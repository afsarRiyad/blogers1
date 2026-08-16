import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Filter,
  FileText
} from 'lucide-react';
import { getPosts, clearCache } from '../../data/postsSupabase.js';
import { postsService } from '../../services/supabaseService.js';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchQuery || categoryFilter !== 'all') {
      const filtered = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             post.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
        return matchesSearch && matchesCategory;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, categoryFilter, posts]);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await postsService.delete(postId);
      clearCache();
      await loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-dark-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  const EmptyState = () => (
    <div className="p-8 sm:p-12 text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-dark-400" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-dark-900 mb-2">
        {searchQuery || categoryFilter !== 'all' ? 'No posts found' : 'No posts yet'}
      </h3>
      <p className="text-sm text-dark-600 mb-4">
        {searchQuery || categoryFilter !== 'all' 
          ? 'Try adjusting your search or filters' 
          : 'Create your first blog post to get started'}
      </p>
      {!searchQuery && categoryFilter === 'all' && (
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      )}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark-900">
            Posts
          </h1>
          <p className="text-xs sm:text-sm text-dark-600 mt-1">
            Manage and edit your blog posts
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center text-sm sm:text-base active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-dark-200 p-3 sm:p-4 md:p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="relative sm:w-48 w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-400 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none bg-white text-sm sm:text-base"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts — card list on mobile, table from sm up */}
      {filteredPosts.length > 0 ? (
        <>
          {/* Mobile cards (< sm) */}
          <div className="sm:hidden space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-dark-200 shadow-soft p-3"
              >
                <div className="flex gap-3">
                  <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-dark-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-dark-900 text-sm line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-medium">
                        {post.category || 'Uncategorized'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-dark-500">
                        <Eye className="w-3 h-3" />
                        {post.views?.toLocaleString() || 0}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-dark-500">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dark-100">
                  <Link
                    to={`/post/${post.slug}`}
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-dark-50 text-dark-700 text-xs font-medium active:scale-[0.98] transition-transform"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary-50 text-primary-600 text-xs font-medium active:scale-[0.98] transition-transform"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-medium active:scale-[0.98] transition-transform"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table (sm and up) */}
          <div className="hidden sm:block bg-white rounded-2xl border border-dark-200 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead className="bg-dark-50 border-b border-dark-200">
                  <tr>
                    <th className="px-3 md:px-4 lg:px-6 py-3 lg:py-4 text-left text-[10px] md:text-xs font-bold text-dark-700 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-3 md:px-4 lg:px-6 py-3 lg:py-4 text-left text-[10px] md:text-xs font-bold text-dark-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="hidden md:table-cell px-3 md:px-4 lg:px-6 py-3 lg:py-4 text-left text-[10px] md:text-xs font-bold text-dark-700 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="hidden lg:table-cell px-3 md:px-4 lg:px-6 py-3 lg:py-4 text-left text-[10px] md:text-xs font-bold text-dark-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 md:px-4 lg:px-6 py-3 lg:py-4 text-right text-[10px] md:text-xs font-bold text-dark-700 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-100">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-dark-50 transition-colors">
                      <td className="px-3 md:px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-dark-100">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1 max-w-[220px] md:max-w-xs lg:max-w-sm">
                            <h3 className="font-bold text-dark-900 line-clamp-1 text-xs md:text-sm">
                              {post.title}
                            </h3>
                            <p className="text-[10px] md:text-xs text-dark-500 line-clamp-1 hidden md:block">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 lg:px-6 py-3 lg:py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-50 text-primary-700 text-[10px] md:text-xs font-medium whitespace-nowrap">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 md:px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-dark-600">
                          <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          {post.views?.toLocaleString() || 0}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-3 md:px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-dark-600">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </td>
                      <td className="px-3 md:px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center justify-end gap-1 md:gap-1.5 lg:gap-2">
                          <Link
                            to={`/post/${post.slug}`}
                            target="_blank"
                            className="p-1.5 md:p-2 rounded-lg hover:bg-dark-100 text-dark-600 transition-colors"
                            title="View post"
                          >
                            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Link>
                          <Link
                            to={`/admin/posts/edit/${post.id}`}
                            className="p-1.5 md:p-2 rounded-lg hover:bg-primary-50 text-primary-600 transition-colors"
                            title="Edit post"
                          >
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 md:p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            title="Delete post"
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-dark-200 shadow-soft overflow-hidden">
          <EmptyState />
        </div>
      )}
    </div>
  );
}