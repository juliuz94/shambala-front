import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import VideosComponent from '@/components/Videos'
import Splash from '@/components/Splash'
import Layout from '@/components/Layout'

export default function Videos() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user } = useUserContext()

  useEffect(() => {
    if (user) {
      setLoading(false)
    } else {
      router.push('/login')
    }
  }, [user, router])

  return loading ? (
    <Splash />
  ) : (
    <Layout>
      <VideosComponent />
    </Layout>
  )
}
