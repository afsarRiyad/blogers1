import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PopularPosts from './PopularPosts.jsx';


import TelegramCTA from './TelegramCTA.jsx';
import { getTags } from '../data/postsSupabase.js';

export default function Sidebar() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tagsList, setTagsList] = useState([]);

  useEffect(() => {
    async function loadTags() {
      try {
        const tags = await getTags();
        setTagsList(tags);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    }
    loadTags();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setQ('');
  };

  return (
    <aside className="space-y-5 lg:space-y-6">
     

      <TelegramCTA />

      <PopularPosts />

    </aside>
  );
}
