import styles from './styles.module.css'
import CardContactUs from '@/components/CardContactUs'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '@/components/Landing/Home/ui/GlobalContainer'

const ContactUs=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.contactUs} />
        <div className={styles.form_container} >
          <CardContactUs />
        </div >
      </div >
    </GlobalContainer >

  )
}

export default ContactUs