import React from 'react'
import { Modal } from 'antd'
import Sesion from './Sesion'
import { useUserContext } from '@/context/userContext'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setHasClickedPayNow: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
  setHasClickedPayNow,
}: Props) => {
  const { user } = useUserContext()
  console.log('user', user)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Sesion handleOk={handleOk} setHasClickedPayNow={setHasClickedPayNow} />
    </Modal>
  )
}

export default LoginModal
