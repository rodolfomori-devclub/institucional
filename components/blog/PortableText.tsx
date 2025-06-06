'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="my-8">
          {value.filename && (
            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || 'javascript'}
            style={vscDarkPlus}
            className="!mt-0 !rounded-t-none"
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      )
    },
    youtube: ({ value }: any) => {
      const getYouTubeId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = url.match(regex)
        return match ? match[1] : null
      }
      
      const videoId = getYouTubeId(value.url)
      if (!videoId) return null
      
      return (
        <div className="my-8 relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-lg"
          />
        </div>
      )
    },
    embed: ({ value }: any) => {
      const { url, type } = value
      
      if (type === 'twitter') {
        return (
          <div className="my-8">
            <blockquote className="twitter-tweet">
              <a href={url}>Loading tweet...</a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" />
          </div>
        )
      }
      
      if (type === 'codepen') {
        const getPenId = (url: string) => {
          const match = url.match(/codepen\.io\/[\w-]+\/pen\/([\w-]+)/)
          return match ? match[1] : null
        }
        const penId = getPenId(url)
        if (!penId) return null
        
        return (
          <div className="my-8">
            <iframe
              height="400"
              style={{ width: '100%' }}
              scrolling="no"
              title="CodePen Embed"
              src={`https://codepen.io/anon/embed/${penId}?default-tab=html%2Cresult`}
              frameBorder="no"
              loading="lazy"
              allowFullScreen
            />
          </div>
        )
      }
      
      if (type === 'codesandbox') {
        return (
          <div className="my-8">
            <iframe
              src={url.replace('s.csb.app', 's.csb.app/embed')}
              style={{ width: '100%', height: '500px', border: '0', borderRadius: '8px', overflow: 'hidden' }}
              title="CodeSandbox"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        )
      }
      
      if (type === 'gist') {
        const getGistId = (url: string) => {
          const match = url.match(/gist\.github\.com\/[\w-]+\/([\w]+)/)
          return match ? match[1] : null
        }
        const gistId = getGistId(url)
        if (!gistId) return null
        
        return (
          <div className="my-8">
            <script src={`https://gist.github.com/${gistId}.js`} />
          </div>
        )
      }
      
      return null
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-600 pl-6 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
}

export default function PortableText({ value }: { value: any[] }) {
  return <PortableTextComponent value={value} components={components} />
}