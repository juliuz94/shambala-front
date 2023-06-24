import { useState } from 'react'
import { Avatar, Input, Button, Popover } from 'antd'
import {
  HiArrowSmallRight,
  HiEllipsisVertical,
  HiOutlineTrash,
} from 'react-icons/hi2'
import { BiUpArrowAlt } from 'react-icons/bi'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Video, Comment, PaginatedComments } from '@/types'
import styles from './styles.module.css'

interface PropTypes {
  video: Video | null
  comments: PaginatedComments | null
  refreshData: () => void
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>
}

const VideoComments = ({
  video,
  refreshData,
  comments,
  setShowComments,
}: PropTypes) => {
  const [textInput, setTextInput] = useState('')

  const handleCreateComment = async () => {
    try {
      await axiosInstance.post(ROUTES.COMMENT, {
        message: textInput,
        videoId: video?._id,
      })
      setTextInput('')
      refreshData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.video_comments}>
      <div className={styles.comments_container}>
        <div
          className={styles.header}
          onClick={() => setShowComments((prev) => !prev)}
        >
          <p>
            Comentarios{' '}
            <span>
              <BiUpArrowAlt />
            </span>
          </p>
        </div>
        <div className={styles.comments_box}>
          {comments &&
            comments?.docs.length > 0 &&
            comments.docs.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  refreshData={refreshData}
                />
              )
            })}
        </div>
        <div className={styles.add_comment_box}>
          <div className={styles.form_container}>
            <Input.TextArea
              bordered={false}
              size='large'
              rows={1}
              placeholder='Escribe tu comentario'
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button type='ghost' onClick={handleCreateComment}>
              <HiArrowSmallRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoComments

type CommentProps = {
  comment: Comment
  refreshData: () => void
}

const Comment = ({ comment, refreshData }: CommentProps) => {
  const handleDeleteComment = async () => {
    try {
      const res = await axiosInstance.delete(`${ROUTES.COMMENT}/${comment._id}`)
      refreshData()
      console.log(res)
    } catch (error) {
      console.log('[handleDeleteComment]', error)
    }
  }

  const PopOverContent = (
    <div className={styles.popover}>
      <Button type='ghost' className={styles.delete_comment_button}>
        <HiOutlineTrash />
        <p>Borrar</p>
      </Button>
    </div>
  )

  return (
    <div className={styles.comment_card}>
      <div className={styles.comment_header}>
        <div className={styles.user_info}>
          <Avatar size='small' />
          {/* <p>{user?.displayName}</p> */}
        </div>
        <Popover placement='right' content={PopOverContent} trigger='click'>
          <Button
            type='ghost'
            className={styles.comment_options}
            onClick={handleDeleteComment}
          >
            <HiEllipsisVertical />
          </Button>
        </Popover>
      </div>

      <div className={styles.text_container}>
        <p>{comment.message}</p>
      </div>
    </div>
  )
}
