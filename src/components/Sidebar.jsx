import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PopularPosts from './PopularPosts.jsx';


import TelegramCTA from './TelegramCTA.jsx';
import { tagsList } from '../data/posts.js';

export default function Sidebar() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setQ('');
  };

  return (
    <aside className="space-y-5 lg:space-y-6 sticky top-24 self-start">
     

      <TelegramCTA />

      <PopularPosts />

     

     
    </aside>
  );
}
