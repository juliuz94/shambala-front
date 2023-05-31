import { useState } from 'react'
import CreatePostModal from '@/components/Modals/CreatePost'
import styles from './styles.module.css'
import { useUserContext } from '@/context/userContext'

type PostFormProps = {
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
}

const PostForm = ({ setUpdatePost }: PostFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  const { user } = useUserContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
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
    <div className={styles.container}>
      <div className={styles.bar}>
        {renderProfileImage()}

        <input
          className={styles.input_bar}
          type='text'
          placeholder='Comparte algún tema que este en tu mente...'
          value={inputText}
          onChange={handleChange}
        />
      </div>

      <button
        className={styles.button}
        type='button'
        onClick={() => setIsModalOpen(true)}
      >
        Crear post
      </button>

      <CreatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={inputText}
        setTitle={setInputText}
        setUpdatePost={setUpdatePost}
      />
    </div>
  )
}

export default PostForm
