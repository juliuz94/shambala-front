import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Dropdown } from 'antd'
import { MoreOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { FaLeaf } from 'react-icons/fa'
import { UseLandingHeader } from '@/Hooks/useLandingHeader'
import CustomModal from '@/components/Custom/CustomModal/CustomModal'
import CardContactUs from '@/components/CardContactUs'
import { useUserContext } from '@/context/userContext'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import styles from './styles.module.css'

const Header = () => {
  const { user, logOut } = useUserContext()
  const [showMenu, setShowMenu] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { renderProfileImage } = useRenderProfileImage(
    user?.image,
    user?.firstName,
    user?.lastName,
    styles.avatar
  )
  const router = useRouter()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styles.user_option}>
          <Link href={`/profile/${user?._id}`}>
            Perfil
            <UserOutlined />
          </Link>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className={styles.user_option}>
          <a onClick={logOut}>
            Salir
            <LoginOutlined />
          </a>
        </div>
      ),
    },
  ]

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  const routes = [
    { label: 'Empresarial', route: '/enterprise' },
    { label: 'Nosotros', route: '/about-us' },
    { label: 'Experiencias', route: '/experiences' },
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
              className={styles.signup_button}
              type='button'
              onClick={subscribeNavigate}
              key='signup-button'
            >
              Inscríbete
            </button>

            {isClient &&
              (user === null ? (
                <button
                  className={styles.session_button}
                  type='button'
                  onClick={loginNavigate}
                  key='session-button'
                >
                  Iniciar sesión
                </button>
              ) : (
                <div className={styles.user_options_container}>
                  <div className={styles.point_counter}>
                    <FaLeaf />
                    {/* <p>25</p> */}
                  </div>

                  <p className={styles.user_name}>
                    {user?.name ? user?.name?.split(' ')[0] : ''}
                  </p>

                  <Link href={user?._id ? `/profile/${user?._id}` : '#'}>
                    {renderProfileImage()}
                  </Link>

                  <Dropdown menu={{ items }} placement='bottomRight'>
                    <Button className={styles.user_options_button} type='text'>
                      <MoreOutlined />
                    </Button>
                  </Dropdown>
                </div>
              ))}
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

          {isClient && user === null ? (
            <button
              className={styles.session_button_mb}
              type='button'
              onClick={loginNavigate}
              key='session-button-mb'
            >
              Iniciar sesión
            </button>
          ) : (
            <button
              className={styles.session_button_mb}
              type='button'
              onClick={() => router.push('/community')}
              key='session-button-mb'
            >
              Ir a la plataforma
            </button>
          )}

          <button
            className={styles.signup_button_mb}
            type='button'
            onClick={subscribeNavigate}
            key='signup-button-mb'
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
