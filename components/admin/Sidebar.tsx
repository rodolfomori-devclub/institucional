'use client'

import { Button } from '@/components/ui/button'
import {
    FileText,
    Menu,
    MessageSquare,
    X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import UserSection from './UserSection'

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        {
            id: 'posts',
            label: 'Posts',
            href: '/admin/posts/',
            icon: FileText,
        },
        {
            id: 'cta',
            label: 'CTA',
            href: '/admin/cta/',
            icon: MessageSquare,
        },
    ]

    const isActive = (href: string) => {
        return pathname === href
    }

    return (
        <>
            {/* Mobile menu button */}
            {isCollapsed && (
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="bg-background"
                    >
                        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </Button>
                </div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        lg:translate-x-0
      `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-border relative">
                        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
                        <p className="text-sm text-muted-foreground">DevClub Institucional</p>
                        {!isCollapsed && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="lg:hidden bg-background absolute top-4 right-4"
                            >
                                {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                            </Button>
                        )}
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <li key={item.id}>
                                        <Link href={item.href}>
                                            <button
                                                onClick={() => {
                                                    setIsCollapsed(true) // Close mobile menu after selection
                                                }}
                                                className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors
                        ${isActive(item.href)
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                                    }
                      `}
                                            >
                                                <Icon size={20} />
                                                <span className="font-medium">{item.label}</span>
                                            </button>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <UserSection />
                </div>
            </div>

            {/* Overlay for mobile */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    )
} 