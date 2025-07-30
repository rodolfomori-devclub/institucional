import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary-dark border-t border-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black gradient-text mb-4">DevClub</h2>
            <p className="text-text-muted-dark mb-4 max-w-md">
              Transformando carreiras através da educação em tecnologia. 
              Junte-se a milhares de alunos que já mudaram suas vidas com programação.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/devclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-muted-dark hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/devclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-text-muted-dark hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/devclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted-dark hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/devclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted-dark hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/formacoes" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Formações
                </Link>
              </li>
              <li>
                <Link href="/comunidade" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Comunidade
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <a 
                  href="https://stars.devclub.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Nossos Alunos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contato@devclub.com.br" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <svg className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  contato@devclub.com.br
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-text-muted-dark hover:text-primary transition-colors duration-200 flex items-center group">
                  <svg className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted-dark text-sm">
              © {new Date().getFullYear()} DevClub. Todos os direitos reservados.
            </p>
            <p className="text-text-muted-dark text-sm mt-4 md:mt-0">
              Feito com <span className="text-primary animate-pulse">❤</span> para transformar carreiras
            </p>
          </div>
        </div>
      </div>
      
      {/* Gradient line at bottom */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </footer>
  )
}