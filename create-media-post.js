// Script para criar um post com imagens e vídeos
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'twwvsuby',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skJsU1LNX3kVaipZMjUCbByoVeK1fEiJvFbXRBpI0xti5061slFH5F1jvFvW9Y1qNmeLFtwxFVebuGl665n5yfxgnycvUtih9lQe3hMjYz4I49UScw9ZtxQoQrh48Bn52m3cbFqkFPAm8GLAMR2P9rzDpgxtuHybHgMzaLSugOwkQfL5IGoi'
})

async function createMediaPost() {
  console.log('📝 Criando post com mídia...\n')
  
  try {
    const post = {
      _type: 'post',
      title: 'Como usar React Hooks na prática',
      slug: { current: 'como-usar-react-hooks-pratica' },
      description: 'Aprenda a usar React Hooks com exemplos práticos e vídeos explicativos. Guia completo para iniciantes.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Os React Hooks revolucionaram a forma como desenvolvemos componentes funcionais. Neste artigo, vamos explorar os hooks mais importantes com exemplos práticos.'
          }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'O que são React Hooks?'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'React Hooks são funções especiais que permitem usar estado e outras funcionalidades do React em componentes funcionais.'
          }]
        },
        {
          _type: 'youtube',
          _key: 'youtube1',
          url: 'https://www.youtube.com/watch?v=O6P86uwfdR0'
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'useState - Gerenciando Estado'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'O hook useState é usado para adicionar estado local a componentes funcionais:'
          }]
        },
        {
          _type: 'code',
          _key: 'code1',
          language: 'javascript',
          code: `import React, { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}`
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'useEffect - Efeitos Colaterais'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'O useEffect permite executar efeitos colaterais em componentes funcionais:'
          }]
        },
        {
          _type: 'embed',
          _key: 'codepen1',
          url: 'https://codepen.io/pen/example',
          type: 'codepen'
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'Exemplo Prático'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'Vamos criar um componente que busca dados de uma API:'
          }]
        },
        {
          _type: 'code',
          _key: 'code2',
          language: 'javascript',
          filename: 'UserProfile.js',
          code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{
            _type: 'span',
            text: 'Conclusão'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: 'React Hooks tornam o código mais limpo e fácil de entender. Continue praticando e explorando outros hooks como useContext, useReducer e useMemo!'
          }]
        }
      ],
      publishedAt: new Date().toISOString(),
      author: 'DevClub'
    }
    
    const result = await client.create(post)
    console.log('✅ Post com mídia criado!')
    console.log('   ID:', result._id)
    console.log('   Título:', result.title)
    console.log('   URL: http://localhost:3000/blog/' + result.slug.current)
    
  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message)
  }
}

createMediaPost()