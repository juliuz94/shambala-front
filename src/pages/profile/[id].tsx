import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Profile from '@/components/Profile'
import Splash from '@/components/Splash'
import Layout from '@/components/Layout'

const ProfilePage = () => {
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
      <Profile id={router.query.id} />
    </Layout>
  )
}

export default ProfilePage
