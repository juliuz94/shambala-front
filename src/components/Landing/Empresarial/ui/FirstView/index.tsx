import styles from './styles.module.css'
import TitleImageLanding from '@/components/TitleImageLanding'
import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'


const FirstView=() => {
  return (
    <div className={styles.container} >
      <TitleImageLanding firstPhrase={'Conoce qué experiencias'} secondPhrase={'tenemos '}
                         thirdPhrase={'pensadas para tu'} fourthPhrase={'empresa acá'} />
      <ArrowDownOutlined className={styles.arrow} style={{fontSize: '100px', color: '#E1E4E5'}} />
    </div >
  )
}

export default FirstView