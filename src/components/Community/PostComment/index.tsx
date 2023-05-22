import styles from './styles.module.css'

const PostComment = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        The module system provides more context to the build system, thus
        providing stuff like lazy-loading support out of the box
      </p>

      <div className={styles.user}>
        <div className={styles.pfp} />
        <p>Melany Fernández</p>
      </div>
    </div>
  )
}

export default PostComment
