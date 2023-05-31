import { useState } from 'react'
import styles from './styles.module.css'

type FilterProps = {
  filters: string[]
}

const Filter = ({ filters }: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState(filters[0])

  const handleClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <div className={styles.page_filters_section}>
      <div className={styles.filters_container}>
        <p>Mostrar:</p>
        <ul>
          {filters.map((filter, index) => (
            <li
              className={filter === activeFilter ? styles.active : ''}
              key={index}
              onClick={() => handleClick(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filter
