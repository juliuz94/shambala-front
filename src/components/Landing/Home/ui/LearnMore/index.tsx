import VideoStart from '@/components/VideoStart'
import styles from './styles.module.css'

const LearnMore = () => {
  return (
    <div className={styles.container}>
      <div className={styles.conoce_mas}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Conoce más de nosotros</h1>
            <hr />
          </div>

          <p>
            Nuestra misión es cultivar el movimiento ambiental, creando
            comunidades basadas en el conocimiento y en incorporar la acción
            ambiental como una posibilidad de redefinir los valores de nuestra
            sociedad y de cada individuo.
          </p>
        </div>

        <div className={styles.video}>
          <VideoStart />
        </div>
      </div>
    </div>
  )
}

export default LearnMore
