import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Video, Attachment } from '@/types'
import FileCard from '@/components/FileCard'
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
      children: <VideoFiles video={video} />,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className={styles.tabs_container}>
      <Tabs items={items} />
    </div>
  )
}

export default VideoTabs

const VideoDescription = ({ video }: PropTypes) => {
  const splitTextIntoParagraph = (longString: string) => {
    const hasSpaces = /\r?\n/g.test(longString)

    if (!hasSpaces) {
      return <p>{longString}</p>
    }

    const paragraphsArray = longString.split(/\r?\n/g)

    return paragraphsArray.map((paragraph, index) => {
      if (paragraph === '') return null
      return (
        <p key={index} className={styles.bio_text}>
          {paragraph}
        </p>
      )
    })
  }

  return (
    <div className={styles.video_description}>
      {splitTextIntoParagraph(video?.description ?? '')}
      {/* <p>
        {video?.description}
      </p> */}
    </div>
  )
}

const VideoFiles = ({ video }: PropTypes) => {
  const [guides, setGuides] = useState<Attachment[] | []>([])
  const [files, setFiles] = useState<Attachment[] | []>([])

  useEffect(() => {
    const guides: Attachment[] =
      video?.attachments?.filter((file) => file.guide === true) ?? []
    setGuides(guides)
    const files: Attachment[] =
      video?.attachments?.filter((file) => file.guide === false) ?? []
    setFiles(files)
  }, [video])

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
}
