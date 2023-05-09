import styles from './styles.module.css'
import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import VideoStart from '@/components/VideoStart'
import Anwers from '@/components/Landing/Empresarial/ui/Anwers'
import { BusinessMan, Globe, Person } from '../../../../../../public/images/svg'

const StrategicStakes=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections
          title={'¿Buscas que tu organización sea educada en sostenibilidad y empoderada para los retos estratégicos del presente?'} />
        <section className={styles.video_container} >
          <div className={styles.video_description} >
            <p >
              Los retos más difíciles para que una empresa entre en la onda de la sostenibilidad son cultivar una
              transformación cultural y construir capacidades organizacionales
              (Harvard Business Review, Marzo 2023)
            </p >
          </div >
          <VideoStart />
        </section >

        <section className={styles.anwers} >
          <Anwers
            title={'72% de los empleados'}
            description={'Consideran que tener un trabajo con impactos positivos en la sostenibilidad es muy importante para su felicidad'}
            image={Globe} />
          <Anwers
            title={'91% de los consumidores'}
            description={'esperan que las empresas actúen de manera responsable en temas ambientales'}
            image={Person} />
          <Anwers
            title={'93% de los CEO’s'}
            description={'consideran que la sostenibilidad será un aspecto crítico para el éxito de su organización'}
            image={BusinessMan} />
          
        </section >
      </div >
    </GlobalContainer >

  )
}

export default StrategicStakes