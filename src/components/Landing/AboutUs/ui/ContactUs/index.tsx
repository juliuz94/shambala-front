import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import CardContactUs from '@/components/CardContactUs'

const ContactUs=() => {
  return (
    <GlobalContainer >
      <section >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.contactUs} />
        <CardContactUs />
      </section >
    </GlobalContainer >

  )
}

export default ContactUs