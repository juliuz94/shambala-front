import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoginComponent from '@/components/Login'
import { useUserContext } from '@/context/userContext'

export default function Login() {
  const router = useRouter()
  // const { user } = useUserContext()

  useEffect(() => {
    const user = localStorage.getItem('sha_user')
    if (user) {
      router.push('/community')
    }
  }, [router])

  return <LoginComponent />
}
