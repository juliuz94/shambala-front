import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UseLandingHeader } from '@/Hooks/useLandingHeader'
import CustomModal from '@/components/Custom/CustomModal/CustomModal'
import CardContactUs from '@/components/CardContactUs'
import styles from './styles.module.css'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1100px)')

    function handleWindowChange(e: MediaQueryListEvent) {
      if (e.matches) {
        setShowMenu(false)
      }
    }

    mediaQuery.addEventListener('change', handleWindowChange)

    return () => {
      mediaQuery.removeEventListener('change', handleWindowChange)
    }
  }, [])

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflowY = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflowY = 'unset'
      document.body.style.height = 'auto'
    }
  }, [showMenu])

  const routes = [
    { label: 'Empresarial', route: '/Enterprise' },
    { label: 'Nosotros', route: '/about-us' },
    { label: 'Experiencias', route: '/Experiences' },
  ]

  const {
    modal,
    loginNavigate,
    subscribeNavigate,
    handleContactUs,
    homeNavigate,
    closeModal,
  } = UseLandingHeader()

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.left_items}>
            <img
              src='/images/shambala_logo.png'
              alt='Shambala logo'
              onClick={homeNavigate}
            />
          </div>

          <div className={styles.right_items}>
            {routes.map((route, index) => (
              <Link href={route.route} key={index}>
                <p>{route.label}</p>
              </Link>
            ))}

            <p onClick={handleContactUs}>Contactanos</p>

            <button
              className={styles.session_button}
              type='button'
              onClick={loginNavigate}
            >
              Iniciar sesión
            </button>

            <button
              className={styles.signup_button}
              type='button'
              onClick={subscribeNavigate}
            >
              Inscríbete
            </button>
          </div>

          <div className={styles.menu} onClick={() => setShowMenu(true)}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
        </div>

        <div className={showMenu ? styles.hamburger_menu : styles.hidden}>
          <div
            className={styles.close_container}
            onClick={() => setShowMenu(false)}
          >
            <div className={styles.close} />
          </div>

          {routes.map((route, index) => (
            <Link href={route.route} key={index}>
              <p>{route.label}</p>
            </Link>
          ))}

          <p onClick={handleContactUs}>Contactanos</p>

          <button
            className={styles.session_button_mb}
            type='button'
            onClick={loginNavigate}
          >
            Iniciar sesión
          </button>

          <button
            className={styles.signup_button_mb}
            type='button'
            onClick={subscribeNavigate}
          >
            Inscríbete
          </button>
        </div>
      </div>
      <CustomModal isOpen={modal} onClose={closeModal}>
        <CardContactUs />
      </CustomModal>
    </>
  )
}

export default Header
