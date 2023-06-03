import Head from 'next/head'
import Header from '@/components/Landing/AboutUs/ui/Header'
import Manifest from '@/components/Landing/AboutUs/ui/Manifest'
import Team from '@/components/Landing/AboutUs/ui/Team'
import ContactUs from '@/components/Landing/AboutUs/ui/ContactUs'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Nosotros</title>
      </Head>

      <Header />
      <Manifest />
      <Team />
      <ContactUs />
    </>
  )
}
