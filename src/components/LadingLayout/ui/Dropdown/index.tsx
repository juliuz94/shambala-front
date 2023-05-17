import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'


interface DropdownMobileProps {
  loginNavigate?: () => void;
  subscribeNavigate?: () => void;
  openModal: () => void;
}

const DropdownMobile=({loginNavigate, subscribeNavigate, openModal}: DropdownMobileProps) => {
  const routes=[
    {label: 'Home', route: '/'},
    {label: 'Empresarial', route: '/Enterprise'},
    {label: 'Nosotros', route: '/AboutUs'},
    {label: 'Experiencias', route: '/Experiences'}
  ]

  const menuItems=routes.map((item, index) => (
    <Menu.Item key={index} className={styles.menu_container} >
      <Link href={item.route} className={styles.items} >{item.label}</Link >
    </Menu.Item >
  ))


  return (
    <Dropdown overlay={
      <Menu style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
        {menuItems}
        <p onClick={openModal} className={styles.contact_us} >Contactanos</p >
        <Space size={10} direction='vertical' style={{width: '100%', padding: '0 10px'}} >
          <Button type='primary' onClick={loginNavigate} >Iniciar sesion</Button >
          <Button onClick={subscribeNavigate} style={{width: '100%'}} >Inscribete</Button >
        </Space >
      </Menu >
    } trigger={['click']} >
      <a onClick={(e) => e.preventDefault()} >
        <Space >
          <MenuOutlined style={{fontSize: '24px'}} />
          <DownOutlined />
        </Space >
      </a >
    </Dropdown >
  )
}

export default DropdownMobile