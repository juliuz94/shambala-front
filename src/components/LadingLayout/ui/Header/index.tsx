import React from 'react'
import { ShambalaLogo } from '@/svg'
import Link from 'next/link'
import styles from './styles.module.css'

const routes=[
  {label: 'Home', route: '/'},
  {label: 'Empresarial', route: '/empresarial'},
  {label: 'Nosotros', route: '/nosotros'},
  {label: 'Experiencias', route: '/Experiencias'},
  {label: 'Contactanos', route: '/contactanos'}
]

const Header=() => {

  return (
    <header className={styles.header_nav} >
      <section >
        <ShambalaLogo
          titlecolor={'#0F72EC'}
          className={styles.logo}
        />
      </section >
      <section className={styles.actions} >
        {routes.slice(1).map(({label, route}) => (
          <Link key={route} href={route} >
            <p >{label}</p >
          </Link >
        ))}
        <button className={`${styles.btn} ${styles.uncolored}`} >
          Iniciar Sesión
        </button >
        <button className={`${styles.btn} ${styles.colored}`} >
          Inscribete
        </button >
      </section >
    </header >
  )
}

export default Header