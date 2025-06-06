// Script para criar um post de teste
const fetch = require('node-fetch')

async function createTestPost() {
  console.log('📝 Criando post de teste via API...\n')
  
  const post = {
    title: 'Bem-vindo ao Blog DevClub!',
    slug: 'bem-vindo-blog-devclub',
    description: 'Primeiro post do blog DevClub - conheça nossa plataforma de ensino de programação',
    body: `Este é o primeiro post do nosso blog!

O DevClub é uma plataforma de ensino focada em formar desenvolvedores completos, com conhecimentos práticos e prontos para o mercado.

Aqui você encontrará:
- Tutoriais de programação
- Dicas de carreira
- Novidades sobre tecnologia
- Cases de sucesso de alunos

Acompanhe nosso blog para ficar por dentro de todas as novidades!`,
    author: 'Equipe DevClub'
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/ia-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-secret-key-for-ia-posts'
      },
      body: JSON.stringify(post)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      console.log('✅ Post criado com sucesso!')
      console.log('   ID:', result.post.id)
      console.log('   Título:', result.post.title)
      console.log('   URL: http://localhost:3000/blog/' + result.post.slug)
      console.log('\n🎉 Acesse o blog para ver o post!')
    } else {
      console.error('❌ Erro:', result.error)
      console.log('\nNOTA: O token do Sanity precisa ter permissões de ESCRITA (Editor)')
      console.log('Vá em sanity.io/manage → seu projeto → API → Tokens')
      console.log('Crie um novo token com permissão "Editor" e atualize no .env.local')
    }
  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message)
  }
}

createTestPost()