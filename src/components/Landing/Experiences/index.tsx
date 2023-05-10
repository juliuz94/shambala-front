import Header from '@/components/Landing/Experiences/ui/Header'
import Opened from '@/components/Landing/Home/ui/Opened'
import WorkshopsEvents from '@/components/Landing/Home/ui/Workshops&Events'
import Community from '@/components/Landing/Experiences/ui/Community'

const Experiences=() => {
  return (
    <>
      <Header />
      <Opened title={'Videos'} />
      <WorkshopsEvents title={'Talleres'} />
      <WorkshopsEvents title={'Eventos'} />
      <Community />
    </>
  )
}

export default Experiences