import { FC, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Header from '@/components/Header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Avatar, Button, Tabs } from 'antd'
import {
  HiOutlineArrowSmallLeft,
  HiOutlineClock,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import { FaLinkedinIn } from 'react-icons/fa'
import { Inter } from 'next/font/google'
import { toast } from 'sonner'
import Splash from '@/components/Splash'
import styles from './styles.module.css'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import FileCard from '@/components/FileCard'
import { Workshop, Attachment } from '@/types'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

dayjs.locale(es)

const inter = Inter({
  subsets: ['latin'],
})

const tabs = [
  {
    key: '1',
    label: `Descripción`,
  },
  {
    key: '2',
    label: `Agenda`,
  },
  {
    key: '3',
    label: 'Archivos',
  },
]

const Event: FC = () => {
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState<Workshop | null>(null)
  const [guides, setGuides] = useState<Attachment[] | []>([])
  const [files, setFiles] = useState<Attachment[] | []>([])
  const [tabSelected, setTabSelected] = useState('1')
  const router = useRouter()
  const {
    query: { id },
  } = router

  const fetchEvent = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.get(`${ROUTES.WORKSHOP}/${id}`)
      console.log('event ->', data)
      setEvent(data)
      const attachments = data.attachments
      if (attachments.length > 0) {
        const guidesFilter = attachments.filter(
          (file: Attachment) => file.guide === true
        )
        setGuides(guidesFilter)
        const filesFilter = attachments.filter(
          (file: Attachment) => file.guide === false
        )
        setFiles(filesFilter)
      }
    } catch (error) {
      console.log('[fetchEvent]', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!id) return
    fetchEvent()
  }, [id, fetchEvent])

  const splitTextIntoParagraph = (longString: string) => {
    const hasSpaces = /\r?\n/g.test(longString)

    if (!hasSpaces) {
      return <p>{longString}</p>
    }

    const paragraphsArray = longString.split(/\r?\n/g)

    return paragraphsArray.map((paragraph, index) => {
      if (paragraph === '') return null
      return (
        <p key={index} className={styles.event_description}>
          {paragraph}
        </p>
      )
    })
  }

  const renderTabContent = () => {
    switch (tabSelected) {
      case '1':
        return splitTextIntoParagraph(event?.description as any)

      case '3':
        return (
          <div className={styles.video_files}>
            {guides.length > 0 && (
              <div className={styles.attachments_container}>
                {guides.map((guide) => (
                  <FileCard key={guide._id} file={guide} />
                ))}
              </div>
            )}
            {files.length > 0 && (
              <div className={styles.attachments_container}>
                {files.map((file) => (
                  <FileCard key={file._id} file={file} />
                ))}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  if (loading || !event) {
    return <Splash />
  }

  return (
    <div className={styles.event_container}>
      <Header />
      <div className={styles.event_header}>
        <div className={styles.event_info}>
          <Button
            type='ghost'
            className={styles.back_button}
            onClick={() => router.back()}
          >
            <HiOutlineArrowSmallLeft />
          </Button>
          <h1 className={styles.event_title}>{event.title}</h1>
          <div className={styles.speakers}>
            {event?.speakers.length > 0 && (
              <div className={styles.speakers}>
                {event?.speakers.map((speaker) => {
                  return (
                    <div key={speaker._id} className={styles.speaker}>
                      <Avatar
                        size='small'
                        style={{
                          backgroundColor: '#0F72EC',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        src={speaker.image}
                      >
                        <p style={{ fontSize: '0.5rem' }}>
                          {speaker.name.split(' ')[0].split('')[0]}
                          {speaker.name.split(' ')[1]?.split('')[0]}
                        </p>
                      </Avatar>
                      <p className={styles.speaker_name}>{speaker.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className={styles.event_time}>
            <HiOutlineClock />
            <p>{dayjs(event?.date).format('MMM D, YYYY')}</p>
          </div>
          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>{event?.location}</p>
          </div>
          {event?.sponsors.length > 0 && (
            <div className={styles.sponsors}>
              <p>Presentado por:</p>
              {event?.sponsors.map((sponsor) => {
                return (
                  <div key={sponsor._id} className={styles.sponsor_image}>
                    <img src={sponsor.image} alt='sponsor_logo' />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className={styles.event_image}>
          <img src={event.image} alt={event.title} />
        </div>
      </div>

      <div className={styles.event_info_container}>
        <div className={styles.left_column}>
          <div className={styles.tabs}>
            <Tabs
              defaultActiveKey='1'
              items={tabs}
              onChange={(tab) => setTabSelected(tab)}
            />
          </div>
          <div className={styles.tabs_content}>{renderTabContent()}</div>
        </div>

        <div className={styles.right_column}>
          {event.speakers.length > 0 && (
            <div className={styles.speaker_card}>
              <div className={styles.speaker_card_header}>
                <div className={styles.speaker_data}>
                  <Avatar size='large' src={event.speakers[0].image} />
                  <p className={styles.speaker_name}>
                    {event.speakers[0].name}
                  </p>
                </div>
                <Button
                  className={styles.linkedin_button}
                  href={event.speakers[0].linkedin}
                  target='_blank'
                >
                  <FaLinkedinIn />
                </Button>
              </div>
              <div className={styles.speaker_card_body}>
                <p className={styles.speaker_bio}>
                  {event.speakers[0].biography}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {createPortal(
        <div className={styles.event_subscription}>
          <div className={styles.event_subscription_content}>
            <div className={styles.event_subscription_left_column}>
              <div className={styles.event_info_block}>
                <label className='event_info_label'>Fecha</label>
                <p className='event_info_text'>
                  {dayjs(event.date).format('DD MMMM YYYY')}
                </p>
              </div>
              <div className={styles.event_info_block}>
                <label className='event_info_label'>Hora</label>
                <p className='event_info_text'>5:30 PM</p>
              </div>
              {/* <div className={styles.event_info_block}>
                <label className='event_info_label'>
                  Duración
                </label>
                <p className='event_info_text'>
                  60 minutos
                </p>
              </div> */}
            </div>

            <div className={styles.event_subscription_right_column}>
              <div className={styles.event_info_price}>
                <label className='event_info_label'>Precio</label>
                <p className='event_info_text'>GRATIS</p>
              </div>
              <button
                className='event_info_button'
                onClick={() => toast.success('Inscripción exitosa')}
              >
                <p>Registrarme ahora</p>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx global>{`
        .event_info_label,
        .event_info_text,
        .event_info_button {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </div>
  )
}

export default Event
