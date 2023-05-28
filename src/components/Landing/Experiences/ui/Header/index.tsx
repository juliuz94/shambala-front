import styles from './styles.module.css'
import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'
import Image from 'next/image'
import { Experience1, Experience2, Experience3 } from '../../../../../../public/images/png'

const Header=() => {
  return (
    <main className={styles.container} >
      <section className={styles.section_header} >
        <h1 className={styles.title} >Experiencias</h1 >
        <section className={styles.image_section} >
          <Image className={styles.image} src={Experience1} alt={'image'} />
          <Image className={styles.image} src={Experience2} alt={'image'} />
          <Image className={styles.image} src={Experience3} alt={'image'} />
        </section >
      </section >
      <ArrowDownOutlined className={styles.arrow} style={{fontSize: '100px', color: '#E1E4E5'}} />
    </main >
  )
}

export default Header