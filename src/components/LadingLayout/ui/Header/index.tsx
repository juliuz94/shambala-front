import React, { FC } from 'react'
import { ShambalaLogo } from '@/svg'
import Link from 'next/link'
import styles from './styles.module.css'
import { MenuOutlined } from '@ant-design/icons'
import { CustomMap } from '@/components/Custom/CustomMap'
import { UseLandingHeader } from '@/Hooks/useLandingHeader'
import CustomModal from '@/components/Custom/CustomModal/CustomModal'
import CardContactUs from '@/components/CardContactUs'
import DrawerMobile from '@/components/LadingLayout/ui/Drawer'

const routes=[
  {label: 'Home', route: '/'},
  {label: 'Empresarial', route: '/Enterprise'},
  {label: 'Nosotros', route: '/AboutUs'},
  {label: 'Experiencias', route: '/Experiences'}
]

const Header: FC=() => {
  const {
    openDrawer,
    modal,
    onCloseDrawer,
    loginNavigate,
    subscribeNavigate,
    handleContactUs,
    homeNavigate,
    closeModal,
    showDrawer
  }=UseLandingHeader()

  return (
    <header className={styles.header_nav} >
      <article >
        <ShambalaLogo
          titlecolor={'#0F72EC'}
          className={styles.logo}
          onClick={homeNavigate}
        />
      </article >

      <article className={styles.drawer} >
        <MenuOutlined style={{fontSize: '24px'}}
                      onClick={showDrawer}
        />
        <DrawerMobile open={openDrawer} onClose={onCloseDrawer} loginNavigate={loginNavigate}
                      subscribeNavigate={subscribeNavigate} handleContactUs={handleContactUs} data={routes} />
      </article >

      <section className={styles.actions} >
        <CustomMap className={styles.map} data={routes.slice(1)} renderItem={({label, route}) => (
          <Link key={route} href={route} className={styles.links} >
            <p >{label}</p >
          </Link >
        )}
        />
        <p onClick={handleContactUs} >Contactanos</p >
        <button className={`${styles.btn} ${styles.uncolored}`} onClick={loginNavigate} >
          Iniciar Sesión
        </button >
        <button className={`${styles.btn} ${styles.colored}`} onClick={subscribeNavigate} >
          Inscribete
        </button >
      </section >

      <CustomModal
        isOpen={modal}
        onClose={closeModal} >
        <CardContactUs />
      </CustomModal >
    </header >
  )
}

export default Header