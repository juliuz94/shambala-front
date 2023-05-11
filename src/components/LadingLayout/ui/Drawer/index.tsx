import { ShambalaLogo } from '@/svg'
import styles from '@/components/LadingLayout/ui/Header/styles.module.css'
import { CustomMap } from '@/components/Custom/CustomMap'
import Link from 'next/link'
import React from 'react'
import { Drawer } from 'antd'

interface Props {
  open: boolean;
  onClose: () => void;
  loginNavigate: () => void;
  subscribeNavigate: () => void;
  handleContactUs: () => void;
  data: {label: string; route: string}[];
}

const DrawerMobile=({open, onClose, subscribeNavigate, loginNavigate, handleContactUs, data}: Props) => {
  return (
    <Drawer
      title={<ShambalaLogo
        onClick={onClose}
        titlecolor={'#0F72EC'}
        className={styles.logo}
      />}
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
      getContainer={false}
    >
      <CustomMap data={data.slice(1)} renderItem={({label, route}) => (
        <article className={styles.drawer_item} >
          <Link key={route} href={route} >
            <p >{label}</p >
          </Link >
        </article >
      )}
      />
      <article className={styles.drawer_item} >
        <p onClick={handleContactUs} >Contactanos</p >
      </article >
      <section className={styles.btn_drawer_container} >
        <button className={`${styles.btn_drawer} ${styles.uncolored}`} onClick={loginNavigate} >
          Iniciar Sesión
        </button >
        <button className={`${styles.btn_drawer} ${styles.colored}`} onClick={subscribeNavigate} >
          Inscribete
        </button >
      </section >
    </Drawer >
  )
}

export default DrawerMobile