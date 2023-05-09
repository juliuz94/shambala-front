import styles from './styles.module.css'
import CardContactUs from '@/components/CardContactUs'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import { strings } from '@/constants/strings'

const ContactUs=() => {
  return (
    <div className={styles.container} >
      <TitleSections title={strings.ladingPage.homeSectionsTitles.contactUs} />
      <div className={styles.form_container} >
        <CardContactUs />
      </div >
    </div >
  )
}

export default ContactUs