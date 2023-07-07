import { useState } from 'react'
import CreatePostModal from '@/components/Modals/CreatePost'
import { useUserContext } from '@/context/userContext'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import styles from './styles.module.css'

type PostFormProps = {
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
  category: string
}

const PostForm = ({ setUpdatePost, category }: PostFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  const { user } = useUserContext()

  const { renderProfileImage } = useRenderProfileImage(
    user?.image,
    user?.firstName,
    user?.lastName,
    styles.pfp
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
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
        category={category}
      />
    </div>
  )
}

export default PostForm
