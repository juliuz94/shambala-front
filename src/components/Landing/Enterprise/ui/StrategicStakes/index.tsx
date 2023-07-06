import VideoStart from '@/components/VideoStart'
import Anwers from '@/components/Landing/Enterprise/ui/Anwers'
import { BusinessMan, Globe, Person } from '@/../public/images/svg'
import { strings } from '@/constants/strings'
import styles from './styles.module.css'

const StrategicStakes = () => {
  const videoUrl = 'https://www.youtube.com/watch?v=axUu70iVvg0'
  const videoId = videoUrl.split('v=')[1]

  return (
    <div className={styles.container}>
      <div className={styles.conoce_mas}>
        <div className={styles.title}>
          <h1>
            ¿Buscas que tu organización sea educada en sostenibilidad y
            empoderada para los retos estratégicos del presente?
          </h1>
          <hr />
        </div>

        <div className={styles.video}>
          <div className={styles.content}>
            <p>
              Los retos más difíciles para que una empresa entre en la onda de
              la sostenibilidad son cultivar una transformación cultural y
              construir capacidades organizacionales (Harvard Business Review,
              Marzo 2023)
            </p>
            <VideoStart videoId={videoId} />
          </div>
        </div>

        <div className={styles.data}>
          <Anwers
            title={'72% de los empleados'}
            description={
              'Consideran que tener un trabajo con impactos positivos en la sostenibilidad es muy importante para su felicidad'
            }
            image={Globe}
          />
          <Anwers
            title={'91% de los consumidores'}
            description={
              'esperan que las empresas actúen de manera responsable en temas ambientales'
            }
            image={Person}
          />
          <Anwers
            title={'93% de los CEO’s'}
            description={
              'consideran que la sostenibilidad será un aspecto crítico para el éxito de su organización'
            }
            image={BusinessMan}
          />

          <div className={styles.list}>
            {strings.ladingPage.sustainability.map((text) => (
              <div className={styles.list_items} key={text.id}>
                <img src='/images/svg/CheckCircle.svg' alt='check' />
                <p>{text.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrategicStakes
