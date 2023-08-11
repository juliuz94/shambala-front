import { useState } from 'react'
import { Spin } from 'antd'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import { toast } from 'sonner'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

interface AnnounProps {
  id: string
}

const AnnouncementForm = ({ id }: AnnounProps) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
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

  const handleCreateComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axiosInstance.patch(`${ROUTES.ANNOUNCEMENT}/comment/${id}`, {
        message,
        announcement: id,
      })
      setMessage('')
      toast.success('Se agregó tu comentario correctamente')
    } catch (error) {
      toast.error('Parece que hubo un error')
    } finally {
      setLoading(false)
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
        disabled={loading}
      >
        { loading ? <LoadingOutlined style={{ fontSize: 20 }} spin /> : 'Comentar'}
      </button>
    </div>
  )
}

export default AnnouncementForm
