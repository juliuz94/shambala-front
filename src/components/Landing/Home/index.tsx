import { FC } from 'react'
import Head from 'next/head'
import FirstView from '@/components/Landing/Home/ui/FirtsView'
import LearnMore from '@/components/Landing/Home/ui/LearnMore'
import WhyBePart from '@/components/Landing/Home/ui/WhyBePart'
import WhichIncludes from '@/components/Landing/Home/ui/WhichIncludes'
import Team from '@/components/Landing/Home/ui/Team'
import Opened from '@/components/Landing/Home/ui/Opened'
import WorkshopsEvents from '@/components/Landing/Home/ui/Workshops&Events'
import Community from '@/components/Landing/Home/ui/Community'
import ContactUs from '@/components/Landing/Home/ui/ContactUs'
import { strings } from '@/constants/strings'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Shambala</title>
      </Head>

      <FirstView />
      <LearnMore />
      <WhyBePart />
      <WhichIncludes />
      <Team />
      <Opened title={strings.ladingPage.homeSectionsTitles.opened} />
      <WorkshopsEvents
        title={strings.ladingPage.homeSectionsTitles.workshopsAndEvents}
      />
      <Community />
      <ContactUs />
    </>
  )
}

export default Home
