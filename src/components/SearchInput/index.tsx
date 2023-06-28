import { Input } from 'antd'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import styles from './styles.module.css'

interface SearchInputProps {
  onSearch?: (value: string) => void
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <div>
      <Input
        className={styles.input}
        placeholder='Buscar...'
        suffix={<HiMagnifyingGlass />}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchInput
