import { useRouter } from 'next/router'
import Home from '@/components/Landing/Home'
import LandingLayout from '@/components/LadingLayout'

export default function Index() {
  const router = useRouter()
  return (
    <LandingLayout>
      <Home />
    </LandingLayout>
  )
}
