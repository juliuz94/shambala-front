import Image from 'next/image'
import { ArrowDownOutlined, MailOutlined } from '@ant-design/icons'
import { Subscribe } from '@/svg'
import { strings } from '@/constants/strings'
import { Experience1, Experience2, Experience3 } from '@/../public/images/png'
import styles from './styles.module.css'

const Header = () => {
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

        <Subscribe className={styles.btn_subscribe} sizecircle={'63'} />
      </div>

      <section className={styles.section_header}>
        <h1 className={styles.title}>Experiencias</h1>
        <section className={styles.image_section}>
          <Image className={styles.image} src={Experience1} alt={'image'} />
          <Image className={styles.image} src={Experience2} alt={'image'} />
          <Image className={styles.image} src={Experience3} alt={'image'} />
        </section>
      </section>
      <ArrowDownOutlined
        className={styles.arrow}
        style={{ fontSize: '100px', color: '#E1E4E5' }}
      />
    </main>
  )
}

export default Header
