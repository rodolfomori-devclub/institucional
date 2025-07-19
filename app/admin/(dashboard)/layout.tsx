import Sidebar from "@/components/admin/Sidebar"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="bg-background flex h-screen">
        <Sidebar />
        <Toaster />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
