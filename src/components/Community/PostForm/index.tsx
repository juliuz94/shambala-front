import styles from './styles.module.css'

const PostForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.pfp} />

        <input
          className={styles.input_bar}
          type='text'
          placeholder='Comparte algún tema que este en tu mente...'
        />
      </div>

      <button className={styles.button} type='button'>
        Crear post
      </button>
    </div>
  )
}

export default PostForm
