import { FC } from 'react'
import { Button } from 'antd'
import { HiArrowRight } from 'react-icons/hi2'
import useFetchAnnouncement from '@/Hooks/useFetchAnnouncement'
import dayjs from 'dayjs'
import styles from './styles.module.css'

const Announcements: FC = () => {
  const { announcement, setAnnouncement } = useFetchAnnouncement()

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
  const { announcement, setAnnouncement } = useFetchAnnouncement()
  const formattedDate = dayjs(announcement?.createdAt).format('DD MMMM YYYY')

  return (
    <>
      {announcement?.docs.length > 0 && (
        <div className={styles.announcement_card}>
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
        </div>
      )}
    </>
  )
}
