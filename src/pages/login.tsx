import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginComponent from '@/components/Login'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('sha_user')
    if (user) {
      router.push('/community')
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginComponent />
    </>
  )
}
