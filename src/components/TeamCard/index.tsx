import styles from './styles.module.css'
import Image, { StaticImageData } from 'next/image'

interface TeamCardProps {
  image: string | StaticImageData;
  name?: string;
  career?: string;
  description?: string;
}

const TeamCard=({image, name, career, description}: TeamCardProps) => {
  return (
    <main className={styles.container_team_card} >
      <div className={styles.container_team_card_mobile} >
        <Image className={styles.image} src={image} alt={'no image'} />
        <section className={styles.container_team_card_info} >
          <h2 className={styles.name_title} >{name}</h2 >
          <h3 className={styles.career_title} >{career}</h3 >
          <p className={styles.description} >{description}</p >
        </section >
      </div >
      {/*<section className={styles.logos} >*/}
      {/*  <Image src={Logos} alt={'no found'} />*/}
      {/*</section >*/}
    </main >
  )
}

export default TeamCard