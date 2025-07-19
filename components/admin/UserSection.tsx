import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { LogOut, User } from "lucide-react"
import { redirect } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

export default function UserSection() {
    const user = auth.currentUser
    console.log({ user })
    const handleLogout = async () => {
        try {
            await signOut(auth)
            redirect('/admin/login')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <div className="p-4 border-t border-border">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User size={16} className="text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {user?.email || 'Admin'}
                            </p>
                            <p className="text-xs text-muted-foreground">Administrador</p>
                        </div>
                    </div>

                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        <LogOut size={16} className="mr-2" />
                        Sair
                    </Button>
                </CardContent>
            </Card>
        </div>)

}