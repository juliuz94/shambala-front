import styles from './styles.module.css'

const CommentForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.pfp} />

        <input
          className={styles.input_bar}
          type='text'
          placeholder='Comenta...'
        />
      </div>

      <button className={styles.button} type='button'>
        Comentar
      </button>
    </div>
  )
}

export default CommentForm
