import styles from './styles.module.css'
import Divider from '@/components/Divider'

interface TitleProps {
  title: string;
}

const TitleSections=({title}: TitleProps) => {
  return (
    <section className={styles.title_container} >
      <h2 >{title}</h2 >
      <Divider />
    </section >
  )
}

export default TitleSections