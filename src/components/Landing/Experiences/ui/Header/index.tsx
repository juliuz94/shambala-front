import styles from './styles.module.css'
import TitleImageLanding from '@/components/TitleImageLanding'
import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'

const Header=() => {
  return (
    <main className={styles.container} >

      <TitleImageLanding firstPhrase={'Experiencias'} />
      <ArrowDownOutlined className={styles.arrow} style={{fontSize: '100px', color: '#E1E4E5'}} />

    </main >
  )
}

export default Header