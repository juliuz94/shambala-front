import moment from 'moment'
import 'moment/locale/es'
import { Doc } from '@/Hooks/useFetchPosts'
import { CommentData, DocComment } from '@/pages/community'
import CommentForm from '../CommentForm'
import PostComment from '../PostComment'
import styles from './styles.module.css'
import { useEffect, useRef } from 'react'

type SetShowPostFunction = (value: boolean) => void

interface PostProps {
  setShowPost: SetShowPostFunction
  post: Doc | null
  comments: CommentData | null
  fetchComments: (id: string, limit: number) => Promise<void>
  setComments: React.Dispatch<React.SetStateAction<CommentData | null>>
  commentsLimit: number
  setCommentsLimit: React.Dispatch<React.SetStateAction<number>>
}

const ShowPost: React.FC<PostProps> = ({
  setShowPost,
  post,
  comments,
  fetchComments,
  setComments,
  commentsLimit,
  setCommentsLimit,
}) => {
  const commentsRef = useRef<HTMLDivElement>(null)

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

        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: post?.text || '' }}
        />

        <div className={styles.user}>
          {renderProfileImage()}
          <p>
            {post?.user.firstName || ''} {post?.user.lastName || ''}
          </p>
        </div>

        <p className={styles.answer}>Responder</p>

        <div className={styles.comments} ref={commentsRef}>
          {comments?.docs &&
            comments.docs.map((comment: DocComment, index: number) => (
              <PostComment comment={comment} key={index} />
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
