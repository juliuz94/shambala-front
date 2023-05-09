import styles from './styles.module.css'
import React from 'react'

interface GlobalContainerProps {
  children: React.ReactNode
}

const GlobalContainer=({children}: GlobalContainerProps) => {
  return (
    <div className={styles.global_container} >
      {children}
    </div >
  )
}

export default GlobalContainer