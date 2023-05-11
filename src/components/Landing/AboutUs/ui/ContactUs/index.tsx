import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import CardContactUs from '@/components/CardContactUs'
import styles from './styles.module.css'

const ContactUs=() => {
  return (
    <GlobalContainer >
      <section className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.contactUs} />
        <CardContactUs />
      </section >
    </GlobalContainer >

  )
}

export default ContactUs