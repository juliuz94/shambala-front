import { strings } from '@/constants/strings'
import { Plant } from '../../../../../../public/images/png'
import CardWhyBePart from '@/components/CardWhyBePart'
import styles from './styles.module.css'

const WhyBePart=() => {
  return (
    <div className={styles.container} >
      <CardWhyBePart
        title={strings.ladingPage.homeSectionsTitles.whyBePart}
        image={Plant as unknown as string}
        data={strings.ladingPage.whyBePart}
      />
    </div >

  )
}

export default WhyBePart