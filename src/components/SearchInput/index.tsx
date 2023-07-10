import { Input } from 'antd'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import styles from './styles.module.css'

interface SearchInputProps {
  onSearch?: (value: string) => void
}

const SearchInput = ({ onSearch }: SearchInputProps) => {

  const debounce =  (cb: (value: string) => void, delay: number)  => {
    let timeout: ReturnType<typeof setTimeout>

    return (value: string) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(value)
      }, delay)
    }
  }

  const sendSearch = debounce((value: string) => {
    if (onSearch) {
      onSearch(value)
    }
  }, 500)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    sendSearch(value)
    // if (onSearch) {
    //   onSearch(value)
    // }
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
