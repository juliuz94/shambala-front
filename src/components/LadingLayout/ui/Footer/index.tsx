import Link from 'next/link'
import {
  // ImFacebook,
  // ImGithub,
  // ImTwitter,
  // ImDribbble,
  ImLinkedin,
  ImInstagram,
  ImYoutube,
} from 'react-icons/im'
import { MailOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

const Footer = () => {
  return (
    <>
      <img
        className={styles.waves}
        src='/images/svg/waves_footer.svg'
        alt='waves'
      />

      <img
        className={styles.waves_mb}
        src='/images/svg/waves_mb_footer.svg'
        alt='waves'
      />

      <div className={styles.container}>
        <div className={styles.col_1}>
          <img
            className={styles.logo}
            src='/images/png/footer_logo.png'
            alt='logo'
          />

          <div className={styles.email}>
            <MailOutlined style={{ color: '#ffffff', fontSize: '24px' }} />
            <p>contacto@shambala.life</p>
          </div>
        </div>

        <div className={styles.col_2}>
          <div className={styles.col_2_links}>
            <p>© 2023 Shambala. All rights reserved.</p>
            <Link href='/politica-de-privacidad' className={styles.internal_link}>
              Política de privacidad
            </Link>
          </div>
          <div className={styles.icons}>
            <Link
              href={'https://www.instagram.com/shambalacomunidad2/'}
              rel='noopener noreferrer'
              target='_blank'
            >
              <ImInstagram size={24} fill='#88E189' />
            </Link>

            <Link
              href={'https://www.linkedin.com/company/94179942/'}
              rel='noopener noreferrer'
              target='_blank'
            >
              <ImLinkedin size={24} fill='#88E189' />
            </Link>

            <Link
              href={'https://www.youtube.com/channel/UC_zpuusqP4OqRZYorf3yMYg'}
              rel='noopener noreferrer'
              target='_blank'
            >
              <ImYoutube size={24} fill='#88E189' />
            </Link>
            {/* <ImTwitter size={24} fill='#88E189' /> */}
            {/* <ImFacebook size={24} fill='#88E189' /> */}
            {/* <ImGithub size={24} fill='#88E189' /> */}
            {/* <img src='/images/svg/angel_list.svg' alt='angel list' /> */}
            {/* <ImDribbble size={24} fill='#88E189' /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
