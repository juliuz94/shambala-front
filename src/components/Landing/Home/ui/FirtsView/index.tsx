import React from 'react'
import Link from 'next/link'
import { Subscribe } from '@/svg'
import { strings } from '@/constants/strings'
import { ArrowDownOutlined, MailOutlined } from '@ant-design/icons'
import TitleImageLanding from '@/components/TitleImageLanding'
import styles from './styles.module.css'

const FirstView = () => {
  return (
    <main className={styles.container}>
      <img
        className={styles.bg}
        src='/images/png/image-background.png'
        alt='bg'
      />

      <div className={styles.container_social}>
        <section className={styles.email}>
          <MailOutlined
            className={styles.mail_icon}
            style={{ color: 'black', fontSize: '24px' }}
          />
          <h3>{strings.ladingPage.email}</h3>
        </section>

        <Link href={'/Subscribe'}>
          <Subscribe className={styles.btn_subscribe} sizecircle={'63'} />
        </Link>
      </div>

      <section className={styles.title_section}>
        <TitleImageLanding
          firstPhrase={'Cultivamos el movimiento'}
          secondPhrase={'ambiental creando'}
          thirdPhrase={'comunidades'}
          fourthPhrase={'por medio del Conocimiento'}
        />
        <ArrowDownOutlined
          className={styles.arrow}
          style={{ fontSize: '100px', color: '#E1E4E5' }}
        />
      </section>

      <section className={styles.btn_subscribe_mobile}>
        <Link href={'/Subscribe'}>
          <Subscribe sizecircle={'20'} />
        </Link>
      </section>
    </main>
  )
}

export default FirstView
