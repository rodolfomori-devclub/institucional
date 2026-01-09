const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function deletePost() {
  const post = await client.fetch(`*[_type == 'post' && title match 'Google expande o Gemini 3*'][0]{_id, title, slug}`);
  
  if (post) {
    console.log('Post encontrado:', post.title);
    await client.delete(post._id);
    console.log('Post excluído com sucesso!');
  } else {
    console.log('Post não encontrado');
  }
}

deletePost().catch(err => console.error('Erro:', err.message));
