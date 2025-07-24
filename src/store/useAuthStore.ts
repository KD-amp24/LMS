import { create } from 'zustand'

interface AuthState {
  userId: string | null
  role: 'student' | 'teacher' | 'admin' | null
  setAuth: (id: string, role: AuthState['role']) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  userId: null,
  role: null,
  setAuth: (userId, role) => set({ userId, role }),
  logout: () => set({ userId: null, role: null }),
}))
