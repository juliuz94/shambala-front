import Head from 'next/head'
import { useEffect, useState } from 'react'
import useFetchPosts, { Doc } from '@/Hooks/useFetchPosts'
import { useUserContext } from '@/context/userContext'
import Post from '@/components/Community/Post'
import PostForm from '@/components/Community/PostForm'
import ShowPost from '@/components/Community/ShowPost'
import SearchInput from '@/components/SearchInput'
import { axiosInstance } from '@/axios/axiosInstance'
import { CommentData } from '@/types/index'
import ROUTES from '@/helpers/routes'
import Filter from '@/components/PageFilter'
import styles from './styles.module.css'

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
    {
      tag: 'Agora Virtual',
      category: 'AGORA_VIRTUAL',
    },
    {
      tag: 'Retos Ambientales',
      category: 'RETOS_AMBIENTALES',
    },
    {
      tag: 'Pon tu grano de arena',
      category: 'PON_TU_GRANO_DE_ARENA',
    },
    {
      tag: user.community ? user.community.title : null,
      category: user.community ? user.community._id : null,
    },
  ].filter((filter) => filter.tag !== null)

  const [category, setCategory] = useState(filters[0].category)
  const { posts, setUpdatePost } = useFetchPosts(pageNumber, category)

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

  const handleFilterSelect = (category: string) => {
    setCategory(category)
  }

  return (
    <section className={styles.section}>
      <Head>
        <title>Comunidad</title>
      </Head>

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
              <Filter filters={filters} onFilterSelect={handleFilterSelect} />
            </div>

            <PostForm setUpdatePost={setUpdatePost} category={category} />

            <div className={styles.comments} onClick={() => setShowPost(true)}>
              <div
                className={styles.comments}
                onClick={() => setShowPost(true)}
              >
                {posts?.totalDocs
                  ? posts.docs.map((post: Doc, index: number) => (
                      <Post
                        post={post}
                        key={index}
                        onSelectPost={setSelectedPost}
                        fetchComments={fetchComments}
                        commentsLimit={commentsLimit}
                      />
                    ))
                  : ''}
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
