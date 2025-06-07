'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Formações', href: '/formacoes' },
    { name: 'Comunidade', href: '/comunidade' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'glass shadow-lg backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group relative">
              <span className="text-3xl font-black gradient-text tracking-tight">
                DevClub
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-text-dark hover:text-primary transition-colors duration-200 font-medium group"
                style={{
                  animation: `slideDown 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}
            <a
              href="https://aulas.devclub.com.br"
              className="text-text-dark hover:text-primary transition-colors duration-200 font-medium"
              style={{
                animation: 'slideDown 0.5s ease-out 0.6s both'
              }}
            >
              Login
            </a>
            <Link
              href="/#matricule-se"
              className="btn-glow shine"
              style={{
                animation: 'slideDown 0.5s ease-out 0.7s both'
              }}
            >
              Matricule-se
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-text-dark hover:text-primary p-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                style={{
                  transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass rounded-lg mt-2 p-4 space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-text-dark hover:text-primary hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animation: isMenuOpen ? `slideUp 0.3s ease-out ${index * 0.05}s both` : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://aulas.devclub.com.br"
              className="block rounded-lg px-3 py-2 text-base font-medium text-text-dark hover:text-primary hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: isMenuOpen ? `slideUp 0.3s ease-out ${5 * 0.05}s both` : 'none'
              }}
            >
              Login
            </a>
            <Link
              href="/#matricule-se"
              className="block w-full mt-4 btn-glow text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Matricule-se
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}