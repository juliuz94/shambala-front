import { DocComment } from '@/pages/community'
import styles from './styles.module.css'

interface PostCommentProps {
  comment: DocComment
}

const PostComment = ({ comment }: PostCommentProps) => {
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
      <p className={styles.text}>{comment?.message || ''}</p>

      <div className={styles.user}>
        {renderProfileImage()}
        <p>
          {comment.user?.firstName || ''} {comment.user?.lastName || ''}
        </p>
      </div>
    </div>
  )
}

export default PostComment
