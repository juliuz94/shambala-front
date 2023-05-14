import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import Image from 'next/image'
import { CommunityImage } from '../../../../../../public/images/png'
import styles from './styles.module.css'
import { CustomMap } from '@/components/Custom/CustomMap'
import { strings } from '@/constants/strings'
import { CheckCircle } from '../../../../../../public/images/svg'

const Community=() => {
  return (
    <GlobalContainer >
      <main className={styles.main} >
        <section className={styles.info} >
          <TitleSections title={'Comunidad'} />
          <p >
            Haz parte de una comunidad open source donde vas a poder acompañar a otros y que te acompañen a transitar su
            camino ambiental
          </p >
          <CustomMap className={styles.list_map} data={strings.ladingPage.Experience.community} renderItem={
            (item) => (
              <section key={item.id} className={styles.container_item} >
                <Image src={CheckCircle} alt={'no image'} />
                <article className={styles.item__text} >
                  <p >{item.reason}</p >
                </article >
              </section >
            )
          } />
        </section >
        <Image className={styles.image} src={CommunityImage} alt={'no image'} />
      </main >
    </GlobalContainer >
  )
}

export default Community