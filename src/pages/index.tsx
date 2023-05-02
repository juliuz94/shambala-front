import { useRouter } from 'next/router'
import { Button } from 'antd'

export default function Index() {
  const router = useRouter()
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button onClick={() => router.push('/login')}>
        Log In
      </Button>
    </div>
  )
}