import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Header from '@/components/Header'
import Slider from '@/components/Profile/Slider'
import styles from './styles.module.css'

const Profile = () => {
  const router = useRouter()
  const { user } = useUserContext()

  const renderProfileImage = () => {
    if (user?.image) {
      return <img src={user.image} className={styles.pfp} alt='profile' />
    } else {
      const initials = `${user?.firstName?.[0] || ''}${
        user?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  return (
    <div className={styles.section}>
      <Head>
        <title>Perfil</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.profile}>
          <img
            src='/images/svg/arrow_back.svg'
            alt='back'
            onClick={() => router.back()}
            className={styles.back}
          />

          <div className={styles.cards}>
            <div className={styles.user}>
              {renderProfileImage()}

              <div className={styles.info}>
                <div className={styles.info_name}>
                  <h1>
                    {user?.firstName || ''} {user?.lastName || ''}
                  </h1>
                  <img src='/images/svg/dots_vertical.svg' alt='options' />
                </div>

                <p className={styles.email}>{user?.email || ''}</p>

                <div className={styles.tags}>
                  <p>Ecología</p>
                  <p>Sostenibilidad</p>
                  <p>Conferencias</p>
                </div>
              </div>
            </div>

            <div className={styles.projects}>
              <div className={styles.projects_container}>
                <div className={styles.projects_text}>
                  <h3>25</h3>
                  <p>Videos</p>
                  <p>Completados</p>
                </div>

                <div className={styles.projects_text}>
                  <h3>14</h3>
                  <p>Eventos</p>
                </div>

                <div className={styles.projects_text}>
                  <h3>25</h3>
                  <p>Puntos</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.options}>
            <div className={styles.options_text}>
              <p>¿Quieres apoyar de alguna manera?</p>
              <p>Recomendaciones y oportunidades de mejora</p>
            </div>

            <div className={styles.options_text}>
              <button type='button'>Enviar</button>
              <button type='button'>Enviar</button>
            </div>
          </div>
        </div>

        <div className={styles.slider}>
          <Slider title={'En progreso'} />
        </div>

        <div className={styles.slider}>
          <Slider title={'Recomendados para ti'} />
        </div>

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />
      </div>
    </div>
  )
}

export default Profile
