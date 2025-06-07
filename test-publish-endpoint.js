// Teste do endpoint de publicação de posts
require('dotenv').config({ path: '.env.local' })

async function testPublishPost() {
  const postData = {
    title: "Como Usar o Map no JavaScript",
    slug: "como-usar-map-javascript-tutorial",
    description: "Aprenda a usar o método map() no JavaScript de forma prática com exemplos reais",
    body: `# Como Usar o Map no JavaScript

O método **map()** é uma das funções mais úteis do JavaScript para trabalhar com arrays.

## O que é o Map?

O \`map()\` cria um novo array com os resultados da chamada de uma função para cada elemento do array original.

## Sintaxe Básica

\`\`\`javascript
const novoArray = array.map((elemento, index) => {
  // retorna elemento transformado
  return elemento * 2
})
\`\`\`

## Exemplos Práticos

### 1. Dobrar números
\`\`\`javascript
const numeros = [1, 2, 3, 4, 5]
const dobrados = numeros.map(num => num * 2)
console.log(dobrados) // [2, 4, 6, 8, 10]
\`\`\`

### 2. Extrair propriedades de objetos
\`\`\`javascript
const usuarios = [
  { nome: 'João', idade: 30 },
  { nome: 'Maria', idade: 25 }
]

const nomes = usuarios.map(user => user.nome)
console.log(nomes) // ['João', 'Maria']
\`\`\`

## Conclusão

O \`map()\` é essencial para programação funcional em JavaScript. Use sempre que precisar transformar dados mantendo o array original intacto.`,
    author: "DevClub",
    featured: false
  }

  try {
    console.log('🚀 Testando endpoint de publicação...\n')
    console.log('📝 Dados do post:')
    console.log(JSON.stringify(postData, null, 2))
    
    const response = await fetch('http://localhost:3000/api/publish-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log('\n✅ Post publicado com sucesso!')
      console.log('📄 Resultado:')
      console.log(`   ID: ${result.post._id}`)
      console.log(`   Título: ${result.post.title}`)
      console.log(`   Slug: ${result.post.slug.current}`)
      console.log(`   URL: http://localhost:3000/blog/${result.post.slug.current}`)
      console.log(`   Publicado em: ${result.post.publishedAt}`)
    } else {
      console.log('\n❌ Erro ao publicar post:')
      console.log(`   Status: ${response.status}`)
      console.log(`   Erro: ${result.error}`)
    }
    
  } catch (error) {
    console.error('💥 Erro na requisição:', error.message)
  }
}

// Exemplo com diferentes formatos
async function testDifferentFormats() {
  const examples = [
    {
      title: "JavaScript Básico para Iniciantes",
      slug: "javascript-basico-iniciantes",
      description: "Introdução ao JavaScript com conceitos fundamentais",
      body: "# JavaScript Básico\n\nAprenda os fundamentos do JavaScript...",
      author: "DevClub Team"
    },
    {
      title: "React Hooks Avançados",
      slug: "react-hooks-avancados", 
      description: "Domine os hooks do React com exemplos práticos",
      body: "# React Hooks\n\n## useState\n\n```jsx\nconst [count, setCount] = useState(0)\n```",
      featured: true
    },
    {
      title: "Node.js e Express",
      slug: "nodejs-express-tutorial",
      description: "Crie APIs REST com Node.js e Express",
      body: "# Node.js + Express\n\nConstrua APIs robustas..."
    }
  ]

  console.log('🧪 Testando diferentes formatos de post...\n')
  
  for (let i = 0; i < examples.length; i++) {
    const post = examples[i]
    console.log(`📝 Criando post ${i + 1}/${examples.length}: ${post.title}`)
    
    try {
      const response = await fetch('http://localhost:3000/api/publish-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        console.log(`✅ Sucesso: /blog/${result.post.slug.current}`)
      } else {
        console.log(`❌ Erro: ${result.error}`)
      }
      
    } catch (error) {
      console.log(`💥 Falha: ${error.message}`)
    }
    
    // Delay entre requests
    if (i < examples.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

// Função para testar com dados mínimos
async function testMinimalPost() {
  const minimalPost = {
    title: "Post Mínimo",
    slug: "post-minimo-teste",
    description: "Teste com dados mínimos obrigatórios",
    body: "# Post Simples\n\nApenas um teste."
  }

  console.log('🔬 Testando post com dados mínimos...\n')
  
  try {
    const response = await fetch('http://localhost:3000/api/publish-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(minimalPost)
    })
    
    const result = await response.json()
    console.log(response.ok ? '✅ Post mínimo criado!' : `❌ Erro: ${result.error}`)
    
  } catch (error) {
    console.error('💥 Erro:', error.message)
  }
}

// Menu de testes
const args = process.argv.slice(2)
const testType = args[0]

switch (testType) {
  case 'single':
    testPublishPost()
    break
  case 'multiple':
    testDifferentFormats()
    break
  case 'minimal':
    testMinimalPost()
    break
  default:
    console.log(`
🧪 Testes do Endpoint de Publicação

Comandos:
  node test-publish-endpoint.js single    # Testa um post completo
  node test-publish-endpoint.js multiple  # Testa vários formatos
  node test-publish-endpoint.js minimal   # Testa dados mínimos

Formato do payload:
{
  "title": "string (obrigatório)",
  "slug": "string (obrigatório)", 
  "description": "string (obrigatório)",
  "body": "string markdown (obrigatório)",
  "author": "string (opcional)",
  "featured": "boolean (opcional)"
}
    `)
}