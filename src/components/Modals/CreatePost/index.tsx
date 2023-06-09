import { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { Doc } from '@/Hooks/useFetchTags'
import ROUTES from '@/helpers/routes'
import { axiosInstance } from '@/axios/axiosInstance'
import useFetchTags from '@/Hooks/useFetchTags'
import { toast } from 'sonner'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import styles from './styles.module.css'

type CreatePostModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

const CreatePostModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  setUpdatePost,
  setTitle,
}: CreatePostModalProps) => {
  const { tags } = useFetchTags()

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

  const handleCreatePost = async (values: {
    title: string
    text: string
    tags: []
  }) => {
    const postInfo = {
      title: values.title,
      text: content,
      tags: values.tags,
    }

    try {
      await axiosInstance.post(`${ROUTES.POST}`, postInfo)
      setIsModalOpen(false)
      setUpdatePost((prev) => !prev)
      setTitle('')
      setContent('')
      toast.success('Se agregó tu post correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    }
  }

  return (
    <Modal
      title='Crear post'
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Form
        name='basic'
        autoComplete='off'
        onFinish={handleCreatePost}
        initialValues={{
          title,
        }}
      >
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

          <Form.Item
            name='tags'
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Select mode='multiple' placeholder='Selecciona las etiquetas'>
              {tags?.docs.map((tag: Doc) => (
                <Select.Option key={tag._id} value={tag._id}>
                  {tag.es}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType='submit' type='default'>
              Crear
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default CreatePostModal
