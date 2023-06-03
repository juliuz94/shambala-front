import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import Image from 'next/image'
import { CommunityImage } from '../../../../../../public/images/png'
import { strings } from '@/constants/strings'
import { CheckCircle } from '../../../../../../public/images/svg'
import styles from './styles.module.css'

const Community = () => {
  return (
    <GlobalContainer>
      <main className={styles.main}>
        <section className={styles.info}>
          <TitleSections title={'Comunidad'} />
          <p>
            Haz parte de una comunidad open source donde vas a poder acompañar a
            otros y que te acompañen a transitar su camino ambiental
          </p>

          <div className={styles.list_items}>
            {strings.ladingPage.Experience.community.map((item, index) => (
              <div className={styles.list} key={index}>
                <Image
                  className={styles.img}
                  src={CheckCircle}
                  alt={'no image'}
                />
                <p>{item.reason}</p>
              </div>
            ))}
          </div>
        </section>
        <Image className={styles.image} src={CommunityImage} alt={'no image'} />
      </main>
    </GlobalContainer>
  )
}

export default Community
