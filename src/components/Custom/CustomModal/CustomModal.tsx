import Portal from './Portal'
import styles from './styles.module.css'
import { IoMdCloseCircleOutline } from 'react-icons/io'

interface Props {
  children: React.ReactNode
  onClose: () => void
  isOpen: boolean
}

export default function CustomModal({ children, onClose, isOpen }: Props) {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modal}>
            <div className={styles.section}>
              <div className={styles.btn_close}>
                <IoMdCloseCircleOutline size={30} onClick={onClose} />
              </div>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
