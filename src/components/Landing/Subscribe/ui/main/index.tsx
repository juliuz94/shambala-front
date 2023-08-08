import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUserContext } from '@/context/userContext'
import LoginModal from '@/components/Modals/Login'
import ROUTES from '@/helpers/routes'
import { axiosInstance } from '@/axios/axiosInstance'
import { toast } from 'sonner'
import useFetchPlans from '@/Hooks/useFetchPlans'
import styles from './styles.module.css'

const Main = () => {
  const { user } = useUserContext()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [hasClickedPayNow, setHasClickedPayNow] = useState(false)
  const [alreadyApproved, setAlreadyApproved] = useState(false)

  const { plans } = useFetchPlans()

  const checkSubscription = async () => {
    try {
      const subscription = await axiosInstance.get(`${ROUTES.SUBSCRIPTION}`)
      if (
        hasClickedPayNow &&
        (subscription.data.status === null ||
          subscription.data.status === 'CREATE' ||
          subscription.data.status === 'CANCEL')
      ) {
        redirectUser()
        toast.success('Redirigiendo a Stripe')
      } else if (subscription.data.status === 'APPROVED') {
        setAlreadyApproved(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const redirectUser = async () => {
    const { data } = await axiosInstance.get(
      `${ROUTES.GENERATE_LINK}?plan=${plans[0]?._id}&mongo_user_id=${user?._id}`
    )

    if (data && data.url) {
      window.location.href = data.url
    }
  }

  const handlePagarAhora = () => {
    if (user === null) {
      setIsLoginModalOpen(true)
    } else {
      setHasClickedPayNow(true)
    }
  }

  useEffect(() => {
    if (user !== null) {
      checkSubscription()
    }
  }, [user, hasClickedPayNow])

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
              {!alreadyApproved ? (
                <button
                  className={styles.card_button}
                  onClick={handlePagarAhora}
                  type='button'
                >
                  Pagar ahora
                </button>
              ) : (
                <button
                  className={styles.button_approved}
                  type='button'
                  disabled
                >
                  Ya cuentas con una membresía
                </button>
              )}
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
        setHasClickedPayNow={setHasClickedPayNow}
      />
    </div>
  )
}

export default Main
