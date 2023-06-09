import Head from 'next/head'
import { useEffect, useState } from 'react'
import useFetchPosts, { Doc } from '@/Hooks/useFetchPosts'
import { useUserContext } from '@/context/userContext'
import Header from '@/components/Header'
import Post from '@/components/Community/Post'
import PostForm from '@/components/Community/PostForm'
import ShowPost from '@/components/Community/ShowPost'
import SearchInput from '@/components/SearchInput'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import Filter from '@/components/PageFilter'
import styles from './styles.module.css'

export interface CommentData {
  docs: DocComment[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: null
  nextPage: null
}

export interface DocComment {
  _id: string
  message: string
  postId: string
  user: UserComment
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface UserComment {
  vulnerable: boolean
  _id: string
  uid: string
  email: string
  emailWork: null
  nationalIdType: null
  nationalId: null
  firstName: string
  lastName: string
  bio: null
  image: null
  invitedBy: null
  company: null
  isVolunteer: boolean
  type: null
  createdAt: Date
  updatedAt: Date
  __v: number
}

const Community = () => {
  const { user } = useUserContext()
  const [showPost, setShowPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Doc | null>(null)
  const [comments, setComments] = useState<CommentData | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [commentsLimit, setCommentsLimit] = useState(10)

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

  const filters = [
    'Agora Virtual',
    'Retos Ambientales',
    'Pon tu grano de arena',
    user.company ? user.company.title : null,
  ].filter(Boolean)

  const { posts, setUpdatePost } = useFetchPosts(pageNumber)

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight

    if (!showPost && bottom && posts?.hasNextPage) {
      setPageNumber((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [posts, showPost])

  return (
    <section className={styles.section}>
      <Head>
        <title>Comunidad</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.community}>
          <h1>Foro y Comunidad</h1>
        </div>

        {showPost ? (
          <ShowPost
            post={selectedPost}
            setShowPost={setShowPost}
            comments={comments}
            fetchComments={fetchComments}
            setComments={setComments}
            commentsLimit={commentsLimit}
            setCommentsLimit={setCommentsLimit}
          />
        ) : (
          <>
            <div className={styles.events_options}>
              <SearchInput />
              <Filter filters={filters} />
            </div>

            <PostForm setUpdatePost={setUpdatePost} />

            <div className={styles.comments} onClick={() => setShowPost(true)}>
              <div
                className={styles.comments}
                onClick={() => setShowPost(true)}
              >
                {posts?.docs &&
                  posts.docs.map((post: Doc, index: number) => (
                    <Post
                      post={post}
                      key={index}
                      onSelectPost={setSelectedPost}
                      fetchComments={fetchComments}
                      commentsLimit={commentsLimit}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />
      </div>
    </section>
  )
}

export default Community
