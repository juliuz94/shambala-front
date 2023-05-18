import Head from 'next/head'
import Header from '@/components/Header'
import styles from '@/styles/Community.module.css'
import Comment from '@/components/Community/Comment'
import PostForm from '@/components/Community/PostForm'
import PostFilter from '@/components/Community/PostFilter'

const CommunityPage = () => {
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

        <PostFilter />

        <PostForm />

        <div className={styles.comments}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
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

export default CommunityPage
