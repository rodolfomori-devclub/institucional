# DevClub - Página Institucional

Página institucional do DevClub, uma escola de programação e tecnologia. Projeto desenvolvido com foco total em performance e SEO técnico de alto nível.

## 🚀 Stack Técnica

- **Framework**: Next.js 14 com App Router
- **Renderização**: Static Site Generation (SSG)
- **Estilização**: Tailwind CSS
- **Linguagem**: TypeScript
- **Hospedagem**: AWS S3 + CloudFront (somente arquivos estáticos)

## 📄 Páginas

- **Home** (`/`) - Hero section, diferenciais, depoimentos e logos de parceiros
- **Sobre** (`/sobre`) - História, missão, visão, valores e fundador
- **Formações** (`/formacoes`) - Lista de formações e páginas individuais
- **Comunidade** (`/comunidade`) - Projetos dos alunos e redes sociais
- **Contato** (`/contato`) - Formulário de contato e informações
- **Blog** (`/blog`) - Placeholder para futura integração com CMS

## 🔍 SEO Técnico

- Meta tags otimizadas em todas as páginas
- Open Graph e Twitter Cards
- Sitemap automático
- robots.txt configurado
- URLs amigáveis e estrutura semântica
- Schema markup (estruturado)
- Imagens otimizadas com next/image

## 🏗️ Estrutura do Projeto

```
devclub-institucional/
├── app/
│   ├── page.tsx                 # Home
│   ├── sobre/page.tsx           # Sobre
│   ├── formacoes/
│   │   ├── page.tsx             # Lista de formações
│   │   └── [slug]/page.tsx      # Formação individual
│   ├── comunidade/page.tsx      # Comunidade
│   ├── contato/page.tsx         # Contato
│   ├── blog/page.tsx            # Blog (placeholder)
│   ├── layout.tsx               # Layout principal
│   ├── globals.css              # Estilos globais
│   └── sitemap.ts               # Sitemap
├── components/
│   ├── Header.tsx               # Cabeçalho
│   ├── Footer.tsx               # Rodapé
│   ├── SEO.tsx                  # Utilitário para SEO
│   └── home/                    # Componentes da home
├── lib/
│   └── formacoes.ts             # Dados das formações
└── public/
    ├── robots.txt
    └── manifest.json
```

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build
npm start
```

## 📊 Performance

- Renderização estática (SSG)
- Otimização de imagens automática
- CSS-in-JS com Tailwind
- Code splitting automático
- Web Core Vitals otimizados

## 🚀 Deploy

O projeto é configurado para deploy em AWS S3 + CloudFront:

1. `npm run build` gera os arquivos estáticos
2. Upload da pasta `out/` para S3
3. CloudFront como CDN global

## 🎯 Objetivos

- Pontuação alta no Lighthouse (90+)
- SEO técnico de alto nível
- Experiência de usuário otimizada
- Carregamento rápido em todas as páginas
- Acessibilidade e responsividade

---

Desenvolvido com ❤️ para o DevClub