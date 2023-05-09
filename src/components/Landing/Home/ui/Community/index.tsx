import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import { strings } from '@/constants/strings'
import styles from './styles.module.css'
import CardCommunity from '@/components/CardCommunity'
import GlobalContainer from '@/components/Landing/Home/ui/GlobalContainer'

const Community=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.community} />
        <section className={styles.card_container} >
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
          <CardCommunity
            comment={'Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?'}
            reply={'12 respuesta'}
            daysAgo={'Hace 1 dia'}
            author={'Valentina Geronimo'}
          />
        </section >
      </div >
    </GlobalContainer >
  )
}

export default Community