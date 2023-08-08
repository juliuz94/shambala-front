import { Button } from 'antd'
import { HiArrowRight } from 'react-icons/hi2'
import { AnnouncementCard } from '../AnnouncementCard'
import styles from './styles.module.css'

type AnnouncementsProps = {
  announcement: any
  setAnnouncement: React.Dispatch<React.SetStateAction<any>>
  setUpdateAnnoun: React.Dispatch<React.SetStateAction<boolean>>
}

const Announcements = ({
  announcement,
  setAnnouncement,
  setUpdateAnnoun,
}: AnnouncementsProps) => {
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
          <AnnouncementCard
            key={announ._id}
            announ={announ}
            announcement={announcement}
            setUpdateAnnoun={setUpdateAnnoun}
          />
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
