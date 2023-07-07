import Link from 'next/link'
import { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { Doc } from '@/Hooks/useFetchPosts'
import { IoIosHeartEmpty, IoMdTrash, IoIosHeart } from 'react-icons/io/index'
import { axiosInstance } from '@/axios/axiosInstance'
import { useUserContext } from '@/context/userContext'
import ROUTES from '@/helpers/routes'
import styles from './styles.module.css'
import DeletePostModal from '@/components/Modals/DeletePost'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
moment.locale('es')

interface PostProps {
  post: Doc
  onSelectPost: (post: Doc) => void
  fetchComments: (id: string, limit: number) => Promise<void>
  commentsLimit: number
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
}

const Post = ({
  post,
  onSelectPost,
  fetchComments,
  commentsLimit,
  setUpdatePost,
}: PostProps) => {
  const { user } = useUserContext()

  const [deletePostModal, setDeletePostModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const timeAgo = moment(post.createdAt).fromNow()

  const { renderProfileImage } = useRenderProfileImage(
    post?.user?.image,
    post?.user?.firstName,
    post?.user?.lastName,
    styles.pfp
  )

  const handleSelectPost = () => {
    onSelectPost(post)
    fetchComments(post._id, commentsLimit)
  }

  const likePost = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await axiosInstance.post(
        `${ROUTES.POST}/handleLike?id=${post._id}&isLike=${!isLiked}`
      )
      setIsLiked(!isLiked)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    setDeletePostModal(true)
  }

  useEffect(() => {
    if (post.likes.some((like) => like._id === user?._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [post, user])

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

        <div className={styles.icons}>
          {isLiked ? (
            <IoIosHeart
              style={{ fill: '#54c055' }}
              size={24}
              onClick={likePost}
            />
          ) : (
            <IoIosHeartEmpty
              style={{ fill: '#54c055' }}
              size={24}
              onClick={likePost}
            />
          )}

          {post?.user?._id === user?._id && (
            <IoMdTrash
              style={{ fill: '#54c055' }}
              size={24}
              onClick={deletePost}
            />
          )}
        </div>
      </div>

      <DeletePostModal
        isModalOpen={deletePostModal}
        setIsModalOpen={setDeletePostModal}
        id={post?._id as string}
        setUpdatePost={setUpdatePost}
      />

      <p className={styles.answer}>Responder</p>
    </div>
  )
}

export default Post
