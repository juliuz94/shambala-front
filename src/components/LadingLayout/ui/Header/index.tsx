import React, { FC, useState } from 'react'
import { ShambalaLogo } from '@/svg'
import Link from 'next/link'
import styles from './styles.module.css'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { CustomMap } from '@/components/Custom/CustomMap'
import { useRouter } from 'next/router'

const routes=[
  {label: 'Home', route: '/'},
  {label: 'Empresarial', route: '/Enterprise'},
  {label: 'Nosotros', route: '/AboutUs'},
  {label: 'Experiencias', route: '/Experiences'},
  {label: 'Contactanos', route: '/contactanos'}
]

const Header: FC=() => {
  const [open, setOpen]=useState(false)
  const route=useRouter()

  const showDrawer=() => {
    setOpen(true)
  }

  const onClose=() => {
    setOpen(false)
  }

  const loginNavigate=() => {
    route.push('/login')
  }


  return (
    <header className={styles.header_nav} >
      <article >
        <ShambalaLogo
          titlecolor={'#0F72EC'}
          className={styles.logo}
        />
      </article >
      <article className={styles.drawer} >
        <MenuOutlined style={{fontSize: '24px'}}
                      onClick={showDrawer}
        />
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
          <CustomMap data={routes.slice(1)} renderItem={({label, route}) => (
            <article className={styles.drawer_item} >
              <Link key={route} href={route} >
                <p >{label}</p >
              </Link >
            </article >
          )}
          />
        </Drawer >
      </article >

      <section className={styles.actions} >
        <CustomMap className={styles.map} data={routes.slice(1)} renderItem={({label, route}) => (
          <Link key={route} href={route} >
            <p >{label}</p >
          </Link >
        )}
        />
        <button className={`${styles.btn} ${styles.uncolored}`} onClick={loginNavigate} >
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