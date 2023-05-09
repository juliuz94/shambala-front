import styles from './styles.module.css'
import Image from 'next/image'
import { Subscribe } from '@/svg'
import { strings } from '@/constants/strings'
import { ArrowDownOutlined, MailOutlined } from '@ant-design/icons'
import React from 'react'
import { FirstImageTitle, SecondImageTitle, ThreeImageTitle } from '../../../../../../public/images/svg'

const FirstView=() => {
  return (
    <div className={styles.container} >
      <div className={styles.container_social} >
        <section className={styles.email} >
          <MailOutlined className={styles.mail_icon} style={{color: 'black', fontSize: '24px'}} />
          <h3 >
            {strings.ladingPage.email}
          </h3 >
        </section >
        <Subscribe className={styles.btn_subscribe} />
      </div >
      <section className={styles.title_section} >
        <div >
          <div className={styles.title_content} >
            <h1 className={styles.titles} > Cultivamos el movimiento </h1 >
            <Image className={styles.image} src={FirstImageTitle} alt={'image'} />
          </div >
          <div className={styles.title_content} >
            <h1 className={styles.titles} > ambiental </h1 >
            <Image className={styles.image} src={SecondImageTitle} alt={'image'} />
            <h1 className={styles.titles} > creando comunidades </h1 >
          </div >
          <div className={styles.title_content} >
            <h1 className={styles.titles} > por medio del conocimiento </h1 >
            <Image className={styles.image} src={ThreeImageTitle} alt={'image'} />
          </div >
        </div >
        <ArrowDownOutlined style={{fontSize: '100px', color: '#E1E4E5'}} />
      </section >

    </div >
  )
}

export default FirstView