import { useState } from 'react'
import { Modal, Button, Form, Input, Upload } from 'antd'
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons'
import { uploadImage } from '@/helpers/uploadImage'
import { useUserContext } from '@/context/userContext'
import { FirebaseStorage } from '@/firebase/firebaseApp'
import { ref } from 'firebase/storage'
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
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const [fileToUpload, setFileToUpload] = useState<any | null>(null)
  const [fileBase64, setFileBase64] = useState<any | null>(null)

  const { Dragger } = Upload

  const handleEditorChange = (value: string) => {
    setContent(value)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    handleRemoveImage()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    handleRemoveImage()
  }

  const handleCreateAnnoun = async (values: {
    title: string
    content: string
  }) => {
    setIsLoading(true)

    let imageUrl = ''

    if (fileToUpload) {
      const storageRef = ref(FirebaseStorage, `images/${fileToUpload.name}`)
      const url = await uploadImage(fileToUpload, storageRef, null)
      imageUrl = url
    }

    const announInfo = {
      title: values.title,
      content,
      createdBy: user?._id,
      company: user?.community ? `${user?.community._id}` : '',
      image: imageUrl,
    }

    try {
      await axiosInstance.post(`${ROUTES.ANNOUNCEMENT}`, announInfo)
      setIsModalOpen(false)
      setContent('')
      toast.success('Se agregó tu anuncio correctamente')
      handleRemoveImage()
    } catch (error) {
      toast.error('Parece que hubo un error')
    } finally {
      setIsLoading(false)
    }
  }

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: any) => {
      setFileToUpload(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setFileBase64(reader.result)
      }
    },
  }

  const handleRemoveImage = () => {
    setFileToUpload(null)
    setFileBase64(null)
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

          <div className={styles.image_upload}>
            <label>Imagen</label>

            {!fileBase64 ? (
              <Dragger {...props}>
                <FileImageOutlined />
                <p>Cargar imagen</p>
              </Dragger>
            ) : (
              <div className={styles.image_container}>
                <div
                  className={styles.delete_backdrop}
                  onClick={handleRemoveImage}
                >
                  <DeleteOutlined />
                </div>
                {fileToUpload && (
                  <img src={fileBase64} alt={fileToUpload.name} />
                )}
              </div>
            )}
          </div>
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
