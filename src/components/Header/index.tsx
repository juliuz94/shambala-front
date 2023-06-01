import { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import { FaLeaf } from 'react-icons/fa'
import { useUserContext } from '@/context/userContext'
import { MoreOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user, logOut } = useUserContext()
  const router = useRouter()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styles.user_option}>
          <Link href={'/profile'}>
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

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.left_items}>
          <Link href={'/'}>
            <Image
              width={180}
              height={60}
              alt='Shambala logo'
              src='/images/shambala_logo.png'
            />
          </Link>
        </div>

        <div className={styles.center_items}>
          <Link
            className={router.pathname === '/videos' ? styles.active : ''}
            href='/videos'
          >
            Videos
          </Link>

          <Link
            href='/events-workshops'
            className={
              router.pathname === '/events-workshops' ? styles.active : ''
            }
          >
            Talleres & Eventos
          </Link>

          <Link href='/company/123'>Mi Empresa</Link>

          <Link
            href='/community'
            className={router.pathname === '/community' ? styles.active : ''}
          >
            Comunidad
          </Link>
        </div>

        <div className={styles.right_items}>
          <div className={styles.user_options_container}>
            <div className={styles.point_counter}>
              <FaLeaf />
              <p>25</p>
            </div>

            <p className={styles.user_name}>{user?.name?.split(' ')[0]}</p>

            <Avatar
              shape='square'
              size='large'
              src={user?.photoURL}
              className={user?.photoURL ? '' : styles.avatar}
            >
              {user?.firstName?.split(' ')[0].split('')[0]}
              {user?.lastName?.split(' ')[0].split('')[0]}
            </Avatar>

            <Dropdown menu={{ items }} placement='bottomRight'>
              <Button className={styles.user_options_button} type='text'>
                <MoreOutlined />
              </Button>
            </Dropdown>
          </div>
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

        <div className={styles.user_options_container}>
          <div className={styles.point_counter}>
            <FaLeaf />
            <p>25</p>
          </div>

          <p className={styles.user_name}>{user?.name?.split(' ')[0]}</p>

          <Avatar
            shape='square'
            size='large'
            src={user?.photoURL}
            className={user?.photoURL ? '' : styles.avatar}
          >
            {user?.firstName?.split(' ')[0].split('')[0]}
            {user?.lastName?.split(' ')[0].split('')[0]}
          </Avatar>
        </div>

        <Link
          className={router.pathname === '/videos' ? styles.active : ''}
          href='/videos'
        >
          Videos
        </Link>

        <Link
          href='/events-workshops'
          className={
            router.pathname === '/events-workshops' ? styles.active : ''
          }
        >
          Talleres & Eventos
        </Link>

        <Link href='/company/123'>Mi Empresa</Link>

        <Link
          href='/community'
          className={router.pathname === '/community' ? styles.active : ''}
        >
          Comunidad
        </Link>

        <div className={styles.ham_buttons_container}>
          <button type='button' className={styles.ham_buttons}>
            <Link href={'/profile'}>
              Perfil
              <UserOutlined />
            </Link>
          </button>

          <button type='button' className={styles.ham_buttons} onClick={logOut}>
            Cerrar sesión
            <LoginOutlined />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
