import { useEffect, useRef } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { DocPost } from '@/types'
import { CommentData, DocComment } from '@/types'
import CommentForm from '../CommentForm'
import PostComment from '../PostComment'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import parse from 'html-react-parser'
import styles from './styles.module.css'

type SetShowPostFunction = (value: boolean) => void

interface PostProps {
  setShowPost: SetShowPostFunction
  post: DocPost | null
  comments: CommentData | null
  fetchComments: (id: string, limit: number) => Promise<void>
  setComments: React.Dispatch<React.SetStateAction<CommentData | null>>
  commentsLimit: number
  setCommentsLimit: React.Dispatch<React.SetStateAction<number>>
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowPost: React.FC<PostProps> = ({
  setShowPost,
  post,
  comments,
  fetchComments,
  setComments,
  commentsLimit,
  setCommentsLimit,
  setUpdatePost,
}) => {
  const commentsRef = useRef<HTMLDivElement>(null)

  const { renderProfileImage } = useRenderProfileImage(
    post?.user?.image,
    post?.user?.firstName,
    post?.user?.lastName,
    styles.pfp
  )

  const handleGoBack = () => {
    setShowPost(false)
    setComments(null)
    setCommentsLimit(10)
  }

  const handleCommentScroll = () => {
    if (commentsRef.current) {
      const bottom =
        commentsRef.current.scrollHeight - commentsRef.current.scrollTop ===
        commentsRef.current.clientHeight

      if (bottom && comments?.hasNextPage) {
        setCommentsLimit((prevLimit) => prevLimit + 10)
      }
    }
  }

  const convertImageUrlToImageTag = (htmlString: string) => {
    const imageRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g

    return htmlString.replace(imageRegEx, '<img src="$&" alt="dynamic image"/>')
  }

  useEffect(() => {
    const commentDiv = commentsRef.current

    if (commentDiv) {
      commentDiv.addEventListener('scroll', handleCommentScroll)

      return () => {
        commentDiv.removeEventListener('scroll', handleCommentScroll)
      }
    }
  }, [commentsRef.current, comments])

  useEffect(() => {
    if (post?._id) {
      fetchComments(post._id, commentsLimit)
    }
  }, [commentsLimit])

  return (
    <div className={styles.section}>
      <img
        src='/images/svg/arrow_back.svg'
        alt='back'
        onClick={handleGoBack}
        className={styles.back}
      />

      <div className={styles.post}>
        <div className={styles.title}>
          <h1>{post?.title || ''}</h1>
        </div>

        <div className={styles.options}>
          <div className={styles.info}>
            <p>{moment(post?.createdAt).fromNow()}</p>
            <p>•</p>
            <p>{comments?.totalDocs || 0} Respuestas</p>
          </div>
        </div>

        <div className={styles.text}>
          {post && parse(convertImageUrlToImageTag(post.text))}
        </div>

        <div className={styles.user}>
          {renderProfileImage()}
          <p>
            {post?.user?.firstName || ''} {post?.user?.lastName || ''}
          </p>
        </div>

        <div className={styles.comments} ref={commentsRef}>
          {comments?.docs
            ?.filter((comment: DocComment) => comment.anchored === true)
            .map((comment: DocComment, index: number) => (
              <PostComment
                id={post?._id || ''}
                fetchComments={fetchComments}
                comment={comment}
                commentsLimit={commentsLimit}
                key={index}
                setUpdatePost={setUpdatePost}
              />
            ))}
          {comments?.docs
            ?.filter((comment: DocComment) => !comment.anchored === true)
            .map((comment: DocComment, index: number) => (
              <PostComment
                id={post?._id || ''}
                fetchComments={fetchComments}
                comment={comment}
                commentsLimit={commentsLimit}
                key={index}
                setUpdatePost={setUpdatePost}
              />
            ))}
        </div>

        <CommentForm
          id={post?._id || ''}
          fetchComments={fetchComments}
          commentsLimit={commentsLimit}
          setCommentsLimit={setCommentsLimit}
        />
      </div>
    </div>
  )
}

export default ShowPost
