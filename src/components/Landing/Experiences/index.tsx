import Head from 'next/head'
import Header from '@/components/Landing/Experiences/ui/Header'
import Opened from '@/components/Landing/Home/ui/Opened'
import WorkshopsEvents from '@/components/Landing/Home/ui/Workshops&Events'
import Community from '@/components/Landing/Experiences/ui/Community'

const Experiences = () => {
  return (
    <>
      <Head>
        <title>Experiencias</title>
      </Head>

      <Header />
      <Opened title={'Videos'} />
      <WorkshopsEvents title={'Talleres y Eventos'} />
      <Community />
    </>
  )
}

export default Experiences
