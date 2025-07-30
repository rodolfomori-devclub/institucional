'use client'

import { memo } from 'react'
import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'

interface MarkdownPreviewProps {
    content: string
    className?: string
}

const MarkdownPreview = memo(({ content, className = '' }: MarkdownPreviewProps) => {
    const components = {
        // Headings
        h1: ({ children }: any) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground first:mt-0">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h4>
        ),
        h5: ({ children }: any) => (
            <h5 className="text-lg font-bold mt-4 mb-2 text-foreground">{children}</h5>
        ),
        h6: ({ children }: any) => (
            <h6 className="text-base font-bold mt-4 mb-2 text-foreground">{children}</h6>
        ),

        // Paragraphs
        p: ({ children }: any) => (
            <p className="text-base text-muted-foreground leading-relaxed mb-4">{children}</p>
        ),

        // Links
        a: ({ href, children }: any) => {
            const isExternal = href && !href.startsWith('/') && !href.startsWith('#')
            return (
                <a
                    href={href}
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                    {children}
                </a>
            )
        },

        // Lists
        ul: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground pl-4">
                {children}
            </ul>
        ),
        ol: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground pl-4">
                {children}
            </ol>
        ),
        li: ({ children }: any) => (
            <li className="text-muted-foreground">{children}</li>
        ),

        // Blockquotes
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary/40 pl-6 my-6 italic text-muted-foreground bg-muted/30 py-4 rounded-r-lg">
                {children}
            </blockquote>
        ),

        // Code blocks
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (!inline && language) {
                return (
                    <div className="my-6">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code className={`language-${language}`}>
                                {String(children).replace(/\n$/, '')}
                            </code>
                        </pre>
                    </div>
                )
            }

            return (
                <code
                    className="bg-muted text-primary px-1.5 py-0.5 rounded text-sm font-mono border"
                    {...props}
                >
                    {children}
                </code>
            )
        },

        // Images
        img: ({ src, alt }: any) => (
            <div className="my-6">
                <img
                    src={src}
                    alt={alt || ''}
                    className="rounded-lg w-full max-w-full h-auto shadow-md"
                />
                {alt && (
                    <p className="text-sm text-muted-foreground text-center mt-2 italic">
                        {alt}
                    </p>
                )}
            </div>
        ),

        // Horizontal rule
        hr: () => (
            <hr className="my-8 border-border" />
        ),

        // Tables
        table: ({ children }: any) => (
            <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }: any) => (
            <thead className="bg-muted">{children}</thead>
        ),
        tbody: ({ children }: any) => (
            <tbody>{children}</tbody>
        ),
        tr: ({ children }: any) => (
            <tr className="border-b border-border">{children}</tr>
        ),
        th: ({ children }: any) => (
            <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
                {children}
            </th>
        ),
        td: ({ children }: any) => (
            <td className="border border-border px-4 py-2 text-muted-foreground">
                {children}
            </td>
        ),

        // Strong and emphasis
        strong: ({ children }: any) => (
            <strong className="font-bold text-foreground">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),
    }

    return (
        <div className={`prose prose-gray max-w-none overflow-hidden ${className} `}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
})

MarkdownPreview.displayName = 'MarkdownPreview'

export default MarkdownPreview 