import { FC, useState } from 'react'
import { Button } from 'antd'
import { HiArrowRight } from 'react-icons/hi2'
import styles from './styles.module.css'

const Announcements: FC = () => {
  const testAnnouncements = [
    {
      key: 1,
      title: 'Titula de anuncio 1',
      date: '23 Marzo 2023',
      img: '/images/event_image.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra purus at sapien rhoncus imperdiet. Nam tempus eleifend metus, eu laoreet dui convallis eu. Nulla quis tellus sit amet magna...',
    },
    {
      key: 2,
      title: 'Titula de anuncio 2',
      date: '23 Marzo 2023',
      img: '/images/event_image.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra purus at sapien rhoncus imperdiet. Nam tempus eleifend metus, eu laoreet dui convallis eu. Nulla quis tellus sit amet magna...',
    },
    {
      key: 3,
      title: 'Titula de anuncio 3',
      date: '23 Marzo 2023',
      img: '/images/event_image.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra purus at sapien rhoncus imperdiet. Nam tempus eleifend metus, eu laoreet dui convallis eu. Nulla quis tellus sit amet magna...',
    },
    {
      key: 4,
      title: 'Titula de anuncio 4',
      date: '23 Marzo 2023',
      img: '/images/event_image.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra purus at sapien rhoncus imperdiet. Nam tempus eleifend metus, eu laoreet dui convallis eu. Nulla quis tellus sit amet magna...',
    },
  ]
  const [announcements, setAnnouncements] = useState(testAnnouncements)

  const handleNextAnnouncement = () => {
    setAnnouncements((prevAnnouncements) => {
      const newOrder = prevAnnouncements.slice(1).concat(prevAnnouncements[0])
      return newOrder
    })
  }

  return (
    <section className={styles.announcements_section}>
      <h2>Anuncios</h2>
      <div className={styles.announcements_container}>
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.key}
            announcement={announcement}
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

interface AnnouncementCardProps {
  announcement: {
    key: number
    title: string
    date: string
    img: string
    text: string
  }
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <div className={styles.announcement_card}>
      <div className={styles.image_container}>
        <img src={announcement.img} alt={announcement.title} />
      </div>
      <div className={styles.announcement_info}>
        <h2 className={styles.announcement_title}>{announcement.title}</h2>
        <p className={styles.announcement_date}>{announcement.date}</p>
        <p className={styles.announcement_text}>{announcement.text}</p>
      </div>
    </div>
  )
}
