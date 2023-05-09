import styles from './styles.module.css'
import { Plant } from '../../../../../../public/images/png'
import { CheckCircle } from '../../../../../../public/images/svg'
import Image from 'next/image'
import { strings } from '@/constants/strings'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import { CustomMap } from '@/components/Custom/CustomMap'


const WhyBePart=() => {
  return (
    <div className={styles.container} >
      <div className={styles.container_card} >
        <section className={styles.header} >
          <TitleSections title={strings.ladingPage.homeSectionsTitles.whyBePart} />
        </section >
        <section className={styles.content} >
          <Image src={Plant} alt={'image'} />
          <div className={styles.container_text} >
            <CustomMap className={styles.map} data={strings.ladingPage.whyBePart} renderItem={(item) => (
              <section className={styles.content_text} key={item.id} >
                <Image src={CheckCircle} alt={'check'} style={{marginTop: '5px'}} />
                <h3 >{item.reason}</h3 >
              </section >
            )} />
          </div >
        </section >
      </div >
    </div >
  )
}

export default WhyBePart