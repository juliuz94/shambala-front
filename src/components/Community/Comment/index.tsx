import styles from './styles.module.css'

const Comment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          Tell me about a time you strongly disagreed with your manager. What
          did you do to convince him or her that you were right? What happened?
        </h1>
      </div>

      <div className={styles.options}>
        <div className={styles.info}>
          <p>Hace 1 día</p>
          <p>•</p>
          <p>12 Respuestas</p>
        </div>

        <div className={styles.circle}>
          <img
            className={styles.arrow}
            src='/images/svg/arrow_right.svg'
            alt='arrow'
          />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.pfp} />
        <p>Melany Fernández</p>
      </div>

      <p className={styles.answer}>Responder</p>
    </div>
  )
}

export default Comment
