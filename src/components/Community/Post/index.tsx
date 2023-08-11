import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { DocPost } from '@/types'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io/index'
import { BsTrashFill, BsPinFill, BsPin } from 'react-icons/bs'
import { axiosInstance } from '@/axios/axiosInstance'
import { useUserContext } from '@/context/userContext'
import ROUTES from '@/helpers/routes'
import DeletePostModal from '@/components/Modals/DeletePost'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import styles from './styles.module.css'
moment.locale('es')

interface PostProps {
  post: DocPost
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  handlePinPost: (post: DocPost, pin: boolean) => void
}

const Post = ({
  post,
  setUpdatePost,
  setPageNumber,
  handlePinPost,
}: PostProps) => {
  const router = useRouter()
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
    router.push(`/community/post/${post._id}`)
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

  const handlePin = (e: React.MouseEvent, post: DocPost, pin: boolean) => {
    e.stopPropagation()
    handlePinPost(post, pin)
  }

  const redirectToProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/profile/${post.user?._id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={handleSelectPost}>
        <h1>{post.title}</h1>
      </div>

      <div className={styles.options}>
        <div className={styles.info}>
          <p>{timeAgo}</p>
          <p>•</p>
          <p>{post?.commentsCount || 0} Respuestas</p>
        </div>

        <div className={styles.circle} onClick={handleSelectPost}>
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

          <p className={styles.links} onClick={redirectToProfile}>
            {post.user?.firstName || ''} {post.user?.lastName || ''}
          </p>
        </div>
      </div>

      <DeletePostModal
        isModalOpen={deletePostModal}
        setIsModalOpen={setDeletePostModal}
        id={post?._id as string}
        setUpdatePost={setUpdatePost}
        setPageNumber={setPageNumber}
      />

      <div className={styles.footer}>
        <p className={styles.answer} onClick={handleSelectPost}>
          Responder
        </p>
        <div className={styles.icons}>
          {isLiked ? (
            <IoIosHeart
              style={{ fill: '#54c055', cursor: 'pointer' }}
              size={24}
              onClick={likePost}
            />
          ) : (
            <IoIosHeartEmpty
              style={{ fill: '#54c055', cursor: 'pointer' }}
              size={24}
              onClick={likePost}
            />
          )}

          {(post?.user?._id === user?._id || user?.type === 'admin') && (
            <BsTrashFill
              className={styles.delete}
              style={{ fill: '#54c055' }}
              size={20}
              onClick={deletePost}
            />
          )}

          {user?.type === 'admin' && post.pin ? (
            <BsPinFill
              color='#54c055'
              style={{ cursor: 'pointer' }}
              onClick={(e) => handlePin(e, post, false)}
            />
          ) : (
            <BsPin
              color='#54c055'
              style={{ cursor: 'pointer' }}
              onClick={(e) => handlePin(e, post, true)}
            />
          )}

          {post.pin && (
            <div className={styles.pinned_post}>
              <p>Destacado</p>
              <BsPinFill color='#54c055' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
