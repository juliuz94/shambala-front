import styles from './styles.module.css'
import Image from 'next/image'
import { CheckCircle } from '../../../public/images/svg'
import { Checkbox } from 'antd'
import React from 'react'

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
  btnTitle: string
  pay?: boolean
}

const MembershipCard=({title, tag, subtitle, data, btnTitle, pay}: MembershipCardProps) => {
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
      {/*<section className={`${styles.pay_container} ${pay}`} >*/}
      <section className={`${pay ? styles.pay_container : styles.disable}`} >
        <article className={styles.term_and_conditions} >
          <p >Total</p >
          <p ><strong >80.000</strong > COP/MENSUALES</p >
        </article >
        <Checkbox >Estoy de acuerdo con los terminos y condiciones</Checkbox >
      </section >
      <button className={styles.btn_start} >
        <p >{btnTitle}</p >
      </button >

    </div >
  )
}

export default MembershipCard