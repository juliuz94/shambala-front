import styles from './styles.module.css'
import { Subscribe } from '@/svg'
import { strings } from '@/constants/strings'
import { ArrowDownOutlined, MailOutlined } from '@ant-design/icons'
import TitleImageLanding from '@/components/TitleImageLanding'

const Header = () => {
  return (
    <main className={styles.container}>
      <img
        className={styles.bg}
        src='/images/svg/waves_about_us.svg'
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
          firstPhrase={'Vamos a cambiar el mundo'}
          secondPhrase={'por medio de la transformación de la'}
          thirdPhrase={'cultura.'}
        />
        <ArrowDownOutlined
          className={styles.arrow}
          style={{ fontSize: '100px', color: '#E1E4E5' }}
        />
      </section>

      <section className={styles.btn_subscribe_mobile}>
        <Subscribe sizecircle={'20'} />
      </section>
    </main>
  )
}

export default Header
