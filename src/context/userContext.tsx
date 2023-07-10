import React, {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from 'react'
import { getAuth, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'sonner'
import { AuthStoreType, User as LocalUser } from '@/types'

type UserContextType = {
  user: LocalUser | null
  setUser: (user: LocalUser | null) => void
  handleLogin: (user: LocalUser) => void
  logOut: (user: LocalUser | null) => void
}

const UserContext = createContext<UserContextType | null>(null)
const { Provider } = UserContext

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()
  const userInfo = process.browser && localStorage.getItem('sha_user')
  const [user, setUser] = useState<LocalUser | null>(
    userInfo ? JSON.parse(userInfo) : null
  )

  const setAuthInfo = (user: LocalUser | null) => {
    localStorage.setItem('sha_user', JSON.stringify(user))
    setUser(user)
  }

  const handleLogin = async (user: User | null | any) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/findSession`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      localStorage.setItem('sha_user_token', user.accessToken)
      setAuthInfo(data)
      toast.success('¡Qué bueno tenerte de acá!')
      router.push('/community')
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = async () => {
    await signOut(auth)
    router.push('/')
    setTimeout(() => {
      localStorage.removeItem('sha_user')
      localStorage.removeItem('sha_user_token')
      setUser(null)
    }, 1000)
  }

  return (
    <Provider
      value={{
        user: user,
        setUser: (data) => setAuthInfo(data),
        handleLogin: (user) => handleLogin(user),
        logOut: logOut,
      }}
    >
      {children}
    </Provider>
  )
}

export const useUserContext = (): any => {
  return useContext<AuthStoreType | null>(UserContext as any)
}
