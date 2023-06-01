import { Button, Divider, Dropdown, Menu, Space } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

interface DropdownMobileProps {
  loginNavigate?: () => void
  subscribeNavigate?: () => void
  openModal: () => void
}

const DropdownMobile = ({
  loginNavigate,
  subscribeNavigate,
  openModal,
}: DropdownMobileProps) => {
  const [menuVisible, setMenuVisible] = useState(false) // Estado para controlar la visibilidad del menú

  const routes = [
    { label: 'Home', route: '/' },
    { label: 'Empresarial', route: '/enterprise' },
    { label: 'Nosotros', route: '/about-us' },
    { label: 'Experiencias', route: '/experiences' },
  ]

  const menuItems = routes.map((item, index) => (
    <Menu.Item
      key={index}
      style={{
        width: '100%',
        padding: '.5rem',
      }}
    >
      <Link href={item.route} className={styles.items}>
        {item.label}
      </Link>
      <Divider
        orientation={'center'}
        style={{ margin: '0.2rem', width: '100%' }}
      />
    </Menu.Item>
  ))

  const handleOpenModal = () => {
    openModal()
  }

  const handleContactUsClick = () => {
    setMenuVisible(false) // Cerrar el menú al hacer clic en "Contactanos"
    openModal() // Llamar a la función openModal para mostrar el modal de contacto
  }

  return (
    <Dropdown
      className={styles.dropdown}
      overlayStyle={{ width: '90%' }}
      overlay={
        <Menu style={{ left: 0 }}>
          {menuItems}
          <p onClick={handleContactUsClick} className={styles.contact_us}>
            Contactanos
          </p>
          <Divider
            orientation={'center'}
            style={{ margin: 0, width: '100%', marginBottom: '10px' }}
          />
          <Space
            size={10}
            direction='vertical'
            style={{ width: '100%', padding: '0 10px' }}
          >
            <Button
              type='primary'
              onClick={loginNavigate}
              style={{ width: '100%', height: '40px' }}
            >
              Iniciar sesion
            </Button>
            <Button
              onClick={subscribeNavigate}
              style={{ width: '100%', height: '40px' }}
            >
              Inscribete
            </Button>
          </Space>
        </Menu>
      }
      visible={menuVisible}
      onVisibleChange={setMenuVisible}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MenuOutlined style={{ fontSize: '24px' }} />
        </Space>
      </a>
    </Dropdown>
  )
}

export default DropdownMobile