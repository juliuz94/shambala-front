import { useState, useEffect } from 'react'
import styles from './styles.module.css'

type FilterItem = {
  tag: string
  category: string
}

type FilterProps = {
  filters: FilterItem[] | any
  onFilterSelect?: (category: string) => void
}

const Filter = ({ filters, onFilterSelect }: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterItem>(filters[0])

  const handleClick = (filter: FilterItem = filters[0]) => {
    setActiveFilter(filter)
    if (onFilterSelect) {
      onFilterSelect(filter.category)
    }
  }

  return (
    <div className={styles.page_filters_section}>
      <div className={styles.filters_container}>
        <p>Mostrar:</p>
        <ul>
          {filters.map((filter: any, index: any) => (
            <li
              className={filter.tag === activeFilter?.tag ? styles.active : ''}
              key={index}
              onClick={() => handleClick(filter)}
            >
              {filter.tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filter
