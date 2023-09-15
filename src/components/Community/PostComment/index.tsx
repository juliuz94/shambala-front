import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { DocComment } from '@/pages/community'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io/index'
import { BsPinFill, BsPin, BsTrashFill } from 'react-icons/bs'
import { useUserContext } from '@/context/userContext'
import DeleteCommentModal from '@/components/Modals/DeleteComment'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import styles from './styles.module.css'
import { sendPoints } from '@/helpers/gamification'

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
  const [isLiked, setIsLiked] = useState(false)

  const { renderProfileImage } = useRenderProfileImage(
    comment?.user.image,
    comment?.user?.firstName,
    comment?.user?.lastName,
    styles.pfp
  )

  const handlePinComment = async () => {
    if (comment?.anchored) {
      try {
        await axiosInstance.delete(`${ROUTES.PIN_COMMENT}/${comment._id}`)
        fetchComments(id, commentsLimit)
      } catch (error) {
        console.log('[handlePinComment]', error)
      }
    } else {
      try {
        const res = await axiosInstance.post(`${ROUTES.PIN_COMMENT}`, {
          commentId: comment._id,
        })
        fetchComments(id, commentsLimit)
      } catch (error) {
        console.log('[handlePinComment]', error)
      }
    }
  }

  const handleLikeComment = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await axiosInstance.post(
        `${ROUTES.POST_COMMENT}/handleLike?id=${comment._id}&isLike=${!isLiked}`
      )
      if (!isLiked === true) {
        const response = await sendPoints('LIKE_COMMENT', {
          userId: user._id,
        })
        console.log('response:handleLikeComment', response)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLiked(!isLiked)
    }
  }

  useEffect(() => {
    if (comment?.likes?.includes(user?._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [comment, user])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.text}>{comment?.message || ''}</p>
      </div>

      <div className={styles.comment_footer}>
        <div className={styles.user}>
          {renderProfileImage()}
          <Link href={`/profile/${comment.user?._id}`} className={styles.links}>
            <p>
              {comment.user?.firstName || ''} {comment.user?.lastName || ''}
            </p>
          </Link>
          {comment.anchored && (
            <div className={styles.anchored_comment}>
              <p>Destacado</p>
              <BsPinFill />
            </div>
          )}
        </div>

        <div className={styles.comment_options}>
          {(comment?.user?._id === user?._id ||
            (user?.type && user?.type === 'admin')) && (
            <Button className={styles.comment_button} type='link'>
              <BsTrashFill
                style={{ fill: '#54c055' }}
                onClick={() => setDeleteCommentModal(true)}
              />
            </Button>
          )}

          {user?.type && user?.type === 'admin' && (
            <Button
              className={`${styles.comment_button}`}
              onClick={() => handlePinComment()}
              type='link'
            >
              {comment.anchored ? <BsPinFill /> : <BsPin />}
            </Button>
          )}

          {isLiked ? (
            <IoIosHeart
              style={{ fill: '#54c055' }}
              size={24}
              onClick={handleLikeComment}
            />
          ) : (
            <IoIosHeartEmpty
              style={{ fill: '#54c055' }}
              size={24}
              onClick={handleLikeComment}
            />
          )}
        </div>
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
