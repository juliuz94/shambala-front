import React, { FC } from 'react'
import Header from '@/components/LadingLayout/ui/Header'
import Footer from '@/components/LadingLayout/ui/Footer'
import styles from './styles.module.css'

interface LayoutProps {
  children: React.ReactNode;
}

const routes=[
  {label: 'Home', route: '/'},
  {label: 'Empresarial', route: '/empresarial'},
  {label: 'Nosotros', route: '/nosotros'},
  {label: 'Experiencias', route: '/Experiencias'},
  {label: 'Contactanos', route: '/contactanos'}
]

const LandingLayout: FC<LayoutProps>=({children}) => {
  return (
    <div className={styles.container} >
      <Header />
      {children}
      <Footer />
    </div >
  )
}

export default LandingLayout