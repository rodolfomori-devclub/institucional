'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
    content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-8 mb-4 text-white">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h4>
                ),
                p: ({ children }) => (
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">{children}</p>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="text-gray-300">{children}</li>
                ),
                a: ({ href, children }) => {
                    const isExternal = href?.startsWith('http')
                    return (
                        <a
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="text-primary-600 hover:text-primary-700 underline"
                        >
                            {children}
                        </a>
                    )
                },
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary-600 pl-6 my-6 italic text-gray-400 bg-gray-800/50 py-2 pr-4 rounded-r-lg">
                        {children}
                    </blockquote>
                ),
                code: ({ className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const isInline = !match

                    if (isInline) {
                        return (
                            <code className="bg-gray-800 text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-700" {...props}>
                                {children}
                            </code>
                        )
                    }

                    return (
                        <div className="my-8 rounded-lg overflow-hidden border border-gray-700">
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        </div>
                    )
                },
                img: ({ src, alt }) => (
                    <div className="my-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={alt || ''}
                            className="rounded-lg w-full h-auto object-cover"
                            loading="lazy"
                        />
                        {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
                    </div>
                ),
                hr: () => <hr className="my-8 border-gray-700" />,
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
