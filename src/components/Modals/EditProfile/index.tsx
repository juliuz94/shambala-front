import { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons'
import { uploadImage } from '@/helpers/uploadImage'
import { useUserContext } from '@/context/userContext'
import { FirebaseStorage } from '@/firebase/firebaseApp'
import { ref } from 'firebase/storage'
import PhoneInput, {
  formatPhoneNumberIntl,
  parsePhoneNumber,
} from 'react-phone-number-input'
import { worldPhoneNumbers } from '@/helpers/countriesPhoneNumbers'
import useFetchTags from '@/Hooks/useFetchTags'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Tag } from '@/types'
import { toast } from 'sonner'
import 'react-phone-number-input/style.css'
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
  const [fileToUpload, setFileToUpload] = useState<any | null>(null)
  const [fileBase64, setFileBase64] = useState<any | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<any>('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)

  const { Dragger } = Upload

  const { tags } = useFetchTags(100)

  useEffect(() => {
    if (user) {
      const userTagIds = user.tags.map((tag: Tag) => tag._id)
      setSelectedTags(userTagIds)
    }
  }, [user])

  const handlePhoneChange = (phone: string) => {
    const parsedPhoneNumber = parsePhoneNumber(phone || '')
    const country = worldPhoneNumbers.find(
      (country) => country.code === parsedPhoneNumber?.country
    )

    if (!phone || !parsedPhoneNumber) {
      setIsValidPhoneNumber(false)
      return
    }

    setPhoneNumber(phone)

    if (parsedPhoneNumber?.nationalNumber.length === country?.phoneLength) {
      setIsValidPhoneNumber(true)
    } else {
      setIsValidPhoneNumber(false)
    }
  }

  const handleEditProfile = async (values: {
    name: string
    last_name: string
    bio: string
    phone_number: number
  }) => {
    setIsLoading(true)

    const ext = formatPhoneNumberIntl(phoneNumber).split(' ')[0]

    let imageUrl = ''

    if (fileToUpload) {
      const storageRef = ref(FirebaseStorage, `images/${fileToUpload.name}`)
      const url = await uploadImage(fileToUpload, storageRef, null)
      imageUrl = url
    }

    const editProfile = {
      ...user,
      firstName: values.name,
      lastName: values.last_name,
      bio: values.bio,
      country_code: ext,
      phone_number: parsePhoneNumber(phoneNumber)?.nationalNumber,
      // image: user?.image !== null ? imageUrl : user?.image,
    }

    try {
      await axiosInstance.patch(`${ROUTES.USERS}/${user._id}`, editProfile)
      toast.success('Se actualizó tu perfil')
      handleCancel()
      handleRemoveImage()
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
          phone_number: user?.phone_number,
        }}
      >
        <div className={styles.content}>
          {/* <div className={styles.image_upload}>
            <label>Imagen de perfil</label>

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
          </div> */}

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
            label={<label>Número</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <PhoneInput
              className={styles.phone_input}
              defaultCountry='CO'
              placeholder='Número de celular'
              value={user?.phone_number || phoneNumber}
              onChange={handlePhoneChange}
            />
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
