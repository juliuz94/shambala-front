/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import { toast } from 'sonner'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import { sendPoints } from '@/helpers/gamification'
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

  const { user, fetchPoints } = useUserContext()
  // const user = context?.user

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
      await axiosInstance.post(`${ROUTES.POST_COMMENT}/${id}`, { message })
      setMessage('')
      fetchComments(id, commentsLimit)
      sendPoints('COMMUNITY_COMMENT', { userId: user._id})
      fetchPoints(user?._id)
      toast.success('Se agregó tu comentario correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    }
  }

  return (
    <div className={styles.comment_form}>
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

export default CommentForm
