'use client'

import { useState, useEffect } from 'react'
import { generateSEO } from '@/components/SEO'
import { sanityClient, postsQuery, featuredPostsQuery, mainFeaturedPostQuery, searchPostsQuery, type Post } from '@/lib/sanity'
import FeaturedPost from '@/components/blog/FeaturedPost'
import FeaturedSidebar from '@/components/blog/FeaturedSidebar'
import SearchBar from '@/components/blog/SearchBar'
import PostCard from '@/components/blog/PostCard'

const POSTS_PER_PAGE = 9

export default function BlogPage() {
  const [mainFeaturedPost, setMainFeaturedPost] = useState<Post | null>(null)
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      
      // Buscar post principal em destaque
      const mainFeatured = await sanityClient.fetch(mainFeaturedPostQuery)
      
      // Buscar posts em destaque para sidebar (excluindo o principal)
      const featured = await sanityClient.fetch(featuredPostsQuery)
      const sidebarFeatured = featured.filter((post: Post) => post._id !== mainFeatured?._id)
      
      // Buscar posts recentes (excluindo os em destaque)
      const featuredIds = featured.map((post: Post) => post._id)
      const recentPosts = await sanityClient.fetch(
        `*[_type == "post" && !(_id in $featuredIds)] | order(publishedAt desc) [0...${POSTS_PER_PAGE}] {
          _id, title, slug, description, mainImage, thumbnail, generatedImageUrl, publishedAt, author, featured
        }`,
        { featuredIds }
      )
      
      setMainFeaturedPost(mainFeatured)
      setFeaturedPosts(sidebarFeatured)
      setPosts(recentPosts)
      setDisplayedPosts(recentPosts)
      setHasMore(recentPosts.length === POSTS_PER_PAGE)
      setPage(1)
    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchTerm('')
      setDisplayedPosts(posts)
      setHasMore(posts.length === POSTS_PER_PAGE)
      return
    }

    try {
      setLoading(true)
      setSearchTerm(term)
      
      const searchResults = await sanityClient.fetch(searchPostsQuery, {
        searchTerm: `*${term}*`
      })
      
      setDisplayedPosts(searchResults)
      setHasMore(false) // Não há paginação na pesquisa
    } catch (error) {
      console.error('Error searching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore || searchTerm) return

    try {
      setLoadingMore(true)
      
      const start = page * POSTS_PER_PAGE
      const end = start + POSTS_PER_PAGE
      
      const featuredIds = [mainFeaturedPost?._id, ...featuredPosts.map(p => p._id)].filter(Boolean)
      
      const morePosts = await sanityClient.fetch(
        `*[_type == "post" && !(_id in $featuredIds)] | order(publishedAt desc) [${start}...${end}] {
          _id, title, slug, description, mainImage, thumbnail, generatedImageUrl, publishedAt, author, featured
        }`,
        { featuredIds }
      )
      
      setDisplayedPosts(prev => [...prev, ...morePosts])
      setHasMore(morePosts.length === POSTS_PER_PAGE)
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading && !displayedPosts.length) {
    return (
      <section className="min-h-screen py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Carregando...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Blog DevClub
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Artigos, tutoriais e novidades sobre programação e tecnologia
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <main className="flex-1">
              {/* Post principal em destaque */}
              {mainFeaturedPost && !searchTerm && (
                <div className="mb-12">
                  <FeaturedPost post={mainFeaturedPost} />
                </div>
              )}

              {/* Barra de pesquisa */}
              <div className="mb-12">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Últimos artigos */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    {searchTerm ? `Resultados para "${searchTerm}"` : 'Últimos Artigos'}
                  </h2>
                  <div className="h-1 flex-1 ml-8 bg-gradient-to-r from-primary-600 to-transparent rounded-full"></div>
                </div>
                
                {displayedPosts.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xl">
                      {searchTerm ? 'Nenhum artigo encontrado.' : 'Nenhum artigo disponível.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedPosts.map((post) => (
                      <PostCard key={post._id} post={post} size="medium" />
                    ))}
                  </div>
                )}
              </div>

              {/* Botão carregar mais */}
              {hasMore && !searchTerm && (
                <div className="text-center">
                  <button
                    onClick={loadMorePosts}
                    disabled={loadingMore}
                    className="relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-primary-800 disabled:to-primary-900 text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none group"
                  >
                    <span className="flex items-center gap-2">
                      {loadingMore ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                          Carregando...
                        </>
                      ) : (
                        <>
                          Carregar Mais
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              )}
            </main>

            {/* Sidebar */}
            <FeaturedSidebar posts={featuredPosts} />
          </div>
        </div>
      </div>
    </section>
  )
}