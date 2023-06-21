import React, { useState, Dispatch, SetStateAction } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import { useUserContext } from '@/context/userContext'
import { Button } from 'antd'
import ROUTES from '@/helpers/routes'
import useFetchTags from '@/Hooks/useFetchTags'
import { Modal } from 'antd'
import { Tag } from '@/types'
import { toast } from 'sonner'
import styles from './styles.module.css'

interface PropTypes {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateUserInfoModal = ({ open, setOpen }: PropTypes) => {
  const { user } = useUserContext()
  const { tags } = useFetchTags(100)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

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

  const handleUpdateUser = async () => {
    try {
      const tagIds = selectedTags.map((tag: Tag) => tag._id)
      await axiosInstance.patch(`${ROUTES.USERS}/${user._id}`, {
        tags: tagIds,
      })
      toast.success('Se actualizó tu perfil')
      setOpen(false)
    } catch (error) {
      console.log('[handleUpdateUser] error', error)
    }
  }

  return (
    <Modal open={open} onCancel={handleCloseModal} footer={false} width={450}>
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
        <Button
          disabled={selectedTags.length < 2}
          size='large'
          type='primary'
          onClick={handleUpdateUser}
        >
          Guardar preferencias
        </Button>
      </div>
    </Modal>
  )
}

export default UpdateUserInfoModal
