import Head from 'next/head'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { FC, useState } from 'react'
import Header from '@/components/Header'
import { Avatar, Button, Tabs, Steps } from 'antd'
import {
  HiOutlineArrowSmallLeft,
  HiOutlineClock,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import { FaLinkedinIn } from 'react-icons/fa'
import Splash from '@/components/Splash'
import FileCard from '@/components/FileCard'
import { Attachment } from '@/types'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import useFetchLandingWorkshop from '@/Hooks/useFetchLandingWorkshop'
import styles from './styles.module.css'

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
  const [guides, setGuides] = useState<Attachment[] | []>([])
  const [files, setFiles] = useState<Attachment[] | []>([])
  const [tabSelected, setTabSelected] = useState('1')
  const router = useRouter()

  const { landingWorkshop, loading } = useFetchLandingWorkshop()

  const workshopFilter = landingWorkshop.filter(
    (event) => event._id === router.query.id
  )

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
        return splitTextIntoParagraph(workshopFilter[0]?.description as any)

      case '2':
        return (
          <>
            <Steps
              direction='vertical'
              size='small'
              progressDot
              current={workshopFilter[0]?.agenda.length}
              items={workshopFilter[0]?.agenda.map((e) => ({
                title: e.title,
                description: e.place,
                subTitle: e.time,
              }))}
            />
          </>
        )

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

  if (loading || !workshopFilter) {
    return <Splash />
  }

  return (
    <div className={styles.event_container}>
      <Head>
        <title>Evento - {workshopFilter[0]?.title}</title>
      </Head>

      <div className={styles.event_header}>
        <div className={styles.event_info}>
          <Button
            type='ghost'
            className={styles.back_button}
            onClick={() => router.back()}
          >
            <HiOutlineArrowSmallLeft />
          </Button>
          <h1 className={styles.event_title}>{workshopFilter[0]?.title}</h1>
          <div className={styles.speakers}>
            <div className={styles.speakers}>
              <div className={styles.speaker}>
                <Avatar
                  size='small'
                  style={{
                    backgroundColor: '#0F72EC',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  src={workshopFilter[0]?.speakers[0]?.image}
                >
                  <p style={{ fontSize: '0.5rem' }}>
                    {
                      workshopFilter[0]?.speakers[0]?.name
                        .split(' ')[0]
                        .split('')[0]
                    }
                    {
                      workshopFilter[0]?.speakers[0]?.name
                        .split(' ')[1]
                        ?.split('')[0]
                    }
                  </p>
                </Avatar>
                <p className={styles.speaker_name}>
                  {workshopFilter[0]?.speakers[0]?.name}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.event_time}>
            <HiOutlineClock />
            <p className={styles.time}>
              {dayjs(workshopFilter[0]?.date).format('MMM D, YYYY')}
            </p>
          </div>
          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>{workshopFilter[0]?.location}</p>
          </div>
          {workshopFilter[0]?.sponsors.length > 0 && (
            <div className={styles.sponsors}>
              <p>Presentado por:</p>
              {workshopFilter[0]?.sponsors.map((sponsor) => {
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
          <img src={workshopFilter[0]?.image} alt={workshopFilter[0]?.title} />
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
          {workshopFilter[0]?.speakers.length > 0 && (
            <div className={styles.speaker_card}>
              <div className={styles.speaker_card_header}>
                <div className={styles.speaker_data}>
                  <Avatar
                    size='large'
                    src={workshopFilter[0]?.speakers[0]?.image}
                  />
                  <p className={styles.speaker_name}>
                    {workshopFilter[0]?.speakers[0]?.name}
                  </p>
                </div>
                <Button
                  className={styles.linkedin_button}
                  href={workshopFilter[0]?.speakers[0]?.linkedin}
                  target='_blank'
                >
                  <FaLinkedinIn />
                </Button>
              </div>
              <div className={styles.speaker_card_body}>
                <p className={styles.speaker_bio}>
                  {workshopFilter[0]?.speakers[0]?.biography}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

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
