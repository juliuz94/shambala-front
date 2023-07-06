import { useState } from 'react'
import { DocComment } from '@/pages/community'
import { IoMdTrash } from 'react-icons/io/index'
import { useUserContext } from '@/context/userContext'
import DeleteCommentModal from '@/components/Modals/DeleteComment'
import styles from './styles.module.css'

interface PostCommentProps {
  id: string
  fetchComments: (id: string, limit: number) => Promise<void>
  comment: DocComment
  commentsLimit: number
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
}

const PostComment = ({
  comment,
  id,
  fetchComments,
  commentsLimit,
  setUpdatePost,
}: PostCommentProps) => {
  const { user } = useUserContext()
  const [deleteCommentModal, setDeleteCommentModal] = useState(false)

  const renderProfileImage = () => {
    if (comment?.user?.image) {
      return (
        <img src={comment?.user.image} className={styles.pfp} alt='profile' />
      )
    } else {
      const initials = `${comment?.user?.firstName?.[0] || ''}${
        comment?.user?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.text}>{comment?.message || ''}</p>

        {comment?.user?._id === user?._id && (
          <IoMdTrash
            className={styles.icon}
            style={{ fill: '#e10b0b' }}
            size={24}
            onClick={() => setDeleteCommentModal(true)}
          />
        )}
      </div>

      <div className={styles.user}>
        {renderProfileImage()}
        <p>
          {comment.user?.firstName || ''} {comment.user?.lastName || ''}
        </p>
      </div>

      <DeleteCommentModal
        isModalOpen={deleteCommentModal}
        setIsModalOpen={setDeleteCommentModal}
        id={comment._id}
        postId={id}
        fetchComments={fetchComments}
        commentsLimit={commentsLimit}
        setUpdatePost={setUpdatePost}
      />
    </div>
  )
}

export default PostComment
