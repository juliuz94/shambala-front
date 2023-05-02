import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Splash from '@/components/Splash'
import EventsComponent from '@/components/Events'

export default function Events() {
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

  return (
    loading ? <Splash /> : <EventsComponent />
  )
}