import Link from 'next/link'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import { useUserContext } from '@/context/userContext'
import { Button } from 'antd'
import ROUTES from '@/helpers/routes'
import useFetchTags from '@/Hooks/useFetchTags'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  formatPhoneNumberIntl,
  parsePhoneNumber,
} from 'react-phone-number-input'
import { Modal, Form, Checkbox } from 'antd'
import { Tag } from '@/types'
import { toast } from 'sonner'
import { worldPhoneNumbers } from '@/helpers/countriesPhoneNumbers'
import styles from './styles.module.css'

interface PropTypes {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateUserInfoModal = ({ open, setOpen }: PropTypes) => {
  const { user, setUser } = useUserContext()
  const { tags } = useFetchTags(100)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [phoneNumber, setPhoneNumber] = useState<any>('')
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const checkIfSelected = (tagId: string) => {
    return selectedTags.some((tag: Tag) => tag._id === tagId)
  }

  const toggleAddTag = (tag: Tag) => {
    const isIncluded = selectedTags.some(
      (selectedTag: Tag) => selectedTag._id === tag._id
    )

    if (!isIncluded) {
      setSelectedTags((prevTags: Tag[]) => [...prevTags, tag])
    } else {
      setSelectedTags((prevTags: Tag[]) => {
        return prevTags.filter((prevTag: Tag) => prevTag._id !== tag._id)
      })
    }
  }

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

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true)

      const tagIds = selectedTags.map((tag: Tag) => tag._id)
      const ext = formatPhoneNumberIntl(phoneNumber).split(' ')[0]

      const { data } = await axiosInstance.patch(
        `${ROUTES.USERS}/${user?._id}`,
        {
          tags: tagIds,
          country_code: ext,
          phone_number: parsePhoneNumber(phoneNumber)?.nationalNumber,
        }
      )

      await axiosInstance.post(`${ROUTES.TERMS_ACCEPTANCE}`, {
        userId: user?._id,
        acceptedTerms: acceptTerms,
        termsName: 'general terms of use',
      })

      setUser(data)

      toast.success('Se actualizó tu perfil')
      setOpen(false)
    } catch (error) {
      console.log('[handleUpdateUser] error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      closable={false}
      maskClosable={false}
      onCancel={handleCloseModal}
      footer={false}
      width={450}
    >
      <div className={styles.modal_content_container}>
        <h3>Queremos saber qué te gusta</h3>
        <p>
          Elige de los siguientes temas los que más te interesan. Por favor
          elige al menos dos temas.
        </p>
        <div className={styles.buttons_container}>
          {tags &&
            tags?.docs.length > 0 &&
            tags?.docs.map((tag) => {
              return (
                <Button
                  key={tag._id}
                  type={checkIfSelected(tag._id) ? 'primary' : 'default'}
                  onClick={() => toggleAddTag(tag)}
                >
                  {tag.es}
                </Button>
              )
            })}
        </div>

        <Form.Item rules={[{ required: true, message: 'Campo requerido' }]}>
          <PhoneInput
            className={styles.phone_input}
            defaultCountry='CO'
            placeholder='Número de celular'
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </Form.Item>

        <Checkbox
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
        >
          <Link
            href={'/politica-de-privacidad'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Aceptar términos y condiciones
          </Link>
        </Checkbox>

        <Button
          disabled={
            selectedTags.length < 2 || !isValidPhoneNumber || !acceptTerms
          }
          size='large'
          type='primary'
          loading={isLoading}
          onClick={handleUpdateUser}
        >
          Guardar preferencias
        </Button>
      </div>
    </Modal>
  )
}

export default UpdateUserInfoModal
