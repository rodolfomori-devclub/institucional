'use client'

import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { redirect } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext({
    user: null as User | null,
    setUser: (user: User | null) => { },
    loading: true
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (!user && !loading) {
        redirect('/admin/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Carregando...</p>
                </div>
            </div>
        )
    }

    return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}