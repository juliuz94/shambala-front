import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/Header'
import Comment from '@/components/Community/Comment'
import PostForm from '@/components/Community/PostForm'
import PostFilter from '@/components/Community/PostFilter'
import Post from '@/components/Community/Post'
import styles from '@/styles/Community.module.css'

const CommunityPage = () => {
  const [showPost, setShowPost] = useState(false)

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
          <Post setShowPost={setShowPost} />
        ) : (
          <>
            <PostFilter />

            <PostForm />

            <div className={styles.comments} onClick={() => setShowPost(true)}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
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

export default CommunityPage
