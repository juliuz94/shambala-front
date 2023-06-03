import TitleSections from '../../../../TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '../../../../GlobalContainer'
import { members } from '@/constants/members'
import { ImLinkedin } from 'react-icons/im'
import styles from './styles.module.css'

const Team = () => {
  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />

        <div className={styles.cards_container}>
          {members.map((member, index) => (
            <div className={styles.card} key={index}>
              <img
                className={styles.card_img}
                src={member.photo.src}
                alt={member.name}
              />
              <div className={styles.card_info}>
                <h2>{member.name}</h2>
                <div className={styles.position}>
                  <h3>{member.position}</h3>
                  <ImLinkedin size={24} fill='#CBCBCB' />
                </div>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlobalContainer>
  )
}

export default Team
