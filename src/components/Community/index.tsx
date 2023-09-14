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
import ROUTES from '@/helpers/routes'
import Filter from '@/components/PageFilter'
import ShowRulesModal from '../Modals/ShowRules'
import Tags from './Tags'
import styles from './styles.module.css'

const Community = () => {
  const { user } = useUserContext()
  const [pageNumber, setPageNumber] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<DocPost[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false)
  const [tagId, setTagId] = useState<string>('')

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
    setPageNumber,
    tagId
  )

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
        pin: pin,
      })
      setUpdatePost((prevUpdatePost) => !prevUpdatePost)
    } catch (error) {
      console.log('handlePinPost', error)
    }
  }

  const handleTagSelect = (selectedTagId: string) => {
    setTagId(selectedTagId)
  }

  return (
    <section className={styles.section}>
      <Head>
        <title>Comunidad</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.community}>
          <h1>¡Construyamos Comunidad!</h1>
        </div>

        <div className={styles.tags_container}>
          <button
            type='button'
            className={styles.rules}
            onClick={() => setShowRulesModal(true)}
          >
            Reglas del juego
          </button>
          <Tags onTagSelect={handleTagSelect} />
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
