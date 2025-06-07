'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import Image from 'next/image'
import { blogPostPrompt } from '@/lib/ai-blog-prompt'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [featured, setFeatured] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const [publishSuccess, setPublishSuccess] = useState(false)
  
  const [aiTopic, setAiTopic] = useState('')
  const [generatingAI, setGeneratingAI] = useState(false)
  const [aiError, setAiError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const generateSlug = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    setSlug(generateSlug(title))
  }, [title])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setLoginError('Email ou senha inválidos')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) {
      setAiError('Por favor, insira um tema para o post')
      return
    }

    setGeneratingAI(true)
    setAiError('')

    try {
      const response = await fetch('/api/ia-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: aiTopic }),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar post com IA')
      }

      const data = await response.json()
      
      setTitle(data.title)
      setSlug(data.slug)
      setDescription(data.excerpt)
      setBody(data.content)
      setAiTopic('')
    } catch (error) {
      console.error('Error generating with AI:', error)
      setAiError('Erro ao gerar post com IA. Tente novamente.')
    } finally {
      setGeneratingAI(false)
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishing(true)
    setPublishError('')
    setPublishSuccess(false)

    try {
      const response = await fetch('/api/publish-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          body,
          author,
          featured,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erro ao publicar post')
      }
      
      setPublishSuccess(true)
      setTitle('')
      setSlug('')
      setDescription('')
      setBody('')
      setAuthor('')
      setFeatured(false)
      
      setTimeout(() => {
        setPublishSuccess(false)
      }, 5000)
    } catch (error: any) {
      console.error('Error publishing post:', error)
      setPublishError('Erro ao publicar post. Verifique as configurações do Sanity.')
    } finally {
      setPublishing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Acesso Administrativo
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Faça login para gerenciar o blog
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="rounded-md bg-red-900/20 border border-red-900/50 p-4">
                <p className="text-sm text-red-400">{loginError}</p>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-6 text-white">Criar Novo Post</h2>
          
          {publishSuccess && (
            <div className="mb-6 rounded-md bg-green-900/20 border border-green-900/50 p-4">
              <p className="text-sm text-green-400">Post publicado com sucesso!</p>
            </div>
          )}
          
          {publishError && (
            <div className="mb-6 rounded-md bg-red-900/20 border border-red-900/50 p-4">
              <p className="text-sm text-red-400">{publishError}</p>
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Título
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                Slug (URL)
              </label>
              <input
                type="text"
                id="slug"
                required
                className="mt-1 block w-full rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-400">
                URL do post: /blog/{slug}
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Descrição (SEO)
              </label>
              <textarea
                id="description"
                rows={3}
                required
                maxLength={160}
                className="mt-1 block w-full rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-400">
                {description.length}/160 caracteres
              </p>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                Autor (opcional)
              </label>
              <input
                type="text"
                id="author"
                className="mt-1 block w-full rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 bg-gray-700 rounded"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-300">
                  Post em destaque
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Posts em destaque aparecem na sidebar e podem ser exibidos como post principal
              </p>
            </div>

            <div className="border border-gray-600 rounded-lg p-6 bg-gray-750 space-y-4">
              <h3 className="text-lg font-medium text-white">Gerar Post com IA</h3>
              <p className="text-sm text-gray-400">
                Digite o tema do post e deixe a IA criar um conteúdo otimizado para SEO.
              </p>
              
              {aiError && (
                <div className="rounded-md bg-red-900/20 border border-red-900/50 p-3">
                  <p className="text-sm text-red-400">{aiError}</p>
                </div>
              )}
              
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ex: Como usar React Hooks"
                  className="flex-1 rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleGenerateWithAI()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleGenerateWithAI}
                  disabled={generatingAI || !aiTopic.trim()}
                  className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingAI ? 'Gerando...' : 'Gerar com IA'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-300">
                Conteúdo do Post
              </label>
              <textarea
                id="body"
                rows={15}
                required
                className="mt-1 block w-full rounded-md px-4 py-3 border border-gray-600 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200 text-base font-mono"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Digite o conteúdo em Markdown. Use ![alt](url) para imagens."
              />
              <div className="mt-1 space-y-1 text-xs text-gray-400">
                <p>Formatação suportada:</p>
                <ul className="ml-4 space-y-0.5 text-gray-500">
                  <li>• Parágrafos: separe com linha em branco</li>
                  <li>• Títulos: ## Título</li>
                  <li>• Negrito: **texto**</li>
                  <li>• Itálico: *texto*</li>
                  <li>• Links: [texto](url)</li>
                  <li>• Imagens: ![descrição](url)</li>
                  <li>• Listas: - item ou 1. item</li>
                  <li>• Código: `código` ou ```linguagem</li>
                </ul>
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                disabled={publishing}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {publishing ? 'Publicando...' : 'Publicar Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}