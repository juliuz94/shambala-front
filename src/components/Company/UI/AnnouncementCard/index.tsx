import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useUserContext } from '@/context/userContext'
import { axiosInstance } from '@/axios/axiosInstance'
import { ExclamationCircleFilled } from '@ant-design/icons'
import ShowAnnounModal from '@/components/Modals/ShowAnnoun'
import ROUTES from '@/helpers/routes'
import dayjs from 'dayjs'
import styles from './styles.module.css'

interface AnnouncementCardProps {
  announ: {
    company: string
    content: string
    createdBy: string
    image: string
    title: string
    updatedAt: string
    __v: number
    _id: string
  }
  announcement: any
  setUpdateAnnoun: React.Dispatch<React.SetStateAction<boolean>>
}

export const AnnouncementCard = ({
  announ,
  announcement,
  setUpdateAnnoun,
}: AnnouncementCardProps) => {
  const { confirm } = Modal
  const { user } = useUserContext()
  const [isAnnounModalOpen, setIsAnnounModalOpen] = useState(false)
  const formattedDate = dayjs(announcement?.createdAt).format('DD MMMM YYYY')

  const handleDeleteAnnouncement = async () => {
    confirm({
      title: 'Deseas borrar este anuncio?',
      icon: <ExclamationCircleFilled />,
      okText: 'Borrar',
      cancelText: 'Cancelar',
      centered: true,
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await axiosInstance.delete(`${ROUTES.ANNOUNCEMENT}/${announ._id}`)
            setUpdateAnnoun((prev: any) => !prev)
            return resolve('')
          } catch (error) {
            console.log(error)
            return reject()
          }
        })
      },
      onCancel() {},
    })
  }

  return (
    <>
      {announcement?.docs.length > 0 && (
        <div className={styles.announcement_card}>
          <div className={styles.announcement_content}>
            <div className={styles.image_container}>
              <img
                className={styles.img}
                src={announ?.image}
                alt={announ?.title}
              />
            </div>
            <div className={styles.announcement_info}>
              <h2 className={styles.announcement_title}>{announ.title}</h2>
              <p className={styles.announcement_date}>{formattedDate}</p>
              <div
                className={styles.announcement_text}
                dangerouslySetInnerHTML={{ __html: announ?.content || '' }}
              />
            </div>
            <div className={styles.buttons}>
              <Button
                size='small'
                type='ghost'
                onClick={() => setIsAnnounModalOpen(true)}
              >
                Ver más
              </Button>
              {user?.company.owner === user?._id && (
                <Button
                  size='small'
                  type='ghost'
                  className={styles.delete_button}
                  onClick={handleDeleteAnnouncement}
                >
                  Borrar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <ShowAnnounModal
        isModalOpen={isAnnounModalOpen}
        setIsModalOpen={setIsAnnounModalOpen}
        id={announ?._id}
      />
    </>
  )
}
