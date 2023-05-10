import styles from './styles.module.css'
import TitleImageLanding from '@/components/TitleImageLanding'
import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'

const Header=() => {
  return (
    <div className={styles.container} >
      <TitleImageLanding firstPhrase={'Vamos a cambiar el mundo '} secondPhrase={'por medio de la transformación'}
                         thirdPhrase={'de la cultura.'} />
      <ArrowDownOutlined className={styles.arrow} style={{fontSize: '100px', color: '#E1E4E5'}} />
    </div >
  )
}

export default Header