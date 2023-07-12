import Head from 'next/head'
import LandingLayout from '@/components/LadingLayout'
import Subscribe from '@/components/Landing/Subscribe'

export default function SubscribePage() {
  return (
    <>
      <Head>
        <title>Subscribe</title>
      </Head>

      <LandingLayout>
        <Subscribe />
      </LandingLayout>
    </>
  )
}
