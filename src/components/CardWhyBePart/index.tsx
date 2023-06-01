import styles from './styles.module.css'

import Image from 'next/image'

import { CustomMap } from '@/components/Custom/CustomMap'
import TitleSections from '@/components/TitleSections'
import { CheckCircle } from '../../../public/images/svg'
import GlobalContainer from '@/components/GlobalContainer'

interface WhyBePartProps {
  title: string
  image: string
  data: { id: string; reason: string }[]
}

const CardWhyBePart = (props: WhyBePartProps) => {
  const { data, title, image } = props

  return (
    <GlobalContainer>
      <div className={styles.container}>
        <div className={styles.container_card}>
          <section className={styles.header}>
            <TitleSections title={title} />
          </section>
          <section className={styles.content}>
            <Image src={image} alt={'image'} className={styles.image} />
            <div className={styles.container_text}>
              <CustomMap
                className={styles.map}
                data={data ? data : []}
                renderItem={(item) => (
                  <section className={styles.content_text} key={item.id}>
                    <Image
                      src={CheckCircle}
                      alt={'check'}
                      style={{ marginTop: '5px' }}
                    />
                    <h3>{item.reason}</h3>
                  </section>
                )}
              />
            </div>
          </section>
        </div>
      </div>
    </GlobalContainer>
  )
}

export default CardWhyBePart