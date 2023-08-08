import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Company from '@/components/Company'
import Splash from '@/components/Splash'
import Layout from '@/components/Layout'
import 'swiper/css'
import 'swiper/css/effect-cards'

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
      <Company />
    </Layout>
  )
}
