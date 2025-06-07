require('dotenv').config({ path: '.env.local' })
const OpenAI = require('openai')
const fs = require('fs')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Carrega o schema e prompt
const schema = JSON.parse(fs.readFileSync('./blog-post-schema.json', 'utf8'))
const systemPrompt = fs.readFileSync('./agent-prompt.md', 'utf8')

async function createPostWithSchema(topic, options = {}) {
  try {
    const {
      style = 'tutorial',
      difficulty = 'beginner',
      length = 'medium'
    } = options

    console.log(`🤖 Criando post sobre: ${topic}`)
    console.log(`📋 Configurações: ${style}, ${difficulty}, ${length}\n`)

    const userPrompt = `
Crie um post sobre: "${topic}"

Configurações:
- Estilo: ${style} (tutorial, guia, dicas, explicação)
- Dificuldade: ${difficulty} (beginner, intermediate, advanced)
- Tamanho: ${length} (short=800-1200 chars, medium=1500-2500 chars, long=3000+ chars)

Responda APENAS com JSON válido seguindo o schema fornecido.
    `.trim()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user', 
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    })

    const responseText = completion.choices[0].message.content
    console.log('🔍 Resposta da IA:')
    console.log(responseText)
    console.log('\n' + '='.repeat(50) + '\n')

    // Parse e valida o JSON
    let postData
    try {
      postData = JSON.parse(responseText)
    } catch (parseError) {
      throw new Error(`Erro ao fazer parse do JSON: ${parseError.message}`)
    }

    // Validação básica do schema
    const requiredFields = ['title', 'slug', 'description', 'body']
    for (const field of requiredFields) {
      if (!postData[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`)
      }
    }

    // Validações adicionais
    if (postData.title.length < 10 || postData.title.length > 100) {
      throw new Error(`Título deve ter entre 10-100 caracteres. Atual: ${postData.title.length}`)
    }

    if (postData.description.length < 50 || postData.description.length > 160) {
      throw new Error(`Descrição deve ter entre 50-160 caracteres. Atual: ${postData.description.length}`)
    }

    if (postData.body.length < 500) {
      throw new Error(`Body deve ter pelo menos 500 caracteres. Atual: ${postData.body.length}`)
    }

    // Valida slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(postData.slug)) {
      throw new Error(`Slug inválido. Use apenas letras minúsculas, números e hífens: ${postData.slug}`)
    }

    console.log('✅ JSON válido e conforme schema!')
    console.log('📊 Estatísticas:')
    console.log(`   Título: ${postData.title.length} caracteres`)
    console.log(`   Descrição: ${postData.description.length} caracteres`) 
    console.log(`   Body: ${postData.body.length} caracteres`)
    console.log(`   Slug: ${postData.slug}`)
    console.log(`   Author: ${postData.author || 'não definido'}`)
    console.log(`   Featured: ${postData.featured || false}`)

    return postData

  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message)
    throw error
  }
}

// Função para testar e publicar
async function createAndPublishPost(topic, options = {}) {
  try {
    // 1. Criar post com IA
    const postData = await createPostWithSchema(topic, options)
    
    console.log('\n🚀 Publicando no blog...')
    
    // 2. Publicar via API
    const response = await fetch('http://localhost:3000/api/publish-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log('✅ Post publicado com sucesso!')
      console.log(`📄 ID: ${result.post._id}`)
      console.log(`🔗 URL: http://localhost:3000/blog/${result.post.slug.current}`)
      return result
    } else {
      throw new Error(`Erro ao publicar: ${result.error}`)
    }

  } catch (error) {
    console.error('💥 Erro no processo:', error.message)
    throw error
  }
}

// Função para criar múltiplos posts
async function createBulkPosts(topics, options = {}) {
  console.log(`📚 Criando ${topics.length} posts em batch...\n`)
  
  const results = []
  
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i]
    console.log(`\n📝 Post ${i + 1}/${topics.length}: ${topic}`)
    console.log('-'.repeat(50))
    
    try {
      const result = await createAndPublishPost(topic, {
        ...options,
        featured: i === 0 // Primeiro post em destaque
      })
      
      results.push({ success: true, topic, result })
      
      // Delay entre posts
      if (i < topics.length - 1) {
        console.log('\n⏳ Aguardando 3 segundos...')
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      
    } catch (error) {
      console.error(`❌ Falha no post "${topic}": ${error.message}`)
      results.push({ success: false, topic, error: error.message })
    }
  }
  
  // Relatório final
  console.log('\n' + '='.repeat(60))
  console.log('📊 RELATÓRIO FINAL')
  console.log('='.repeat(60))
  
  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)
  
  console.log(`✅ Sucessos: ${successful.length}`)
  console.log(`❌ Falhas: ${failed.length}`)
  
  if (successful.length > 0) {
    console.log('\n🎉 Posts criados:')
    successful.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item.topic}`)
      console.log(`      URL: http://localhost:3000/blog/${item.result.post.slug.current}`)
    })
  }
  
  if (failed.length > 0) {
    console.log('\n⚠️  Posts com falha:')
    failed.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item.topic}: ${item.error}`)
    })
  }
  
  return results
}

// CLI
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'single':
    const topic = args[1] || 'JavaScript para iniciantes'
    const style = args[2] || 'tutorial'
    const difficulty = args[3] || 'beginner'
    
    createAndPublishPost(topic, { style, difficulty })
      .then(() => process.exit(0))
      .catch(() => process.exit(1))
    break
    
  case 'test':
    const testTopic = args[1] || 'React Hooks'
    createPostWithSchema(testTopic)
      .then(data => {
        console.log('\n📋 POST GERADO:')
        console.log(JSON.stringify(data, null, 2))
      })
      .catch(() => process.exit(1))
    break
    
  case 'bulk':
    const topics = [
      'Como usar map() no JavaScript',
      'CSS Flexbox para Iniciantes', 
      'Async/Await vs Promises',
      'React useState Hook Tutorial',
      'Node.js: Criando APIs REST'
    ]
    
    createBulkPosts(topics, { 
      style: 'tutorial', 
      difficulty: 'beginner',
      length: 'medium'
    })
      .then(() => process.exit(0))
      .catch(() => process.exit(1))
    break
    
  default:
    console.log(`
🤖 DevClub Post Creator com Schema

Comandos:
  node create-post-with-schema.js single "Tópico" [style] [difficulty]
  node create-post-with-schema.js test "Tópico"  # Apenas gera JSON
  node create-post-with-schema.js bulk           # Cria 5 posts exemplo

Parâmetros:
  style: tutorial, guia, dicas, explicacao
  difficulty: beginner, intermediate, advanced

Exemplos:
  node create-post-with-schema.js single "React Hooks" tutorial beginner
  node create-post-with-schema.js test "JavaScript Arrays"
    `)
}

module.exports = {
  createPostWithSchema,
  createAndPublishPost,
  createBulkPosts
}