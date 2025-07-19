import { db } from "@/lib/firebase"
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const ctaCollection = collection(db, 'cta')
        const querySnapshot = await getDocs(ctaCollection)

        if (querySnapshot.empty) {
            return NextResponse.json({ success: true, cta: null })
        }

        const cta = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json({ success: true, cta: cta[0] })
    } catch (error: any) {
        console.error('Error fetching cta:', error)
        return NextResponse.json(
            { error: 'Failed to fetch cta', details: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const cta = await request.json()
        const ctaCollection = collection(db, 'cta')
        await addDoc(ctaCollection, {
            ...cta,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ success: true, cta })
    } catch (error: any) {
        console.error('Error adding cta:', error)
        return NextResponse.json(
            { error: 'Failed to add cta', details: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const cta = await request.json()
        const ctaCollection = collection(db, 'cta')
        await setDoc(doc(ctaCollection, cta.id), cta)
        return NextResponse.json({ success: true, cta })
    } catch (error: any) {
        console.error('Error updating cta:', error)
        return NextResponse.json(
            { error: 'Failed to update cta', details: error.message },
            { status: 500 }
        )
    }
}
