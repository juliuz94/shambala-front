import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { CustomMap } from '@/components/Custom/CustomMap'
import { strings } from '@/constants/strings'
import Image from 'next/image'
import styles from './styles.module.css'

const Manifest = () => {
  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections title={'Manifiesto'} />
        <main className={styles.main}>
          <CustomMap
            className={styles.map}
            data={strings.ladingPage.AboutUs.manifiestio}
            renderItem={(item) => {
              return (
                <section key={item.id} className={styles.reason_container}>
                  <article className={styles.reason_content}>
                    <Image
                      src={item.image}
                      alt={item.image}
                      className={styles.image}
                    />
                    <p className={styles.text}>{item.reason}</p>
                  </article>
                </section>
              )
            }}
          />
        </main>
      </div>
    </GlobalContainer>
  )
}

export default Manifest
