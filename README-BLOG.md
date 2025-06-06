# Blog DevClub - Documentação

## Configuração

### 1. Sanity CMS

1. Crie um projeto no Sanity.io
2. Instale o Sanity CLI: `npm install -g @sanity/cli`
3. Crie um novo projeto Sanity na pasta `sanity-studio`:
   ```bash
   sanity init
   ```
4. Copie o schema do arquivo `sanity/schemas/post.js` para seu projeto Sanity
5. Adicione as credenciais no `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=seu-token-com-permissao-write
   ```

### 2. Firebase Authentication

1. Crie um projeto no Firebase Console
2. Ative o Authentication com Email/Password
3. Adicione as credenciais no `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
   ```
4. Crie um usuário admin no Firebase Console

### 3. API para IA

Configure o secret para o endpoint de IA no `.env.local`:
```
IA_POST_API_SECRET=uma-chave-secreta-forte
```

## Uso

### Painel Administrativo (/admin)

- Faça login com email/senha do Firebase
- Crie posts com título, slug, descrição e conteúdo
- Os posts são publicados imediatamente no Sanity

### API para IA (/api/ia-post)

Endpoint para criação automática de posts via n8n ou outras ferramentas.

**Request:**
```json
POST /api/ia-post
Authorization: Bearer sua-chave-secreta

{
  "title": "Título do Post",
  "slug": "titulo-do-post",
  "description": "Descrição SEO (max 160 chars)",
  "body": "Conteúdo do post.\n\nSepare parágrafos com duas quebras de linha.",
  "author": "Autor (opcional)"
}
```

**Response:**
```json
{
  "success": true,
  "post": {
    "id": "post-id",
    "title": "Título do Post",
    "slug": "titulo-do-post",
    "publishedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Deploy

1. Build o projeto: `npm run build`
2. Sincronize com S3: `aws s3 sync ./out s3://seu-bucket`
3. Invalide o cache do CloudFront se necessário

## Estrutura

- `/blog` - Listagem de posts (SSG + ISR)
- `/blog/[slug]` - Post individual (SSG + ISR)
- `/admin` - Painel administrativo (client-side com Firebase Auth)
- `/api/ia-post` - API para criação via IA

## SEO

Cada post inclui:
- Meta tags otimizadas
- Open Graph tags
- JSON-LD estruturado
- Sitemap atualizado automaticamente
- URLs limpas e amigáveis