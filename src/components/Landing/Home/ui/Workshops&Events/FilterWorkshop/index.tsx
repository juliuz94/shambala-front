import { useState, Dispatch, SetStateAction } from 'react'
import styles from './styles.module.css'

type FilterItem = {
  tag: string
  category: string
}

type FilterProps = {
  setCategory: Dispatch<SetStateAction<string>>
}

const Filter = ({ setCategory }: FilterProps) => {
  const filters: FilterItem[] = [
    {
      tag: 'Todos',
      category: 'ALL',
    },
    {
      tag: 'Talleres',
      category: 'WORKSHOP',
    },
    {
      tag: 'Eventos',
      category: 'EVENT',
    },
  ]

  const [activeFilter, setActiveFilter] = useState<FilterItem>(filters[0])

  const handleFilterSelect = (filter: FilterItem) => {
    setActiveFilter(filter)
    setCategory(filter.category)
  }

  return (
    <div className={styles.page_filters_section_left}>
      <div className={styles.filters_container}>
        <ul>
          {filters.map((filter: FilterItem, index: number) => (
            <li
              className={filter.tag === activeFilter.tag ? styles.active : ''}
              key={index}
              onClick={() => handleFilterSelect(filter)}
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
