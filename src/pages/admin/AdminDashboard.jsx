import { useState, useEffect } from 'react';
import { 
  FileText, 
  FolderOpen, 
  Tag as TagIcon, 
  Eye, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts, getCategories, getTags } from '../../data/postsSupabase.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    totalTags: 0,
    totalViews: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [posts, categories, tags] = await Promise.all([
          getPosts(),
          getCategories(),
          getTags()
        ]);

        const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

        setStats({
          totalPosts: posts.length,
          totalCategories: categories.length,
          totalTags: tags.length,
          totalViews
        });

        setRecentPosts(posts.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/posts'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FolderOpen,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/categories'
    },
    {
      title: 'Tags',
      value: stats.totalTags,
      icon: TagIcon,
      color: 'from-green-500 to-green-600',
      link: '/admin/tags'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
      link: null
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-dark-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900">
            Dashboard
          </h1>
          <p className="text-sm text-dark-600 mt-1">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link || '#'}
            className={`
              relative overflow-hidden rounded-2xl p-6
              bg-gradient-to-br ${stat.color}
              text-white shadow-lg hover:shadow-xl transition-all
              ${stat.link ? 'hover:-translate-y-1 cursor-pointer' : 'cursor-default'}
            `}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.link && (
                  <ArrowRight className="w-5 h-5 opacity-60" />
                )}
              </div>
              <p className="text-sm font-medium opacity-90 mb-1">{stat.title}</p>
              <p className="text-3xl font-extrabold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl border border-dark-200 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-dark-200">
          <h2 className="text-lg font-extrabold text-dark-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Recent Posts
          </h2>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="divide-y divide-dark-100">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-6 hover:bg-dark-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-dark-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-dark-900 line-clamp-1 mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-dark-600 line-clamp-2 mb-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-dark-500">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views?.toLocaleString() || 0} views
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-dark-100 text-dark-600">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-dark-200 text-sm font-medium text-dark-700 hover:bg-dark-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-dark-300 mx-auto mb-3" />
            <p className="text-dark-600 mb-4">No posts yet. Create your first post!</p>
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-6">
        <h3 className="font-bold text-dark-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/admin/posts/new"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-dark-200 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="p-2 bg-primary-100 rounded-lg">
              <Plus className="w-5 h-5 text-primary-600" />
            </div>
            <span className="font-medium text-dark-900">Create New Post</span>
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-dark-200 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <FolderOpen className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-medium text-dark-900">Manage Categories</span>
          </Link>
          <Link
            to="/admin/tags"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-dark-200 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <TagIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-dark-900">Manage Tags</span>
          </Link>
        </div>
      </div>
    </div>
  );
}