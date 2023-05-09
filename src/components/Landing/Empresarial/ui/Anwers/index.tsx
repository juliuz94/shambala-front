import Image from 'next/image'
import styles from './styles.module.css'


interface AnwersProps {
  title: string
  description: string
  image: string
}

const Anwers=(props: AnwersProps) => {
  return (
    <div className={styles.container} >
      <Image className={styles.image} src={props.image} alt={'no image'} />
      <h2 className={styles.title} >{props.title}</h2 >
      <p className={styles.description} >{props.description}</p >
    </div >
  )
}

export default Anwers