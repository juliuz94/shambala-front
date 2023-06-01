import React, { FC, createContext, useState, PropsWithChildren, useContext } from 'react'
import { getAuth, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'sonner'
import { User as LocalUser } from '@/types'

type UserContextType = {
  user: LocalUser | null
  setUser: (user: LocalUser | null) => void
  handleLogin: (user: LocalUser) => void
  logOut: (user: LocalUser | null) => void
}

const UserContext = createContext<UserContextType | null>(null);
const { Provider } = UserContext;

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()
  const userInfo = process.browser && localStorage.getItem('sha_user')
  const [user, setUser] = useState<LocalUser | null>(userInfo ? JSON.parse(userInfo) : null)

  const setAuthInfo = (user: LocalUser | null) => {
    localStorage.setItem('sha_user', JSON.stringify(user))
    setUser(user)
    toast.success('¡Qué bueno tener de vuelta!')
  } 

  const handleLogin = async (user: User | null | any) =>  {
    console.log(user)
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/findSession`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      })
      localStorage.setItem('sha_user_token', user.accessToken)
      setAuthInfo(data)
      router.push('/videos')
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
        logOut: logOut
      }}
    >
      {children}
    </Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}



