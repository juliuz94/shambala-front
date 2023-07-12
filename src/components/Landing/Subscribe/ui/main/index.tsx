import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUserContext } from '@/context/userContext'
import LoginModal from '@/components/Modals/Login'
import ROUTES from '@/helpers/routes'
import { axiosInstance } from '@/axios/axiosInstance'
import useFetchPlans from '@/Hooks/useFetchPlans'
import styles from './styles.module.css'

const Main = () => {
  const { user } = useUserContext()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { plans } = useFetchPlans()

  // const redirectUser = async () => {
  //   if (user && user.stripe_id === null) {
  //     const { data } = await axiosInstance.get(
  //       `${ROUTES.GENERATE_LINK}?plan=${plans[0]?._id}&mongo_user_id=${user?._id}`
  //     )
  //     console.log('data', data)
  //   }
  // }

  // const handlePagarAhora = () => {
  //   if (user === null) {
  //     setIsLoginModalOpen(true)
  //   } else {
  //     redirectUser()
  //   }
  // }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.membership}>
          <div className={styles.title}>
            <h1>Suscribirse</h1>
            <hr />
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.card_title}>
                <div className={styles.card_price}>
                  <p>Gratis</p>
                </div>
                <h2>Gratuita</h2>
                <hr className={styles.card_line} />
              </div>

              <div className={styles.card_content}>
                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>
                    Acceso a cantidad limitada de videos, talleres y eventos
                    (25%) de los videos
                  </p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Acceso limitado al espacio de comunidad</p>
                </div>
                <hr className={styles.card_line} />
              </div>
              <button
                className={styles.card_button}
                onClick={() => router.push('/login')}
              >
                Iniciar ahora
              </button>
            </div>

            <div className={styles.card}>
              <div className={styles.card_title}>
                <div className={styles.card_price}>
                  <p>Recomendado</p>
                </div>
                <h3>Membresía Completa</h3>
                <h4>
                  $80.000 COP / <span>Mensuales</span>
                </h4>
                <hr className={styles.card_line} />
              </div>

              <div className={styles.card_content}>
                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>
                    Acceso a cantidad ilimitada de videos, talleres y eventos
                    (100%) de los videos
                  </p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Acceso completo al espacio de comunidad</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Apoyo a comunidades</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Creación propia de contenido en la plataforma</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Acompañamiento semi-personalizado en canales multicanal</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Eventos y talleres semi-personalizados</p>
                </div>

                <hr className={styles.card_line} />
              </div>
              <button
                className={styles.card_button}
                //  onClick={handlePagarAhora}
              >
                Pagar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        className={styles.bg}
        src='/images/svg/waves_subscribe.svg'
        alt='bg'
      />

      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
      />
    </div>
  )
}

export default Main
