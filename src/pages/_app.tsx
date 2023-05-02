import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import { UserContextProvider } from '@/context/userContext'
import { Inter, Montserrat } from 'next/font/google'
import { initFirebase } from '@/firebase/firebaseApp'
import { Toaster } from 'sonner'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--primary-font'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--secondary-font'
})

export default function App({ Component, pageProps }: AppProps) {
  const app = initFirebase()

  return (
    <main className={`${inter.variable} ${montserrat.variable}`}>
      <UserContextProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#54C055',
            },
          }}
        >
          <Toaster richColors position='top-center' />
          <Component {...pageProps} />
        </ConfigProvider>
      </UserContextProvider>
    </main>
  )
}
