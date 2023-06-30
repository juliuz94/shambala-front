import { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useUserContext } from '@/context/userContext'
import useFetchTags from '@/Hooks/useFetchTags'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Tag } from '@/types'
import { toast } from 'sonner'
import styles from './styles.module.css'

type EditProfileProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileModal = ({
  isModalOpen,
  setIsModalOpen,
}: EditProfileProps) => {
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { tags } = useFetchTags(100)

  useEffect(() => {
    if (user) {
      const userTagIds = user.tags.map((tag: Tag) => tag._id)
      setSelectedTags(userTagIds)
    }
  }, [user])

  const handleEditProfile = async (values: {
    name: string
    last_name: string
    bio: string
  }) => {
    setIsLoading(true)

    const editProfile = {
      ...user,
      firstName: values.name,
      lastName: values.last_name,
      bio: values.bio,
    }

    try {
      await axiosInstance.patch(`${ROUTES.USERS}/${user._id}`, editProfile)
      toast.success('Se actualizó tu perfil')
      handleCancel()
    } catch (error) {
      toast.error('Parece que hubo un error')
    } finally {
      setIsLoading(false)
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
      title='Editar Perfil'
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
        onFinish={handleEditProfile}
        autoComplete='off'
        initialValues={{
          name: user?.firstName,
          last_name: user?.lastName,
          bio: user?.bio,
          tags: selectedTags,
        }}
      >
        <div className={styles.content}>
          <Form.Item
            name='name'
            label={<label>Nombre</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input placeholder='Nombre' />
          </Form.Item>

          <Form.Item
            name='last_name'
            label={<label>Apellido</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input placeholder='Apellido' />
          </Form.Item>

          <Form.Item
            name='bio'
            label={<label>Biografía</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input.TextArea placeholder='Biografía' />
          </Form.Item>

          <Form.Item
            name='tags'
            label={<label>Etiquetas</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Select mode='multiple' placeholder='Selecciona las etiquetas'>
              {tags?.docs.map((tag) => (
                <Select.Option key={tag._id} value={tag._id}>
                  {tag.es}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType='submit' type='default' loading={isLoading}>
              Guardar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
