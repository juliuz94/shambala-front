import styles from './styles.module.css'
import TeamCard from '@/components/TeamCard'
import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import PersonImage from '../../../../../../public/images/person_image.jpg'
import GlobalContainer from '../../../../GlobalContainer'

const Team=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />
        <TeamCard
          image={PersonImage}
          name={'Daniel Gutiérrez Patiño'}
          career={'Founder and CEO'}
          description={`El propósito de mi vida es cambiar el mundo. La lucha más 
        importante que enfrenta la humanidad es la crisis climática y 
        he decidido dedicar mi vida por completo a esto.`}
        />
      </div >
    </GlobalContainer >
  )
}

export default Team