import Header from '@/components/Header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Avatar, Button, Tabs } from 'antd'
import { HiOutlineArrowSmallLeft, HiOutlineClock, HiOutlineMapPin } from 'react-icons/hi2'
import styles from './styles.module.css'

const tabs = [
  {
    key: '1',
    label: `Descripción`
  },
  {
    key: '2',
    label: `Agenda`
  }
]

const Event = () => {
  const router = useRouter()
  return (
    <div>
      <Header />
      <div className={styles.event_header}>
        <div className={styles.event_info}>
          <Button type='ghost' className={styles.back_button} onClick={() => router.back()}>
            <HiOutlineArrowSmallLeft />
          </Button>
          <h1 className={styles.event_title}>
            FIMA Feria Internacional del Medio Ambiente
          </h1>
          <div className={styles.speakers}>
            <div className={styles.speaker}>
              <Avatar
                size='small'
                src='/images/person_image.jpg'
              />
              <p>
                Kai Olivares
              </p>
            </div>
          </div>
          <div className={styles.event_time}>
            <HiOutlineClock />
            <p>
              mar, 16 de marzo, 5:00 pm. - vie, 19 de marzo, 5:00 pm.
            </p>
          </div>
          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>
              Corferias Cra. 37 #24 - 67, Bogotá
            </p>
          </div>
          <div className={styles.sponsors}>
            <p>Presentado por:</p>
            <Image src='/images/shambala_logo.png' alt='sponsor_logo' width={80} height={25} />
          </div>
        </div>

        <div className={styles.event_image}>
          <Image
            src='/images/event_image_large.jpg'
            alt='Event image'
            fill

          />
        </div>
      </div>

      <div className={styles.event_info_container}>
        <div className={styles.tabs}>
          <Tabs defaultActiveKey="1" items={tabs} onChange={() => {}} />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Event