import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/es'
import { Doc } from '@/Hooks/useFetchPosts'
import { IoIosHeart } from 'react-icons/io/index'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
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

  const likePost = async (e: React.MouseEvent) => {
    e.stopPropagation()

    await axiosInstance.post(`${ROUTES.LIKEPOST}`, {
      id: post._id,
      isLike: true,
    })
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
          <p>{post?.commentsCount || 0} Respuestas</p>
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
        <div className={styles.content}>
          {renderProfileImage()}

          <Link href={`/profile/${post.user?._id}`} className={styles.links}>
            <p>
              {post.user?.firstName || ''} {post.user?.lastName || ''}
            </p>
          </Link>
        </div>

        <IoIosHeart style={{ fill: '#54c055' }} size={24} onClick={likePost} />
      </div>

      <p className={styles.answer}>Responder</p>
    </div>
  )
}

export default Post
