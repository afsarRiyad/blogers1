import PostCard from './PostCard.jsx';

export default function PostGrid({ posts, columns = 2 }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns] || gridCols[2]} gap-3.5 sm:gap-4 lg:gap-5`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
