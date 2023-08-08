import { FC } from 'react'
import { Button, Modal } from 'antd'
import { useUserContext } from '@/context/userContext'
import { axiosInstance } from '@/axios/axiosInstance'
import { HiArrowRight } from 'react-icons/hi2'
import { ExclamationCircleFilled } from '@ant-design/icons'
import useFetchAnnouncement from '@/Hooks/useFetchAnnouncement'
import ROUTES from '@/helpers/routes'
import dayjs from 'dayjs'
import styles from './styles.module.css'

const Announcements: FC = () => {
  const { announcement, setAnnouncement }: any = useFetchAnnouncement()

  const handleNextAnnouncement = () => {
    setAnnouncement((prevAnnouncement: any) => {
      if (prevAnnouncement && Array.isArray(prevAnnouncement.docs)) {
        const newOrder = prevAnnouncement.docs
          .slice(1)
          .concat(prevAnnouncement.docs[0])
        return { ...prevAnnouncement, docs: newOrder }
      }
      return prevAnnouncement
    })
  }

  if (announcement?.docs.length < 1) {
    return null
  }

  return (
    <section className={styles.announcements_section}>
      <h2>Anuncios</h2>
      <div className={styles.announcements_container}>
        {announcement?.docs.map((announ: any) => (
          <AnnouncementCard key={announ._id} announ={announ} />
        ))}
        <Button
          className={styles.next_card_button}
          onClick={handleNextAnnouncement}
        >
          <HiArrowRight />
        </Button>
      </div>
    </section>
  )
}

export default Announcements

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
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announ }) => {
  const { confirm } = Modal
  const { user } = useUserContext()
  const { announcement, setAnnouncement, refreshData }: any = useFetchAnnouncement()
  const formattedDate = dayjs(announcement?.createdAt).format('DD MMMM YYYY')

  const handleDeleteAnnouncement = async () => {
    confirm({
      title: 'Deseas borrar este anuncio?',
      icon: <ExclamationCircleFilled />,
      okText: 'Borrar',
      cancelText: 'Cancelar',
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await axiosInstance.delete(`${ROUTES.ANNOUNCEMENT}/${announ._id}`)
            refreshData()
            return resolve('')
          } catch (error) {
            console.log(error)
            return reject()
          }
        })
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));
      },
      onCancel() { },
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
              <Button size='small' type='ghost'>
                Ver más
              </Button>
              {
                user?.company.owner === user?._id && (
                  <Button size='small' type='ghost' className={styles.delete_button} onClick={handleDeleteAnnouncement}>
                    Borrar
                  </Button>
                )
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}
