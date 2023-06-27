import { useState } from 'react'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import GlobalContainer from '@/components/GlobalContainer'
import { members as membersData } from '@/constants/members'
import { ImLinkedin } from 'react-icons/im'
import styles from './styles.module.css'

interface Member {
  name: string
  position: string
  linkedin: string
  description: string
  photo: any
}

const Team = () => {
  const [expandedMember, setExpandedMember] = useState<number | null>(null)

  const toggleDescription = (index: number) => {
    if (expandedMember === index) {
      setExpandedMember(null)
    } else {
      setExpandedMember(index)
    }
  }

  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />

        <div className={styles.cards_container}>
          {membersData.map((member, index) => (
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
                <p>
                  {expandedMember === index
                    ? member.description
                    : `${member.description.substring(0, 80)}...`}
                </p>
                <button
                  className={styles.button}
                  onClick={() => toggleDescription(index)}
                >
                  {expandedMember === index ? 'Ocultar' : 'Mostrar más'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlobalContainer>
  )
}

export default Team
