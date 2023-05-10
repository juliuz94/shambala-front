import styles from './styles.module.css'
import TeamCard from '@/components/TeamCard'
import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '../../../../GlobalContainer'
import { Bill } from '../../../../../../public/images/png'

const Team=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />
        <TeamCard
          image={Bill}
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