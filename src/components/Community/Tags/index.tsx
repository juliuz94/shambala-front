import { ChangeEvent, useState } from 'react'
import useFetchTags from '@/Hooks/useFetchTags'
import styles from './styles.module.css'

interface TagsProps {
  onTagSelect: (tagId: string) => void
}

const Tags = ({ onTagSelect }: TagsProps) => {
  const { tags } = useFetchTags()
  const [selectedTag, setSelectedTag] = useState('')

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedTag(value)
    onTagSelect(value)
  }

  return (
    <div className={styles.container}>
      <p>Filtrar por etiquetas:</p>
      <select
        className={`${styles.select} ${
          selectedTag === '' ? styles.noSelection : ''
        }`}
        onChange={handleTagChange}
      >
        <option value=''>Seleccionar</option>
        {tags?.docs?.map((tag) => (
          <option key={tag._id} value={tag._id}>
            {tag.es}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Tags
