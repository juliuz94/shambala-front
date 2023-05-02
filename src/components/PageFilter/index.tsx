import styles from './styles.module.css'

const Filter = () => {
  return (
    <div className={styles.page_filters_section}>
      <div className={styles.filters_container}>
        <p>Mostrar:</p>
        <ul>
          <li className={styles.active}>
            Todos
          </li>
          <li>
            Fauna
          </li>
          <li>
            Ambiente
          </li>
          <li>
            Sostenibilidad
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Filter