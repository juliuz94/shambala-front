import { Tabs } from 'antd'
import { Video } from '@/types'
import styles from './styles.module.css'

interface PropTypes {
  video: Video | null
}


const VideoTabs = ({ video }: PropTypes) => {

  const items = [
    {
      key: '1',
      label: `Descripción`,
      children: <VideoDescription video={video} />,
    },
    {
      key: '2',
      label: `Archivos Adjuntos`,
      children: `Content of Tab Pane 2`,
    }
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  // const splitTextIntoParagraph = (longString: string) => {
  //   const stringLength = longString?.length

  //   if (!longString) return null
  //   if (stringLength < 400) return <h3>{longString}</h3>

  //   const paragraphsArray = longString.split(/\r?\n/g)

  //   return paragraphsArray.map(paragraph => {
  //     if (paragraph === '') return null
  //     return <p className={styles.bio_text}>{paragraph}</p>
  //   })
  // }

  return (
    <div className={styles.tabs_container}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default VideoTabs

const VideoDescription = ({ video }: PropTypes) => {
  return (
    <div className={styles.video_description}>
      <p>
        { video?.description }
      </p>
    </div>
  )
}