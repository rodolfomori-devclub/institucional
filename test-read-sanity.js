// Script para testar apenas leitura do Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'twwvsuby',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Usar CDN para leitura
  // Não precisa de token para leitura pública
})

async function testRead() {
  console.log('🔍 Testando leitura pública do Sanity...\n')
  
  try {
    // Testar query simples
    console.log('1. Testando query de posts...')
    const posts = await client.fetch('*[_type == "post"]')
    console.log(`✅ Conexão OK! ${posts.length} posts encontrados.`)
    
    if (posts.length > 0) {
      console.log('\nPosts existentes:')
      posts.forEach((post, i) => {
        console.log(`${i + 1}. ${post.title}`)
      })
    } else {
      console.log('\nNenhum post encontrado ainda.')
      console.log('Crie posts através do:')
      console.log('- Sanity Studio (npm run dev na pasta sanity-studio)')
      console.log('- Painel admin em http://localhost:3000/admin')
      console.log('- API em /api/ia-post')
    }
    
    // Testar se o blog está acessível
    console.log('\n2. URLs para testar:')
    console.log('   - Blog: http://localhost:3000/blog')
    console.log('   - Admin: http://localhost:3000/admin')
    
    console.log('\n✨ A leitura está funcionando! O Sanity está configurado corretamente.')
    
  } catch (error) {
    console.error('❌ Erro ao conectar com Sanity:', error.message)
    console.error('\nVerifique se o Project ID "twwvsuby" está correto.')
  }
}

testRead()