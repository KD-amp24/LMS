import { Link, useRouter } from '@tanstack/react-router'
import { BookOpen, LayoutDashboard } from 'lucide-react'

const Sidebar = () => {
  const router = useRouter()

  const linkStyle = (to: string) =>
    [
      'flex items-center gap-2 px-4 py-2 rounded-lg',
      router.state.location.pathname === to
        ? 'bg-brand text-white'
        : 'hover:bg-gray-200',
    ].join(' ')

  return (
    <nav className="w-56 border-r bg-white shadow-sm">
      <div className="h-16 flex items-center justify-center font-bold text-brand">
        Amplify-LMS
      </div>

      <ul className="space-y-1 mt-4">
        <li>
          <Link to="/" className={linkStyle('/')}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/courses" className={linkStyle('/courses')}>
            <BookOpen size={18} /> Courses
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
