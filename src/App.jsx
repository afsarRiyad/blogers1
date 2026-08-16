import { Routes, Route } from 'react-router-dom'
import { ColorProvider } from './context/ColorContext.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Category from './pages/Category.jsx'
import SearchResults from './pages/SearchResults.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminPosts from './pages/admin/AdminPosts.jsx'
import PostForm from './pages/admin/PostForm.jsx'
import ColorSettings from './pages/admin/ColorSettings.jsx'

export default function App() {
  return (
    <ColorProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<PostDetails />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="posts/edit/:id" element={<PostForm />} />
          <Route path="color-settings" element={<ColorSettings />} />
          <Route path="categories" element={<div className="p-6"><h1 className="text-2xl font-bold">Categories Management</h1><p className="text-dark-600">Coming soon...</p></div>} />
          <Route path="tags" element={<div className="p-6"><h1 className="text-2xl font-bold">Tags Management</h1><p className="text-dark-600">Coming soon...</p></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-dark-600">Coming soon...</p></div>} />
        </Route>
      </Routes>
    </ColorProvider>
  )
}
