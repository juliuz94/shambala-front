import { useState, useEffect, useRef } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
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
  fetchUser: () => void
}

const EditProfileModal = ({
  isModalOpen,
  setIsModalOpen,
  fetchUser,
}: EditProfileProps) => {
  const { user, setUser } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [fileToUpload, setFileToUpload] = useState<any | null>(null)
  // const [fileBase64, setFileBase64] = useState<any | null>(null)
  const [userImage, setUserImage] = useState<any | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<any>('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const { tags } = useFetchTags(100)

  useEffect(() => {
    if (user) {
      const userTagIds = user.tags.map((tag: Tag) => tag._id)
      setSelectedTags(userTagIds)
      setUserImage(user.image)
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

    try {
      let imageUrl = ''

      if (fileToUpload) {
        const storageRef = ref(
          FirebaseStorage,
          `images/profile_images/user_${user?._id}/${fileToUpload.name}`
        )
        const url = await uploadImage(fileToUpload, storageRef, null)
        imageUrl = url
      }

      const ext = formatPhoneNumberIntl(phoneNumber).split(' ')[0]
      const editProfile = {
        ...user,
        firstName: values.name,
        lastName: values.last_name,
        bio: values.bio,
        country_code: ext,
        phone_number: parsePhoneNumber(phoneNumber)?.nationalNumber,
        image: imageUrl === '' ? user.image : imageUrl,
      }

      const { data } = await axiosInstance.patch(
        `${ROUTES.USERS}/${user?._id}`,
        editProfile
      )
      setUser(data)
      toast.success('Se actualizó tu perfil')
      fetchUser()
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
    setUserImage(null)
    setFileToUpload(null)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    setFileToUpload(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setUserImage(reader.result)
    }
  }

  const handleChangeClick = () => {
    if (!uploadRef.current) return
    uploadRef.current.click()
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
        layout='vertical'
        initialValues={{
          name: user?.firstName,
          last_name: user?.lastName,
          bio: user?.bio,
          tags: selectedTags,
          phone_number: user?.phone_number,
        }}
        className={styles.form}
      >
        <div className={styles.content}>
          <div className={styles.profile_image}>
            <div
              className={styles.profile_image_content}
              onClick={handleChangeClick}
            >
              {!userImage ? (
                <div className={styles.initials_container}>
                  <p>
                    {user?.firstName?.[0] || ''}
                    {user?.lastName?.[0] || ''}
                  </p>
                </div>
              ) : (
                <div className={styles.image_container}>
                  <img src={userImage} />
                </div>
              )}
              <input
                type='file'
                ref={uploadRef}
                onChange={onFileChange}
                style={{ display: 'none' }}
                accept='image/*'
                multiple={false}
              />
            </div>
          </div>

          <Form.Item
            name='name'
            className={styles.form_item}
            label={<label>Nombre</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input placeholder='Nombre' size='large' />
          </Form.Item>

          <Form.Item
            name='last_name'
            className={styles.form_item}
            label={<label>Apellido</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input placeholder='Apellido' size='large' />
          </Form.Item>

          <Form.Item
            name='bio'
            className={styles.form_item}
            label={<label>Biografía</label>}
            // rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Input.TextArea placeholder='Biografía' size='large' />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
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
            className={styles.form_item}
            label={<label>Intereses</label>}
            rules={[{ required: true, message: 'Campo requerido' }]}
          >
            <Select
              mode='multiple'
              placeholder='Selecciona las etiquetas'
              size='large'
            >
              {tags?.docs.map((tag) => (
                <Select.Option key={tag._id} value={tag._id}>
                  {tag.es}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            loading={isLoading}
            className={styles.submit_button}
          >
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
