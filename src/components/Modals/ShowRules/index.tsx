import { Modal, Form } from 'antd'
import styles from './styles.module.css'

type ShowRulesModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowRulesModal = ({
  isModalOpen,
  setIsModalOpen,
}: ShowRulesModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Reglas del juego'
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Form name='basic' autoComplete='off'>
        <div className={styles.content}>
          <p>1. No se permiten groserías.</p>
          <p>
            2. Ninguna opinión es estúpida. Respeta todas las opiniones y vas a
            comprender que tú también puedes aprender mucho sobre ese punto de
            vista.
          </p>
          <p>
            3. Este es sobre todo un espacio de respeto, así que siempre
            busquemos conversar y debatir desde el amor y la armonía
          </p>
          <p>
            4. Intenta que tus opiniones contribuyan a expandir nuestros
            conocimientos.
          </p>
          <p>
            5. Si no quieres hablar está bien, pero te invitamos a contribuir
            tanto como puedas.
          </p>
        </div>
      </Form>
    </Modal>
  )
}

export default ShowRulesModal
