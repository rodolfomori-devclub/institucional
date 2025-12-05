'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, Plus, RefreshCw, Search, Trash2, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Post {
    id: string
    title: string
    description: string
    content: string
    status: 'draft' | 'published' | 'generate' | 'failed'
    createdAt: any
    updatedAt: any
    publishedAt?: any
    subject?: string
    slug?: string
}

interface PostsListProps {
    category?: string
}

export default function PostsList({ category }: PostsListProps) {
    const router = useRouter()

    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPosts, setSelectedPosts] = useState<string[]>([])
    const [publishingPosts, setPublishingPosts] = useState<string[]>([])
    const [deletingPosts, setDeletingPosts] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState<'draft' | 'published'>('draft')
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch posts from API
    const fetchPosts = async () => {
        setLoading(true)
        try {
            const categoryParam = category ? `&category=${category}` : ''
            const response = await fetch(`/api/posts?status=${activeTab}${categoryParam}`)
            const data = await response.json()

            if (data.success) {
                setPosts(data.posts)
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error fetching posts:', error)
            toast.error('Falha ao carregar posts')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
        setSelectedPosts([]) // Clear selection when switching tabs
        setSearchTerm('') // Clear search when switching tabs
    }, [activeTab])

    // Handle individual post selection
    const handlePostSelect = (postId: string) => {
        setSelectedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        )
    }

    // Handle select all
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const allSelected = filteredPosts.length > 0 && filteredPosts.every(post => selectedPosts.includes(post.id))

        if (allSelected) {
            setSelectedPosts([])
        } else {
            setSelectedPosts(filteredPosts.map(post => post.id))
        }
    }

    // Publish selected posts
    const handlePublishSelected = async () => {
        if (selectedPosts.length === 0) return

        setPublishingPosts(selectedPosts)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'publish',
                    postIds: selectedPosts
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success(`${data.summary.success} posts publicados com sucesso`)

                // Remove published posts from local state
                setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)))
                setSelectedPosts([])
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error publishing posts:', error)
            toast.error('Falha ao publicar posts')
        } finally {
            setPublishingPosts([])
        }
    }

    // Publish all draft posts
    const handlePublishAll = async () => {
        const draftPosts = posts.filter(post => post.status === 'draft')
        const draftPostIds = draftPosts.map(post => post.id)

        if (draftPostIds.length === 0) {
            toast.error('Nenhum post em rascunho para publicar')
            return
        }

        setPublishingPosts(draftPostIds)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'publish',
                    postIds: draftPostIds
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success(`${data.summary.success} posts publicados com sucesso`)

                // Remove published posts from local state
                setPosts(prev => prev.filter(post => post.status !== 'draft'))
                setSelectedPosts([])
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error publishing all posts:', error)
            toast.error('Falha ao publicar todos os posts')
        } finally {
            setPublishingPosts([])
        }
    }

    // Delete selected posts
    const handleDeleteSelected = async () => {
        if (selectedPosts.length === 0) return

        const confirmed = confirm(`Tem certeza que deseja deletar ${selectedPosts.length} post(s)?`)
        if (!confirmed) return

        setDeletingPosts(selectedPosts)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    postIds: selectedPosts
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success(`${data.summary.success} posts deletados com sucesso`)

                // Remove deleted posts from local state
                setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)))
                setSelectedPosts([])
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error deleting posts:', error)
            toast.error('Falha ao deletar posts')
        } finally {
            setDeletingPosts([])
        }
    }

    // Individual post actions
    const handlePreview = (post: Post) => {
        // Store post data in sessionStorage for preview page
        sessionStorage.setItem('previewPost', JSON.stringify(post))
        router.push(`/admin/posts/preview/${post.id}`)
    }

    const handlePublishSingle = async (postId: string) => {
        setPublishingPosts([postId])

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'publish',
                    postIds: [postId]
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success('Post publicado com sucesso')

                // Remove published post from local state
                setPosts(prev => prev.filter(post => post.id !== postId))
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error publishing post:', error)
            toast.error('Falha ao publicar post')
        } finally {
            setPublishingPosts(prev => prev.filter(id => id !== postId))
        }
    }

    const handleDeleteSingle = async (postId: string) => {
        const confirmed = confirm('Tem certeza que deseja deletar este post?')
        if (!confirmed) return

        setDeletingPosts([postId])

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    postIds: [postId]
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success('Post deletado com sucesso')

                // Remove deleted post from local state
                setPosts(prev => prev.filter(post => post.id !== postId))
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error deleting post:', error)
            toast.error('Falha ao deletar post')
        } finally {
            setDeletingPosts(prev => prev.filter(id => id !== postId))
        }
    }

    // Get status badge variant
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'draft':
                return <Badge variant="secondary">Rascunho</Badge>
            case 'published':
                return <Badge variant="default">Publicado</Badge>
            case 'generate':
                return <Badge variant="outline">Gerando...</Badge>
            case 'failed':
                return <Badge variant="destructive">Falhou</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    // Truncate text
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    // Filter and Sort Posts
    const filteredPosts = posts
        .filter(post => {
            // Filter by status (already done by API but good for safety)
            if (post.status !== activeTab) return false

            // Filter by search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase()
                return post.title.toLowerCase().includes(term) ||
                    (post.description && post.description.toLowerCase().includes(term))
            }
            return true
        })
        .sort((a, b) => {
            // Sort by date (newest first)
            const dateA = new Date(a.publishedAt || a.createdAt).getTime()
            const dateB = new Date(b.publishedAt || b.createdAt).getTime()
            return dateB - dateA
        })

    const allSelected = filteredPosts.length > 0 && filteredPosts.every(post => selectedPosts.includes(post.id))

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {category === 'newsletter' ? 'Gerenciar Newsletter' : 'Gerenciar Posts'}
                    </h1>
                    <p className="text-muted-foreground">
                        {category === 'newsletter' ? 'Gerencie suas newsletters' : 'Gerencie todos os seus posts'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={fetchPosts}
                        disabled={loading}
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Atualizar
                    </Button>
                    <Link href="/admin/posts/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 border-b">
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'draft'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    onClick={() => setActiveTab('draft')}
                >
                    Rascunhos
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'published'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    onClick={() => setActiveTab('published')}
                >
                    Publicados
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar por título..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {selectedPosts.length} post(s) selecionado(s)
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handlePublishSelected}
                                    disabled={publishingPosts.length > 0 || activeTab === 'published'}
                                    className={activeTab === 'published' ? 'hidden' : ''}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Publicar Selecionados
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={handleDeleteSelected}
                                    disabled={deletingPosts.length > 0}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Deletar Selecionados
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Actions */}
            {activeTab === 'draft' && filteredPosts.length > 0 && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                {filteredPosts.length} post(s) em rascunho
                            </span>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handlePublishAll}
                                disabled={publishingPosts.length > 0}
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Publicar Todos</span>
                                <span className="sm:hidden">Publicar</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Posts Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Posts {activeTab === 'draft' ? 'em Rascunho' : 'Publicados'}</CardTitle>
                    <CardDescription>
                        Lista de todos os posts {activeTab === 'draft' ? 'que estão aguardando publicação' : 'publicados no blog'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Nenhum post encontrado com este filtro' : 'Nenhum post encontrado'}
                            </p>
                            {activeTab === 'draft' && !searchTerm && (
                                <Link href="/admin/posts/create">
                                    <Button className="mt-4">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Criar Primeiro Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead className="w-32">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPosts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedPosts.includes(post.id)}
                                                onChange={() => handlePostSelect(post.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {truncateText(post.title, 60)}
                                        </TableCell>
                                        <TableCell>
                                            {truncateText(post.description || 'Sem descrição', 80)}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(post.status)}
                                        </TableCell>
                                        <TableCell>
                                            {post.publishedAt
                                                ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                                                : (post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : 'N/A')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handlePreview(post)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                {post.status === 'draft' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handlePublishSingle(post.id)}
                                                        disabled={publishingPosts.includes(post.id)}
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteSingle(post.id)}
                                                    disabled={deletingPosts.includes(post.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}