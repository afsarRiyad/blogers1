import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Category from './pages/Category.jsx'
import SearchResults from './pages/SearchResults.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="post/:slug" element={<PostDetails />} />
        <Route path="category/:slug" element={<Category />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
