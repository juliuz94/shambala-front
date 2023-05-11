import styles from './styles.module.css'
import { ShambalaLogo, WaveMobile, Waves } from '@/svg'
import { strings } from '@/constants/strings'
import React from 'react'
import { MailOutlined } from '@ant-design/icons'
import { ImFacebook, ImGithub, ImLinkedin, ImTwitter } from 'react-icons/im'


const Footer=() => {
  return (
    <footer className={styles.container} >
      <Waves className={styles.wave_desktop} width={'100%'} height={'100%'} fillColor={'#069507'} />
      <WaveMobile className={styles.wave_mobile} width={'100%'} height={'100%'} />
      <div className={styles.footer} >
        <section >
          <ShambalaLogo titlecolor={'#ffffff'} />
          <p >{strings.ladingPage.footerInfo}</p >
        </section >
        <div className={styles.socials_container} >
          <section className={styles.mail} >
            <MailOutlined style={{color: '#ffffff', fontSize: '24px'}} />
            <h3 >{strings.ladingPage.email}</h3 >
          </section >
          <section className={styles.socials} >
            <ImTwitter size={24} className={styles.icons} />
            <ImLinkedin size={24} className={styles.icons} />
            <ImFacebook size={24} className={styles.icons} />
            <ImGithub size={24} className={styles.icons} />
          </section >
        </div >
      </div >
    </footer >
  )
}

export default Footer