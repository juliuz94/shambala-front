import styles from './styles.module.css'
import CardContactUs from '@/components/CardContactUs'
import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '../../../../GlobalContainer'

const ContactUs = () => {
  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections
          title={strings.ladingPage.homeSectionsTitles.contactUs}
        />
        <div>
          <CardContactUs />
        </div>
      </div>
    </GlobalContainer>
  )
}

export default ContactUs