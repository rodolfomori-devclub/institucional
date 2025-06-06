// Script para criar um post real no blog
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'twwvsuby',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skJsU1LNX3kVaipZMjUCbByoVeK1fEiJvFbXRBpI0xti5061slFH5F1jvFvW9Y1qNmeLFtwxFVebuGl665n5yfxgnycvUtih9lQe3hMjYz4I49UScw9ZtxQoQrh48Bn52m3cbFqkFPAm8GLAMR2P9rzDpgxtuHybHgMzaLSugOwkQfL5IGoi'
})

async function createRealPost() {
  console.log('📝 Criando post inaugural do blog...\n')
  
  try {
    const post = {
      _type: 'post',
      title: 'Bem-vindo ao Blog DevClub!',
      slug: { current: 'bem-vindo-ao-blog-devclub' },
      description: 'Conheça o DevClub, a plataforma que está transformando o ensino de programação no Brasil com metodologia prática e resultados comprovados.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'É com grande satisfação que inauguramos o Blog DevClub! Este espaço foi criado para compartilhar conhecimento, experiências e as últimas novidades do mundo da programação.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'Nossa Missão'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'O DevClub nasceu com o objetivo de democratizar o ensino de programação no Brasil. Acreditamos que todos podem aprender a programar, independentemente de sua formação ou experiência prévia.'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Nossa metodologia é baseada em projetos práticos, mentorias ao vivo e uma comunidade ativa de desenvolvedores que se ajudam mutuamente.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'O que você encontrará aqui'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Neste blog, você encontrará:'
          }]
        },
        {
          _type: 'block',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            text: 'Tutoriais práticos de programação'
          }]
        },
        {
          _type: 'block',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            text: 'Dicas de carreira para desenvolvedores'
          }]
        },
        {
          _type: 'block',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            text: 'Análises das tecnologias mais demandadas'
          }]
        },
        {
          _type: 'block',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            text: 'Histórias de sucesso de nossos alunos'
          }]
        },
        {
          _type: 'block',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            text: 'Novidades sobre o mercado de tecnologia'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'Junte-se à nossa comunidade'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Seja você um iniciante dando os primeiros passos ou um desenvolvedor experiente buscando se atualizar, você é bem-vindo em nossa comunidade!'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Acompanhe nosso blog, participe das discussões e faça parte dessa jornada de transformação através da programação.'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Nos vemos no código! 🚀'
          }]
        }
      ],
      publishedAt: new Date().toISOString(),
      author: 'Equipe DevClub'
    }
    
    const result = await client.create(post)
    console.log('✅ Post criado com sucesso!')
    console.log('   ID:', result._id)
    console.log('   Título:', result.title)
    console.log('   URL: http://localhost:3000/blog/' + result.slug.current)
    console.log('\n🎉 Acesse o blog para ver o post!')
    
    // Deletar o post de teste
    console.log('\n🧹 Limpando posts de teste...')
    const testPosts = await client.fetch('*[_type == "post" && title match "Post de Teste*"]')
    for (const testPost of testPosts) {
      await client.delete(testPost._id)
      console.log('   Deletado:', testPost.title)
    }
    
  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message)
  }
}

createRealPost()