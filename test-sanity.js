// Script para testar a conexão com o Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'twwvsuby',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skJsU1LNX3kVaipZMjUCbByoVeK1fEiJvFbXRBpI0xti5061slFH5F1jvFvW9Y1qNmeLFtwxFVebuGl665n5yfxgnycvUtih9lQe3hMjYz4I49UScw9ZtxQoQrh48Bn52m3cbFqkFPAm8GLAMR2P9rzDpgxtuHybHgMzaLSugOwkQfL5IGoi'
})

async function testSanity() {
  console.log('🔍 Testando conexão com Sanity...\n')
  
  try {
    // 1. Testar leitura
    console.log('1. Testando leitura de posts...')
    const posts = await client.fetch('*[_type == "post"]')
    console.log(`✅ Leitura OK - ${posts.length} posts encontrados\n`)
    
    // 2. Testar escrita
    console.log('2. Testando criação de post...')
    const testPost = {
      _type: 'post',
      title: 'Post de Teste - Pode deletar',
      slug: { current: 'post-teste-' + Date.now() },
      description: 'Este é um post de teste para verificar se a API está funcionando',
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Este é um parágrafo de teste.'
            }
          ]
        }
      ],
      publishedAt: new Date().toISOString(),
      author: 'Sistema de Teste'
    }
    
    const result = await client.create(testPost)
    console.log('✅ Escrita OK - Post criado com ID:', result._id)
    console.log('   Título:', result.title)
    console.log('   Slug:', result.slug.current, '\n')
    
    // 3. Testar atualização
    console.log('3. Testando atualização do post...')
    const updated = await client
      .patch(result._id)
      .set({ title: 'Post de Teste - ATUALIZADO' })
      .commit()
    console.log('✅ Atualização OK - Título atualizado\n')
    
    // 4. Listar todos os posts
    console.log('4. Listando todos os posts:')
    const allPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        publishedAt
      }
    `)
    allPosts.forEach((post, i) => {
      console.log(`   ${i + 1}. ${post.title} (/${post.slug})`)
    })
    
    console.log('\n✨ Todos os testes passaram! O Sanity está funcionando corretamente.')
    console.log('\n📝 Próximos passos:')
    console.log('   1. Acesse http://localhost:3000/blog para ver os posts')
    console.log('   2. Acesse http://localhost:3000/admin para criar novos posts')
    console.log('   3. Delete o post de teste no Sanity Studio se desejar')
    
  } catch (error) {
    console.error('❌ Erro ao testar Sanity:', error.message)
    console.error('\nVerifique:')
    console.error('1. Se o Project ID está correto')
    console.error('2. Se o token tem permissões de escrita')
    console.error('3. Se o dataset é "production"')
  }
}

testSanity()