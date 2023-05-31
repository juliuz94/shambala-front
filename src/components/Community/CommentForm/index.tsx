import { useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import { toast } from 'sonner'
import styles from './styles.module.css'

interface Props {
  id: string
  fetchComments: (id: string, limit: number) => Promise<void>
  commentsLimit: number
  setCommentsLimit: React.Dispatch<React.SetStateAction<number>>
}

const CommentForm = ({
  id,
  fetchComments,
  commentsLimit,
  setCommentsLimit,
}: Props) => {
  const [message, setMessage] = useState('')

  const { user } = useUserContext()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleCreateComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    try {
      await axiosInstance.post(`${ROUTES.POST_COMMENT}/${id}`, { message })
      setMessage('')
      fetchComments(id, commentsLimit)
      toast.success('Se agregó tu comentario correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    }
  }

  const renderProfileImage = () => {
    if (user?.image) {
      return <img src={user.image} className={styles.pfp} alt='profile' />
    } else {
      const initials = `${user?.firstName?.[0] || ''}${
        user?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  return (
    <div className={styles.comment_form}>
      <div className={styles.bar}>
        {renderProfileImage()}

        <textarea
          className={styles.input_bar}
          placeholder='Comenta...'
          value={message}
          onChange={handleChange}
        />
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

export default CommentForm
