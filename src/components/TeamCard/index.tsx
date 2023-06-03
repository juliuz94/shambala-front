import styles from './styles.module.css'
import Image, { StaticImageData } from 'next/image'
import { ImLinkedin } from 'react-icons/im'

interface TeamCardProps {
  image: StaticImageData
  name?: string
  career?: string
  description?: string
  linkedin?: string
}

const TeamCard = ({
  image,
  name,
  career,
  description,
  linkedin,
}: TeamCardProps) => {
  return (
    <main className={styles.container_team_card}>
      <div className={styles.container_team_card_mobile}>
        <Image
          className={styles.image}
          src={image}
          alt={'no image'}
          width={300}
          height={300}
        />

        <section className={styles.container_team_card_info}>
          <h2 className={styles.name_title}>{name}</h2>

          <div className={styles.sub_title}>
            <h3 className={styles.career_title}>{career}</h3>

            <a href={linkedin} target='_blank' rel='noopener noreferrer'>
              <ImLinkedin size={24} />
            </a>
          </div>

          <p className={styles.description}>{description}</p>
        </section>
      </div>
    </main>
  )
}

export default TeamCard
