import { useRouter } from 'next/router'
import { Button } from 'antd'
import Home from '@/components/Landing/Home'

export default function Index() {
  const router = useRouter()
  return (
    <Home />
  )
}