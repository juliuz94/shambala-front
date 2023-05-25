import styles from './styles.module.css'

const PostFilter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search_bar}>
        <input className={styles.input} type='text' placeholder='Buscar...' />

        <span className={styles.search}>
          <img src='/images/svg/search.svg' alt='search' />
        </span>
      </div>

      <div className={styles.filters}>
        <span>Mostrar:</span>
        <p>Todos</p>
        <p>Fauna</p>
        <p>Ambiente</p>
        <p>Sustentabilidad</p>
      </div>
    </div>
  )
}

export default PostFilter
