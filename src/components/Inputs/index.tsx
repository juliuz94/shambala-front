import { Input } from 'antd'
import styles from './styles.module.css'

interface InputProps {
  placeholder: string
  className: string
  label: string
  type?: string
}


const InputComponent=({placeholder, className, label, type}: InputProps) => {
  return (
    <article className={className} >
      <p className={styles.label} >{label}</p >
      <Input placeholder={placeholder} className={styles.input} type={type} />
    </article >
  )
}

export default InputComponent