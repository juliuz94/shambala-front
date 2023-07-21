import { Modal, Button } from 'antd'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { toast } from 'sonner'
import styles from './styles.module.css'

type DeletePostModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

const DeletePostModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  setUpdatePost,
  setPageNumber,
}: DeletePostModalProps) => {
  const deletePost = async () => {
    try {
      await axiosInstance.delete(`${ROUTES.POST}/${id}`)
      toast.success('Se borró tu post correctamente')
      setIsModalOpen(false)
      setPageNumber(1)
      setUpdatePost((prev) => !prev)
    } catch (error) {
      toast.error('Parece que hubo un error')
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Eliminar post'
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      footer={
        <div className={styles.footer}>
          <Button type='primary' onClick={deletePost}>
            Sí
          </Button>
          <Button type='default' onClick={handleCancel}>
            No
          </Button>
        </div>
      }
    >
      <div>
        <p>¿Estás seguro que deseas eliminar este post?</p>
      </div>
    </Modal>
  )
}

export default DeletePostModal
