import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import styles from './styles.module.css'
import CardCommunity from '@/components/CardCommunity'
import GlobalContainer from '../../../../GlobalContainer'

const Community = () => {
  const comments = [
    {
      key: '1',
      comment: 'Ayudaa!!!! Quiero volverme vegetariana pero no tengo ni idea de cómo hacerlo... Alguien quiere hacer un grupito de WhatsApp conmigo y nos enviamos apoyo mutuo???',
      author: 'Margarita Zea'
    },
    {
      key: '2',
      comment: '¿Alguien quisiera ir a hacer una caminata ecológica conmigo?',
      author: 'Juan Felipe Tenorio'
    },
    {
      key: '3',
      comment: 'Quiero comentar sobre el documental de Cowspiracy... ¿Alguien ya se lo vio?',
      author: 'Daniela Murcia'
    },
    {
      key: '4',
      comment: 'Quisiera que me dieran recomendaciones de organizaciones activistas y sus distintos enfoques',
      author: 'Ximena Patiño'
    },
    {
      key: '5',
      comment: '¿Alguien me puede compartir buenas prácticas de sostenibilidad para una startup de tecnología que está empezando?',
      author: 'Juan David Vergara'
    },
    {
      key: '6',
      comment: '¿Quién me puede recomendar una organización que recoja mi compost?',
      author: 'Norma Nivia'
    },
    {
      key: '7',
      comment: '¿Vieron el último discurso de Petro de medioambiente? ¿Qué les pareció?',
      author: 'Sebastián Sánchez'
    },
  ]

  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections
          title={strings.ladingPage.homeSectionsTitles.community}
        />
        <section className={styles.card_container}>
          {
            comments.map((comment) => {
              return (
                <CardCommunity
                  key={comment.key}
                  comment={comment.comment}
                  // reply={'12 respuesta'}
                  // daysAgo={'Hace 1 dia'}
                  author={comment.author}
                />
              )
            })
          }

        </section>
      </div>
    </GlobalContainer>
  )
}

export default Community