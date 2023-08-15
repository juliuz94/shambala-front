import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi2'
import { Button } from 'antd'
import { toast } from 'sonner'
import { Inter, Montserrat } from 'next/font/google'
import { axiosInstance } from '@/axios/axiosInstance'
import useFetchPlans from '@/Hooks/useFetchPlans'
import { useUserContext } from '@/context/userContext'
 

import ROUTES from '@/helpers/routes'
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

const PremiumBlocker = () => {
  const router = useRouter()
  const { user } = useUserContext()
  const { plans } = useFetchPlans()

  const handleRedirectUser = async () => {
    try {
      toast.success('Redirigiendo a Stripe')
      const { data } = await axiosInstance.get(
        `${ROUTES.GENERATE_LINK}?plan=${plans[0]?._id}&mongo_user_id=${user?._id}`
      )
      console.log('data ->', data)
      if (data && data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.log('[handleRedirectUser]', error)
      toast.success('Redirigiendo a Stripe')
    }
  }

  return (
    <section className={`${styles.premium_blocker_section} ${montserrat.className}`}>
        <Button type='ghost' className={styles.go_back_button} onClick={() => router.back()}>
        <HiArrowLeft />
          Regresar
        </Button>
      <div className={styles.blocker_container}>
        <div className={styles.left_column}>
          <img src='/images/premium_badge.png' alt='Premium badge' />
          <h2>
            Este contenido es <span>Premium</span>
          </h2>
          <p>
            Accede a todos el contenido exclusivo de Shambala adquiriendo tu suscripción
          </p>
        </div>
        <div className={styles.right_column}>
          <div className={styles.card}>
            <div className={`${styles.card_title}`}>
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
            <Button
              className={styles.card_button}
              onClick={handleRedirectUser}
            >
              Comenzar ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiumBlocker