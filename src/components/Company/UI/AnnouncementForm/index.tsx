import { useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import { toast } from 'sonner'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import styles from './styles.module.css'

interface AnnounProps {
  id: string
  // fetchComments: (id: string, limit: number) => Promise<void>
  // commentsLimit: number
}

const AnnouncementForm = ({ id }: AnnounProps) => {
  const [message, setMessage] = useState('')

  const { user } = useUserContext()

  const { renderProfileImage } = useRenderProfileImage(
    user?.image,
    user?.firstName,
    user?.lastName,
    styles.pfp
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleCreateComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    try {
      await axiosInstance.patch(`${ROUTES.ANNOUNCEMENT}/comment/${id}`, {
        message,
        announcement: id,
      })
      // fetchComments(id, commentsLimit)
      toast.success('Se agregó tu comentario correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    }
  }

  return (
    <div className={styles.announ_form}>
      <div className={styles.bar}>
        {renderProfileImage()}

        <div className={styles.text_container}>
          <textarea
            className={styles.input_bar}
            placeholder='Comenta...'
            value={message}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className={styles.button}
        type='submit'
        onClick={handleCreateComment}
      >
        Comentar
      </button>
    </div>
  )
}

export default AnnouncementForm
