import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Community from '@/components/Community'
import Splash from '@/components/Splash'

export type DocComment = any

const CommunityPage = () => {
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

  return loading ? <Splash /> : <Community />
}

export default CommunityPage
