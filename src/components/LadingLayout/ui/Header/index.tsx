import React, { FC, useState } from 'react'
import { ShambalaLogo } from '@/svg'
import Link from 'next/link'
import styles from './styles.module.css'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer, Modal } from 'antd'
import { CustomMap } from '@/components/Custom/CustomMap'
import { useRouter } from 'next/router'
import CardContactUs from '@/components/CardContactUs'

const routes=[
  {label: 'Home', route: '/'},
  {label: 'Empresarial', route: '/Enterprise'},
  {label: 'Nosotros', route: '/AboutUs'},
  {label: 'Experiencias', route: '/Experiences'}
]

const Header: FC=() => {
  const [open, setOpen]=useState(false)
  const route=useRouter()
  const [modal, setModal]=useState(false)

  const showDrawer=() => {
    setOpen(true)
  }

  const onClose=() => {
    setOpen(false)
  }

  const loginNavigate=() => {
    route.push('/login')
  }

  const subscribeNavigate=() => {
    route.push('/Subscribe')
  }

  const handleContactUs=() => {
    setModal(true)
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

      <Modal
        centered
        open={modal}
        onCancel={() => setModal(false)}
        width={1170}
        closable={false}
      >
        <CardContactUs />
      </Modal >
    </header >
  )
}

export default Header