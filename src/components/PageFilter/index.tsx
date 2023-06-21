import { useState } from 'react'
import styles from './styles.module.css'

type FilterProps = {
  filters: string[]
  activeIndex: number
  callback?: (value: string) => void
}

const Filter = ({ filters, activeIndex, callback }: FilterProps) => {
  const handleClick = (filter: string) => {
    if (callback) {
      callback(filter)
    }
  }

  return (
    <div className={styles.page_filters_section}>
      <div className={styles.filters_container}>
        <p>Mostrar:</p>
        <ul>
          {filters.map((filter, index) => (
            <li
              className={index === activeIndex ? styles.active : ''}
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
