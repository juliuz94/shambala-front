import { useEffect, useState } from 'react'
import { Avatar, Button, Modal } from 'antd'
import useFetchAnnoun from '@/Hooks/useFetchAnnoun'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io/index'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { useUserContext } from '@/context/userContext'
import AnnouncementForm from '@/components/Company/UI/AnnouncementForm'
import { HiTrash } from 'react-icons/hi2'
import styles from './styles.module.css'

type ShowAnnounProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  setUpdateAnnoun: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowAnnounModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  setUpdateAnnoun,
}: ShowAnnounProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const { announ, setUpdateAnn } = useFetchAnnoun(id)
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

  const handleDeleteComment = (id: string) => {
    Modal.confirm({
      title: 'Deseas borrar este comentario?',
      icon: <ExclamationCircleFilled />,
      okText: 'Borrar',
      cancelText: 'Cancelar',
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await axiosInstance.delete(
              `${ROUTES.ANNOUNCEMENT}/comment:${id}`
            )
            setUpdateAnnoun((prevState) => !prevState)
            setUpdateAnn((prev) => !prev)
            resolve('')
          } catch (error) {
            console.log(error)
            reject()
          }
        })
      },
      onCancel() {},
    })
  }

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
        <div dangerouslySetInnerHTML={{ __html: announ?.content || '' }} />
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
      </div>

      <AnnouncementForm id={id} setUpdateAnn={setUpdateAnn} />

      <div className={styles.comments}>
        <h4>Comentarios</h4>
        <div className={styles.comments_container}>
          {announ?.comments?.map((comment) => {
            return (
              <div key={comment._id} className={styles.comment_card}>
                <Avatar
                  size='small'
                  style={{
                    backgroundColor: '#0F72EC',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '25px',
                  }}
                  src={comment?.user?.image}
                >
                  <p style={{ fontSize: '0.75rem' }}>
                    {comment?.user?.firstName.split('')[0]}
                    {comment?.user?.lastName?.split('')[0]}
                  </p>
                </Avatar>
                <div className={styles.comment_content}>
                  <p>{comment.message}</p>
                  <div className={styles.comment_user_data}>
                    <p>
                      {comment?.user?.lastName}{' '}
                      {comment?.user?.lastName ? comment?.user?.lastName : ''}
                    </p>
                  </div>
                </div>
                {(user?.type === 'admin' ||
                  comment?.user?._id === user?._id) && (
                  <div className={styles.comment_options}>
                    <Button
                      type='ghost'
                      className={styles.options_button}
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <HiTrash />
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default ShowAnnounModal
