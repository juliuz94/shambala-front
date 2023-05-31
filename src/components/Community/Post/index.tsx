import moment from 'moment'
import 'moment/locale/es'
import { Doc } from '@/Hooks/useFetchPosts'
import styles from './styles.module.css'

interface Props {
  post: Doc
  onSelectPost: (post: Doc) => void
  fetchComments: (id: string, limit: number) => Promise<void>
  commentsLimit: number
}

const Post = ({ post, onSelectPost, fetchComments, commentsLimit }: Props) => {
  moment.locale('es')

  const timeAgo = moment(post.createdAt).fromNow()

  const handleSelectPost = () => {
    onSelectPost(post)
    fetchComments(post._id, commentsLimit)
  }

  const renderProfileImage = () => {
    if (post?.user?.image) {
      return <img src={post?.user.image} className={styles.pfp} alt='profile' />
    } else {
      const initials = `${post?.user?.firstName?.[0] || ''}${
        post?.user?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  return (
    <div className={styles.container} onClick={handleSelectPost}>
      <div className={styles.title}>
        <h1>{post.title}</h1>
      </div>

      <div className={styles.options}>
        <div className={styles.info}>
          <p>{timeAgo}</p>
          <p>•</p>
          <p>12 Respuestas</p>
        </div>

        <div className={styles.circle}>
          <img
            className={styles.arrow}
            src='/images/svg/arrow_right.svg'
            alt='arrow'
          />
        </div>
      </div>

      <div className={styles.user}>
        {renderProfileImage()}
        <p>
          {post.user?.firstName || ''} {post.user?.lastName || ''}
        </p>
      </div>

      <p className={styles.answer}>Responder</p>
    </div>
  )
}

export default Post
