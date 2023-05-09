import styles from './styles.module.css'
import Image from 'next/image'
import { CheckCircle } from '../../../public/images/svg'

interface MembershipCardProps {
  title: string
  tag: string
  subtitle?: string
  data: [
    {
      id: string | number
      reason: string
    }
  ]
}

const MembershipCard=({title, tag, subtitle, data}: MembershipCardProps) => {
  return (
    <div className={styles.container} >
      <div className={styles.tag} >
        <p >{tag}</p >
      </div >
      <h1 className={styles.title} > {title}</h1 >
      <h1 className={styles.subTitle} >{subtitle}</h1 >
      <div className={styles.line} />
      <div className={styles.benfit_content} >
        {
          data && data.map((item) => (
            <section className={styles.content_text} key={item.id} >
              <Image src={CheckCircle} alt={'check'} style={{marginTop: '5px'}} />
              <h3 >{item.reason}</h3 >
            </section >
          ))
        }
      </div >
      <div className={styles.line} />
      <button className={styles.btn_start} >
        <p >Comenzar ahora</p >
      </button >

    </div >
  )
}

export default MembershipCard