import Head from 'next/head'
import { useEffect, useState } from 'react'
import useFetchPosts from '@/Hooks/useFetchPosts'
import { DocPost } from '@/types'
import { useUserContext } from '@/context/userContext'
import Post from '@/components/Community/Post'
import PostForm from '@/components/Community/PostForm'
import UpdateUserInfoModal from '../Modals/UpdateUserInfoModal'
import SearchInput from '@/components/SearchInput'
import { axiosInstance } from '@/axios/axiosInstance'
import { CommentData } from '@/types/index'
import ROUTES from '@/helpers/routes'
import Filter from '@/components/PageFilter'
import ShowRulesModal from '../Modals/ShowRules'
import styles from './styles.module.css'

const Community = () => {
  const { user } = useUserContext()
  const [showPost, setShowPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<DocPost | null>(null)
  const [comments, setComments] = useState<CommentData | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [commentsLimit, setCommentsLimit] = useState(10)
  const [filteredPosts, setFilteredPosts] = useState<DocPost[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false)

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
  const { posts, setUpdatePost } = useFetchPosts(
    pageNumber,
    category,
    searchString,
    setPageNumber
  )

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

  const handleSearch = (value: string) => {
    setSearchString(value)
  }

  useEffect(() => {
    if (!user) return
    if (!user?.tags || user?.tags.length < 1) {
      setShowUpdateModal(true)
    }
  }, [user])

  const handlePinPost = async (post: DocPost, pin: boolean) => {
    try {
      const res = await axiosInstance.patch(`${ROUTES.POST}/${post._id}`, {
        pin: pin
      })
      setUpdatePost((prevUpdatePost) => !prevUpdatePost)
      console.log('res ->', res)
    } catch (error) {
      console.log('handlePinPost', error)
    }
  }

  return (
    <section className={styles.section}>
      <Head>
        <title>Comunidad</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.community}>
          <h1>¡Construyamos Comunidad!</h1>
          <div
            className={styles.rules_container}
            onClick={() => setShowRulesModal(true)}
          >
            <button className={styles.rules}>Reglas del juego</button>
          </div>
        </div>

        <div className={styles.events_options}>
          <SearchInput onSearch={handleSearch} />
          <Filter filters={filters} onFilterSelect={handleFilterSelect} />
        </div>

        <PostForm
          setPageNumber={setPageNumber}
          setUpdatePost={setUpdatePost}
          category={category}
        />

        <div className={styles.comments}>
          {(filteredPosts.length > 0 ? filteredPosts : posts?.docs)?.map(
            (post: DocPost, index: number) => (
              <Post
                post={post}
                key={index}
                setUpdatePost={setUpdatePost}
                setShowPost={setShowPost}
                setPageNumber={setPageNumber}
                handlePinPost={handlePinPost}
              />
            )
          )}
        </div>

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />

        <UpdateUserInfoModal
          open={showUpdateModal}
          setOpen={setShowUpdateModal}
        />

        <ShowRulesModal
          isModalOpen={showRulesModal}
          setIsModalOpen={setShowRulesModal}
        />
      </div>
    </section>
  )
}

export default Community
