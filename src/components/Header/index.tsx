import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './styles.module.css'
import { FaLeaf } from 'react-icons/fa'
import { useUserContext } from '@/context/userContext'
import { MoreOutlined, LoginOutlined } from '@ant-design/icons'


const Header: FC = () => {
  const router = useRouter()
  const { user, logOut } = useUserContext()
  const pathName = router.pathname

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styles.user_option}>
          <a onClick={logOut}>
            Salir
            <LoginOutlined />
          </a>
        </div>
      ),
    }
  ]

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_container}>
        <Image
          width={180}
          height={60}
          alt='Shambala logo'
          src='/images/shambala_logo.png'
        />
      </div>
      <div className={styles.menu_container}>
        <ul>
          <li>
            <Link className={pathName === '/videos' ? styles.active : ''} href='/videos'>Videos</Link>
          </li>
          <li>
            <Link href='/events-workshops' className={pathName === '/events-workshops' ? styles.active : ''}>Talleres & Eventos</Link>
          </li>
          <li>
            <Link href='/videos'>Mi Empresa</Link>
          </li>
          <li>
            <Link href='/videos'>Comunidad</Link>
          </li>
        </ul>
      </div>
      <div className={styles.user_options_container}>
        <div className={styles.point_counter}>
          <FaLeaf />
          <p>
            25
          </p>
        </div>
        <p className={styles.user_name}>{user?.name?.split(' ')[0]}</p>
        <Avatar
          shape='square'
          size='large'
          src={user?.photoURL}
          className={user?.photoURL ? '' : styles.avatar}
        // icon={<UserOutlined />} 
        >
          {
            user?.name?.split(' ')[0].split('')[0]
          }
        </Avatar>
        <Dropdown menu={{ items }} placement='bottomRight'>
          <Button className={styles.user_options_button} type='text'>
            <MoreOutlined />
          </Button>
        </Dropdown>
      </div>


      <style jsx>{`
        .ant-dropdown-menu-item span {
          min-width: 200px
        }
      `}</style>
    </nav>
  )
}

export default Header