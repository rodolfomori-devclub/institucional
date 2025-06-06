'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { sanityClient } from '@/lib/sanity'
import { markdownToPortableText } from '@/lib/markdownToPortableText'
import Image from 'next/image'

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
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const [publishSuccess, setPublishSuccess] = useState(false)

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

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishing(true)
    setPublishError('')
    setPublishSuccess(false)

    try {
      const doc = {
        _type: 'post',
        title,
        slug: {
          current: slug,
        },
        description,
        body: markdownToPortableText(body),
        publishedAt: new Date().toISOString(),
        author: author || undefined,
      }

      await sanityClient.create(doc)
      
      setPublishSuccess(true)
      setTitle('')
      setSlug('')
      setDescription('')
      setBody('')
      setAuthor('')
      
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Acesso Administrativo
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Faça login para gerenciar o blog
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{loginError}</p>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sair
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Criar Novo Post</h2>
          
          {publishSuccess && (
            <div className="mb-6 rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">Post publicado com sucesso!</p>
            </div>
          )}
          
          {publishError && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{publishError}</p>
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug (URL)
              </label>
              <input
                type="text"
                id="slug"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                URL do post: /blog/{slug}
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição (SEO)
              </label>
              <textarea
                id="description"
                rows={3}
                required
                maxLength={160}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                {description.length}/160 caracteres
              </p>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Autor (opcional)
              </label>
              <input
                type="text"
                id="author"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                Conteúdo do Post
              </label>
              <textarea
                id="body"
                rows={15}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Digite o conteúdo em Markdown. Use ![alt](url) para imagens."
              />
              <div className="mt-1 space-y-1 text-xs text-gray-500">
                <p>Formatação suportada:</p>
                <ul className="ml-4 space-y-0.5">
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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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