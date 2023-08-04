import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { DocPost } from '@/types'
import { CommentData, DocComment } from '@/types'
import CommentForm from '@/components/Community/CommentForm'
import PostComment from '@/components/Community/PostComment'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import parse from 'html-react-parser'
import { axiosInstance } from '@/axios/axiosInstance'
import { useUserContext } from '@/context/userContext'
import ROUTES from '@/helpers/routes'
import useFetchPosts from '@/Hooks/useFetchPosts'
import styles from './styles.module.css'

const Post = () => {
  const { user } = useUserContext()
  const commentsRef = useRef<HTMLDivElement>(null)

  const [pageNumber, setPageNumber] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [commentsLimit, setCommentsLimit] = useState(10)
  const [comments, setComments] = useState<CommentData | null>(null)

  const filters = [
    {
      tag: 'Agora Virtual',
      category: 'AGORA_VIRTUAL',
    },
    {
      tag: 'Retos Ambientales',
      category: 'RETOS_AMBIENTALES',
    },
    // {
    //   tag: 'Pon tu grano de arena',
    //   category: 'GRANO_DE_ARENA',
    // },
    {
      tag: user?.community ? user?.community.title : null,
      category: user?.community ? user?.community._id : null,
    },
  ].filter((filter) => filter.tag !== null)

  const [category, setCategory] = useState(filters[0].category)

  // Imagen del usuario del post - poner la propiedad de la imagen del usuario que hizo el post

  // const { renderProfileImage } = useRenderProfileImage(
  //   post?.user?.image,
  //   post?.user?.firstName,
  //   post?.user?.lastName,
  //   styles.pfp
  // )

  const { setUpdatePost } = useFetchPosts(
    pageNumber,
    category,
    searchString,
    setPageNumber
  )

  const handleGoBack = () => {
    setComments(null)
    setCommentsLimit(10)
  }

  const fetchComments = async (id: string, limit: number) => {
    try {
      const res = await axiosInstance.get<CommentData>(
        `${ROUTES.POST_COMMENT}?id=${id}&limit=${limit}`
      )
      setComments(res.data)
    } catch (error) {
      console.error(error)
    }
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

  // Falta poner id del post

  // useEffect(() => {
  //   if (post?._id) {
  //     fetchComments(post._id, commentsLimit)
  //   }
  // }, [commentsLimit])

  return (
    <section className={styles.posts}>
      <Head>
        <title>Posts | Shambala</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.section}>
          <img
            src='/images/svg/arrow_back.svg'
            alt='back'
            onClick={handleGoBack}
            className={styles.back}
          />

          <div className={styles.community}>
            <h1>¡Construyamos Comunidad!</h1>
          </div>

          <div className={styles.post}>
            <div className={styles.title}>
              <h1>Titulo</h1>
            </div>

            <div className={styles.options}>
              <div className={styles.info}>
                {/* Fecha - poner createdAt del post */}
                {/* <p>{moment(post?.createdAt).fromNow()}</p> */}
                <p>•</p>
                <p>{comments?.totalDocs || 0} Respuestas</p>
              </div>
            </div>

            <div className={styles.text}>
              {/* Texto del post - Poner el atributo text del post */}
              {/* {post && parse(convertImageUrlToImageTag(post.text))} */}
            </div>

            <div className={styles.user}>
              {/* Imagen del usuario del post */}
              {/* {renderProfileImage()} */}
              <p>
                {/* Nombre - Poner los atributos del nombre */}
                {/* {post?.user?.firstName || ''} {post?.user?.lastName || ''} */}
                Nombre apellido
              </p>
            </div>

            <div className={styles.comments} ref={commentsRef}>
              {/* Agregar id del post */}

              {/* {comments?.docs
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
                ))} */}
            </div>

            {/* Falta agregarle el id del post */}
            {/* <CommentForm
              id={post?._id || ''}
              fetchComments={fetchComments}
              commentsLimit={commentsLimit}
              setCommentsLimit={setCommentsLimit}
            /> */}
          </div>
        </div>

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />
      </div>
    </section>
  )
}

export default Post
