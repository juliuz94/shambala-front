import { Input } from 'antd'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import styles from './styles.module.css'

const SearchInput = () => {
  return (
    <div>
      <Input
        // size='large'
        className={styles.input}
        placeholder='Buscar...'
        suffix={
            <HiMagnifyingGlass />
        }
      />
    </div>
  )
}

export default SearchInput