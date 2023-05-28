import React, { FC } from 'react'
import { ShambalaLogo } from '@/svg'
import Link from 'next/link'
import styles from './styles.module.css'
import { CustomMap } from '@/components/Custom/CustomMap'
import { UseLandingHeader } from '@/Hooks/useLandingHeader'
import CustomModal from '@/components/Custom/CustomModal/CustomModal'
import CardContactUs from '@/components/CardContactUs'
import DropdownMobile from '@/components/LadingLayout/ui/Dropdown'
import { Button } from 'antd'

const routes = [
  { label: 'Home', route: '/' },
  { label: 'Empresarial', route: '/enterprise' },
  { label: 'Nosotros', route: '/about-us' },
  { label: 'Experiencias', route: '/experiences' },
]

const Header: FC = () => {
  const {
    modal,
    loginNavigate,
    subscribeNavigate,
    handleContactUs,
    homeNavigate,
    closeModal,
  } = UseLandingHeader()

  return (
    <header className={styles.header_nav}>
      <article>
        <ShambalaLogo
          titlecolor={'#0F72EC'}
          className={styles.logo}
          onClick={homeNavigate}
        />
      </article>

      <article className={styles.drawer}>
        <DropdownMobile
          loginNavigate={loginNavigate}
          subscribeNavigate={subscribeNavigate}
          openModal={handleContactUs}
        />
      </article>

      <section className={styles.actions}>
        <CustomMap
          className={styles.map}
          data={routes.slice(1)}
          renderItem={({ label, route }) => (
            <Link key={route} href={route} className={styles.links}>
              <p>{label}</p>
            </Link>
          )}
        />
        <p onClick={handleContactUs}>Contactanos</p>
        <Button
          className={`${styles.btn} ${styles.uncolored}`}
          onClick={loginNavigate}
        >
          <p>Iniciar Sesión</p>
        </Button>
        <Button
          className={`${styles.btn} ${styles.colored}`}
          onClick={subscribeNavigate}
        >
          <p>Inscribete</p>
        </Button>
      </section>

      <CustomModal isOpen={modal} onClose={closeModal}>
        <CardContactUs />
      </CustomModal>
    </header>
  )
}

export default Header