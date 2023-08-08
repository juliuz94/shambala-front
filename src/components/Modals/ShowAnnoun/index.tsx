import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import useFetchAnnoun from '@/Hooks/useFetchAnnoun'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io/index'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import AnnouncementForm from '@/components/Company/UI/AnnouncementForm'
import styles from './styles.module.css'

type ShowAnnounProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

const ShowAnnounModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
}: ShowAnnounProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const { announ } = useFetchAnnoun(id)
  const { user } = useUserContext()

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const likeAnnoun = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await axiosInstance.patch(`${ROUTES.ANNOUNCEMENT}/like/${id}`)
      setIsLiked(!isLiked)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (announ?.likes?.includes(user?._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [announ, user])

  console.log('single', announ)

  return (
    <Modal
      title={announ?.title.toLocaleUpperCase()}
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={announ?.image} alt={announ?.title} />
        </div>

        <div className={styles.buttons}>
          {isLiked ? (
            <button className={styles.button} onClick={likeAnnoun}>
              Quitar me gusta
              <IoIosHeart style={{ fill: '#54c055' }} size={24} />
            </button>
          ) : (
            <button className={styles.button} onClick={likeAnnoun}>
              Me gusta
              <IoIosHeartEmpty style={{ fill: '#54c055' }} size={24} />
            </button>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: announ?.content || '' }} />

        {/* <AnnouncementForm id={id} /> */}
      </div>
    </Modal>
  )
}

export default ShowAnnounModal
