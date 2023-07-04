import { Modal, Button } from 'antd'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { toast } from 'sonner'
import styles from './styles.module.css'

type DeleteCommentModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

const DeleteCommentModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
}: DeleteCommentModalProps) => {
  const deleteComment = async () => {
    try {
      await axiosInstance.delete(`${ROUTES.POST_COMMENT}/${id}`)
      toast.success('Se borró tu comentario correctamente')
      handleOk()
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
      title='Eliminar comentario'
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      footer={
        <div className={styles.footer}>
          <Button type='primary' onClick={deleteComment}>
            Sí
          </Button>
          <Button type='default' onClick={handleCancel}>
            No
          </Button>
        </div>
      }
    >
      <div>
        <p>¿Estás seguro que deseas eliminar este comentario?</p>
      </div>
    </Modal>
  )
}

export default DeleteCommentModal
