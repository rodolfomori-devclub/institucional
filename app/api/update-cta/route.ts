import { db } from "@/lib/firebase"
import { collection, getDocs, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

// GET /api/update-cta?secret=devclub2024 - Atualiza o CTA do blog
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const secret = searchParams.get('secret')

        if (secret !== process.env.DELETE_SECRET && secret !== 'devclub2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const newCTA = {
            title: 'Quer aprender mais sobre Programação?',
            description: 'Você acabou de ganhar 1 hora com a minha equipe para uma call exclusiva! Vamos entender o seu momento e te mostrar o caminho para se tornar um programador de sucesso. Clique no botão abaixo e agende agora mesmo!',
            buttonText: 'Agendar minha call gratuita',
            redirectUrl: 'https://rodolfomori.typeform.com/to/rQb1MBt5',
            image: '',
            videoUrl: '',
            updatedAt: serverTimestamp()
        }

        const ctaCollection = collection(db, 'cta')
        const querySnapshot = await getDocs(ctaCollection)

        if (querySnapshot.empty) {
            // Criar novo CTA
            const docRef = await addDoc(ctaCollection, {
                ...newCTA,
                createdAt: serverTimestamp()
            })
            return NextResponse.json({
                success: true,
                message: 'CTA created successfully',
                id: docRef.id
            })
        } else {
            // Atualizar CTA existente
            const existingDoc = querySnapshot.docs[0]
            await setDoc(doc(ctaCollection, existingDoc.id), {
                ...newCTA,
                id: existingDoc.id,
                createdAt: existingDoc.data().createdAt || serverTimestamp()
            })
            return NextResponse.json({
                success: true,
                message: 'CTA updated successfully',
                id: existingDoc.id
            })
        }
    } catch (error: any) {
        console.error('Error updating CTA:', error)
        return NextResponse.json(
            { error: 'Failed to update CTA', details: error.message },
            { status: 500 }
        )
    }
}
