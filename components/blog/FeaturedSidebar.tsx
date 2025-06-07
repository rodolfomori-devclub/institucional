import PostCard from './PostCard'
import { Post } from '@/lib/sanity'

interface FeaturedSidebarProps {
  posts: Post[]
}

export default function FeaturedSidebar({ posts }: FeaturedSidebarProps) {
  if (!posts.length) return null

  return (
    <aside className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="sticky top-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Posts em Destaque
        </h2>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      </div>
    </aside>
  )
}