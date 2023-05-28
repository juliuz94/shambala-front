import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import TeamCard from '@/components/TeamCard'
import styles from './styles.module.css'
import { members } from '@/constants/members'
import { CustomMap } from '@/components/Custom/CustomMap'

const Team = () => {
  return (
    <GlobalContainer>
      <section className={styles.container}>
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />
        <main className={styles.main}>
          <CustomMap
            className={styles.container_cards}
            data={members}
            renderItem={(item) => (
              <TeamCard
                image={item.photo}
                name={item.name}
                career={item.position}
                description={item.description}
                linkedin={item.linkedin}
              />
            )}
          />
        </main>
      </section>
    </GlobalContainer>
  )
}

export default Team