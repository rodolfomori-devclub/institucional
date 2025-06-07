require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const OpenAI = require('openai')

class BlogAgent {
  constructor() {
    this.sanityClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN
    })
    
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    
    this.baseUrl = 'http://localhost:3000' // ou sua URL de produção
  }

  // Gera tópicos automaticamente
  async generateTopics(count = 5) {
    const prompt = `
      Gere ${count} tópicos interessantes para posts do blog DevClub.
      Foque em: JavaScript, React, Node.js, desenvolvimento web, programação para iniciantes.
      
      Formato: título direto, sem numeração.
      Exemplo: "Como usar async/await no JavaScript"
    `
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    })
    
    return response.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .slice(0, count)
  }

  // Cria post usando a API existente
  async createPost(topic, options = {}) {
    try {
      const {
        style = 'tutorial',
        difficulty = 'beginner',
        featured = false
      } = options

      console.log(`🤖 Criando post sobre: ${topic}`)
      
      // 1. Gerar conteúdo via API /ia-post
      const generateResponse = await fetch(`${this.baseUrl}/api/ia-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.IA_POST_API_SECRET}`
        },
        body: JSON.stringify({
          topic,
          style,
          difficulty
        })
      })

      if (!generateResponse.ok) {
        throw new Error(`Erro ao gerar post: ${generateResponse.statusText}`)
      }

      const postData = await generateResponse.json()
      
      // 2. Publicar via API /publish-post
      const publishResponse = await fetch(`${this.baseUrl}/api/publish-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.IA_POST_API_SECRET}`
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          description: postData.description,
          author: 'DevClub IA',
          featured
        })
      })

      if (!publishResponse.ok) {
        throw new Error(`Erro ao publicar post: ${publishResponse.statusText}`)
      }

      const result = await publishResponse.json()
      
      console.log(`✅ Post criado com sucesso!`)
      console.log(`   ID: ${result.post._id}`)
      console.log(`   Título: ${result.post.title}`)
      console.log(`   Slug: ${result.post.slug.current}`)
      console.log(`   URL: ${this.baseUrl}/blog/${result.post.slug.current}`)
      
      return result

    } catch (error) {
      console.error(`❌ Erro ao criar post: ${error.message}`)
      throw error
    }
  }

  // Cria múltiplos posts automaticamente
  async createBulkPosts(topics, options = {}) {
    const results = []
    
    for (let i = 0; i < topics.length; i++) {
      try {
        console.log(`\n📝 Criando post ${i + 1}/${topics.length}`)
        
        const result = await this.createPost(topics[i], {
          ...options,
          // Primeiro post pode ser featured
          featured: i === 0 && options.autoFeatured !== false
        })
        
        results.push(result)
        
        // Delay entre posts para não sobrecarregar
        if (i < topics.length - 1) {
          console.log('⏳ Aguardando 2 segundos...')
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        
      } catch (error) {
        console.error(`❌ Falha no post "${topics[i]}": ${error.message}`)
        results.push({ error: error.message, topic: topics[i] })
      }
    }
    
    return results
  }

  // Pipeline completo: gera tópicos + cria posts
  async autoCreatePosts(count = 3, options = {}) {
    try {
      console.log(`🚀 Iniciando criação automática de ${count} posts...\n`)
      
      // 1. Gerar tópicos
      console.log('🧠 Gerando tópicos...')
      const topicsText = await this.generateTopics(count)
      const topics = topicsText.split('\n').filter(t => t.trim()).slice(0, count)
      
      console.log('📋 Tópicos gerados:')
      topics.forEach((topic, i) => {
        console.log(`   ${i + 1}. ${topic}`)
      })
      
      // 2. Criar posts
      console.log('\n🏭 Iniciando criação dos posts...')
      const results = await this.createBulkPosts(topics, options)
      
      // 3. Relatório final
      console.log('\n📊 RELATÓRIO FINAL:')
      const successful = results.filter(r => !r.error)
      const failed = results.filter(r => r.error)
      
      console.log(`✅ Posts criados com sucesso: ${successful.length}`)
      console.log(`❌ Posts com falha: ${failed.length}`)
      
      if (successful.length > 0) {
        console.log('\n🎉 Posts publicados:')
        successful.forEach((result, i) => {
          console.log(`   ${i + 1}. ${result.post.title}`)
          console.log(`      URL: ${this.baseUrl}/blog/${result.post.slug.current}`)
        })
      }
      
      if (failed.length > 0) {
        console.log('\n⚠️  Posts com falha:')
        failed.forEach((result, i) => {
          console.log(`   ${i + 1}. ${result.topic}: ${result.error}`)
        })
      }
      
      return results
      
    } catch (error) {
      console.error('💥 Erro no pipeline automático:', error.message)
      throw error
    }
  }

  // Programar posts para o futuro
  async schedulePost(topic, publishDate, options = {}) {
    const now = new Date()
    const targetDate = new Date(publishDate)
    const delay = targetDate.getTime() - now.getTime()
    
    if (delay <= 0) {
      throw new Error('Data de publicação deve ser no futuro')
    }
    
    console.log(`⏰ Post agendado para: ${targetDate.toLocaleString('pt-BR')}`)
    console.log(`   Tópico: ${topic}`)
    console.log(`   Será publicado em: ${Math.round(delay / 1000 / 60)} minutos`)
    
    setTimeout(async () => {
      try {
        await this.createPost(topic, options)
        console.log(`🎯 Post agendado publicado: ${topic}`)
      } catch (error) {
        console.error(`❌ Falha no post agendado: ${error.message}`)
      }
    }, delay)
    
    return { scheduled: true, publishDate: targetDate, topic }
  }
}

// Funções de conveniência para uso direto
async function createSinglePost(topic, options = {}) {
  const agent = new BlogAgent()
  return await agent.createPost(topic, options)
}

async function createMultiplePosts(count = 3, options = {}) {
  const agent = new BlogAgent()
  return await agent.autoCreatePosts(count, options)
}

async function schedulePost(topic, publishDate, options = {}) {
  const agent = new BlogAgent()
  return await agent.schedulePost(topic, publishDate, options)
}

// Exportar para uso como módulo
module.exports = {
  BlogAgent,
  createSinglePost,
  createMultiplePosts,
  schedulePost
}

// Executar se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]
  
  switch (command) {
    case 'single':
      const topic = args[1] || 'JavaScript para iniciantes'
      createSinglePost(topic)
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
      break
      
    case 'bulk':
      const count = parseInt(args[1]) || 3
      createMultiplePosts(count)
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
      break
      
    case 'schedule':
      const scheduleTopic = args[1] || 'React avançado'
      const date = args[2] || new Date(Date.now() + 60000).toISOString() // 1 min
      schedulePost(scheduleTopic, date)
        .then(() => console.log('Post agendado com sucesso'))
        .catch(console.error)
      break
      
    default:
      console.log(`
🤖 DevClub Blog Agent

Comandos disponíveis:
  node blog-agent.js single "Tópico do post"
  node blog-agent.js bulk 5
  node blog-agent.js schedule "Tópico" "2024-01-01T10:00:00"

Exemplo de uso programático:
  const { BlogAgent } = require('./blog-agent')
  const agent = new BlogAgent()
  await agent.autoCreatePosts(3)
      `)
  }
}