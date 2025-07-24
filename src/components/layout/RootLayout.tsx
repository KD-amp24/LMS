import { Outlet } from '@tanstack/react-router'
import Sidebar from './Sidebar'

const RootLayout = () => (
  <div className="min-h-screen flex bg-gray-50 text-gray-900">
    <Sidebar />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
)

export default RootLayout
