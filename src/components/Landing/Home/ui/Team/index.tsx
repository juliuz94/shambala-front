import styles from './styles.module.css'
import TeamCard from '@/components/TeamCard'
import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '../../../../GlobalContainer'
import { CustomMap } from '@/components/Custom/CustomMap'
import { members } from '@/constants/members'

const Team=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />
        <CustomMap className={styles.container_cards} data={members} renderItem={
          (item) => (
            <TeamCard
              image={item.photo}
              name={item.name}
              career={item.position}
              description={item.description}
              linkedin={item.linkedin}
            />
          )
        }
        />
      </div >
    </GlobalContainer >
  )
}

export default Team