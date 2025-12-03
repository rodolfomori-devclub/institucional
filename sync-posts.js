const { createClient } = require('@sanity/client')
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp } = require('firebase/firestore')
require('dotenv').config({ path: '.env.local' }) // Try .env.local first
require('dotenv').config() // Fallback to .env

// Configuração do Sanity
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-03-19',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
})

// Configuração do Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function syncPosts() {
    console.log('Iniciando sincronização...')

    try {
        // 1. Buscar todos os posts do Sanity
        console.log('Buscando posts do Sanity...')
        const sanityPosts = await sanityClient.fetch(`*[_type == "post"] {
            _id,
            title,
            "slug": slug.current,
            description,
            body,
            publishedAt,
            author,
            _createdAt,
            _updatedAt
        }`)

        console.log(`Encontrados ${sanityPosts.length} posts no Sanity.`)

        // 2. Para cada post, verificar se já existe no Firebase
        const postsCollection = collection(db, 'posts')
        let addedCount = 0
        let skippedCount = 0

        for (const post of sanityPosts) {
            // Verificar por sanityId
            const q = query(postsCollection, where('sanityId', '==', post._id))
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                console.log(`Post "${post.title}" já existe no Firebase. Pulando...`)
                skippedCount++
                continue
            }

            // Se não existe, adicionar
            console.log(`Adicionando post "${post.title}" ao Firebase...`)

            // Converter body do PortableText para string (simples) ou manter estrutura se o app suportar
            // O app parece salvar o body como string (markdown) ou array (portable text). 
            // Na nova rota salvamos como array com _type: 'code' e code: body (string).
            // Aqui vamos tentar salvar da melhor forma possível. Se o body do Sanity já for complexo, 
            // talvez seja melhor salvar como está ou tentar extrair texto.
            // Por simplicidade e compatibilidade com o admin (que espera ver algo), vamos salvar o body original.

            await addDoc(postsCollection, {
                title: post.title,
                slug: post.slug,
                description: post.description || '',
                content: post.body, // Salvando a estrutura original do Sanity
                status: 'published',
                publishedAt: post.publishedAt ? new Date(post.publishedAt) : new Date(post._createdAt),
                sanityId: post._id,
                author: post.author || 'DevClub IA',
                createdAt: new Date(post._createdAt),
                updatedAt: new Date(post._updatedAt)
            })

            addedCount++
        }

        console.log('--- Resumo ---')
        console.log(`Total processado: ${sanityPosts.length}`)
        console.log(`Adicionados: ${addedCount}`)
        console.log(`Pulados (já existiam): ${skippedCount}`)
        console.log('Sincronização concluída!')

    } catch (error) {
        console.error('Erro durante a sincronização:', error)
    }
}

syncPosts()
