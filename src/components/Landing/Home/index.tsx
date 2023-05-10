import { FC } from 'react'
import FirstView from '@/components/Landing/Home/ui/FirtsView'
import LearnMore from '@/components/Landing/Home/ui/LearnMore'
import WhyBePart from '@/components/Landing/Home/ui/WhyBePart'
import WhichIncludes from '@/components/Landing/Home/ui/WhichIncludes'
import Team from '@/components/Landing/Home/ui/Team'
import Opened from '@/components/Landing/Home/ui/Opened'
import WorkshopsEvents from '@/components/Landing/Home/ui/Workshops&Events'
import Community from '@/components/Landing/Home/ui/Community'
import ContactUs from '@/components/Landing/Home/ui/ContactUs'

const Home: FC=() => {
  return (
    <>
      <FirstView />
      <LearnMore />
      <WhyBePart />
      <WhichIncludes />
      <Team />
      <Opened />
      <WorkshopsEvents />
      <Community />
      <ContactUs />
    </>
  )
}

export default Home