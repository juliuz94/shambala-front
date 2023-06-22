import { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import ROUTES from '@/helpers/routes'
import { axiosInstance } from '@/axios/axiosInstance'
import { toast } from 'sonner'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import styles from './styles.module.css'

type CreateAnnounModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAnnounModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateAnnounModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  const handleEditorChange = (value: string) => {
    setContent(value)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCreateAnnoun = async (values: {
    title: string
    content: string
  }) => {
    setIsLoading(true)

    // const announInfo = {
    //   title: values.title,
    //   content,
    //   createdBy: '',
    //   company: '',
    //   image: '',
    // }

    try {
      // await axiosInstance.post(`${ROUTES.ANNOUNCEMENT}`, announInfo)
      setIsModalOpen(false)
      // setUpdatePost((prev) => !prev)
      setContent('')
      toast.success('Se agregó tu anuncio correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title='Crear anuncio'
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Form name='basic' autoComplete='off' onFinish={handleCreateAnnoun}>
        <div className={styles.content}>
          <Form.Item
            name='title'
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input placeholder='Título' />
          </Form.Item>

          <Form.Item
            name='text'
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <ReactQuill
              value={content}
              onChange={handleEditorChange}
              placeholder='Mensaje'
              className={styles.custom_quill}
            />
          </Form.Item>
        </div>

        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType='submit' type='default' loading={isLoading}>
              Crear
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateAnnounModal
