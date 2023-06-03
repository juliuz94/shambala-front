import styles from './styles.module.css'
import { Subscribe } from '@/svg'
import { strings } from '@/constants/strings'
import { ArrowDownOutlined, MailOutlined } from '@ant-design/icons'
import React from 'react'
import TitleImageLanding from '@/components/TitleImageLanding'

const FirstView = () => {
  return (
    <main className={styles.container}>
      <img
        className={styles.bg}
        src='/images/svg/waves_enterprise.svg'
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

        <Subscribe className={styles.btn_subscribe} sizecircle={'63'} />
      </div>

      <section className={styles.title_section}>
        <TitleImageLanding
          firstPhrase={'Conoce qué experiencias'}
          secondPhrase={'tenemos'}
          thirdPhrase={'pensadas'}
          fourthPhrase={'para tu empresa acá'}
        />
        <ArrowDownOutlined
          className={styles.arrow}
          style={{ fontSize: '100px', color: '#E1E4E5' }}
        />
      </section>
    </main>
  )
}

export default FirstView
