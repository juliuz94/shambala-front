import { Input } from 'antd'
import { HiMagnifyingGlass, HiMiniLockClosed, HiXCircle } from 'react-icons/hi2'
import styles from './styles.module.css'

interface SearchInputProps {
  onSearch?: (value: string) => void
  currentValue?: string
}

const SearchInput = ({ onSearch, currentValue }: SearchInputProps) => {
  const debounce = (cb: (value: string) => void, delay: number) => {
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
        suffix={
          !currentValue?.trim() ? (
            <HiMagnifyingGlass />
          ) : (
            <div onClick={() => sendSearch('')}>
              <HiXCircle />
            </div>
          )
        }
        onChange={handleSearch}
        value={currentValue}
      />
    </div>
  )
}

export default SearchInput
