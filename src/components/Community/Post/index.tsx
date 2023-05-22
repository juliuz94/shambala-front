import CommentForm from '../CommentForm'
import PostComment from '../PostComment'
import styles from './styles.module.css'

const Post = ({ setShowPost }: any) => {
  return (
    <div className={styles.container}>
      <img
        src='/images/svg/arrow_back.svg'
        alt='back'
        onClick={() => setShowPost(false)}
        className={styles.back}
      />

      <div className={styles.post}>
        <div className={styles.title}>
          <h1>
            Tell me about a time you strongly disagreed with your manager. What
            did you do to convince him or her that you were right? What
            happened?
          </h1>
        </div>

        <div className={styles.options}>
          <div className={styles.info}>
            <p>Hace 1 día</p>
            <p>•</p>
            <p>12 Respuestas</p>
          </div>
        </div>

        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          viverra purus at sapien rhoncus imperdiet. Nam tempus eleifend metus,
          eu laoreet dui convallis eu. Nulla quis tellus sit amet magna aliquam
          faucibus eu ut magna. Nulla elementum fermentum magna quis lobortis.
          In lobortis feugiat vestibulum. Aenean et ultricies elit, in rhoncus
          dolor. Fusce efficitur purus sit amet metus scelerisque suscipit.
          Vestibulum quis convallis dui, sed ullamcorper ligula.
        </p>

        <div className={styles.user}>
          <div className={styles.pfp} />
          <p>Melany Fernández</p>
        </div>

        <p className={styles.answer}>Responder</p>

        <div className={styles.comments}>
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
        </div>

        <CommentForm />
      </div>
    </div>
  )
}

export default Post
