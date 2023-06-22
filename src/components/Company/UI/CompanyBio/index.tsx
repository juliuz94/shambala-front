import { FC } from 'react'
import { Button } from 'antd'
import { HiPlay } from 'react-icons/hi2'
import { useUserContext } from '@/context/userContext'
import styles from './styles.module.css'

type CompanyBioProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CompanyBio: FC<CompanyBioProps> = ({ setIsModalOpen }) => {
  const { user } = useUserContext()

  return (
    <div className={styles.company_bio_container}>
      <div className={styles.thumbnail_container}>
        <img src='/images/card_image.jpg' />
        <div className={styles.play_icon_container}>
          <HiPlay />
        </div>
      </div>
      {user?.company.owner === user?._id ? (
        <div className={styles.button_container}>
          <Button
            type='primary'
            size='large'
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
          >
            Añadir anuncio
          </Button>
        </div>
      ) : (
        ''
      )}
      <p>
        La definición de sostenibilidad hace referencia a la implementación de
        un modelo de negocio que no perjudique, a través de su actividad, a las
        generaciones futuras. En ámbito empresarial, esta definición aplicada a
        la gestión de gastos y política de empresa se centra en la reducción de
        “daños colaterales.
      </p>
    </div>
  )
}

export default CompanyBio
