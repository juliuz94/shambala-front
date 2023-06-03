import {
  ImFacebook,
  ImGithub,
  ImLinkedin,
  ImTwitter,
  ImDribbble,
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
          <p>© 2023 Shambala. All rights reserved.</p>
          <div className={styles.icons}>
            <ImTwitter size={24} fill='#88E189' />
            <ImLinkedin size={24} fill='#88E189' />
            <ImFacebook size={24} fill='#88E189' />
            <ImGithub size={24} fill='#88E189' />
            <img src='/images/svg/angel_list.svg' alt='angel list' />
            <ImDribbble size={24} fill='#88E189' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
