import { useEffect, useState } from 'react'
import { Tabs, Tag, Button, Spin } from 'antd'
import { Video } from '@/types'
import styles from './styles.module.css'
import { Attachment } from '@/types'
import FileCard from '@/components/FileCard'

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
      <Tabs items={items}/>
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

// const FileCard = ({ file }: { file: Attachment}) => {
//   const [loadingDownload, setLoadingDownload] = useState(false)

//   const handleDownload = (url: string, fileName: string) => {
//     downloadFile(url, fileName, () => setLoadingDownload(true), () => setLoadingDownload(false))
//   }

//   return (
//     <div key={file._id} className={`${styles.attachment_card}`}>
//       <div className={styles.attachment_data}>
//         <p className={styles.attachment_title}>
//           {file.title}
//           {
//             file.guide && <Tag color='green'>Guía</Tag>
//           }
//         </p>
//         <p className={styles.attachment_description}>
//           {file.description}
//         </p>
//       </div>
//       <div className={styles.attachment_actions}>
//         <Button disabled={loadingDownload} className={styles.attachment_button} onClick={() => handleDownload(file.url, file.title)}>
//           {!loadingDownload ? <HiCloudArrowDown />: <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />}
//         </Button>
//       </div>
//     </div>
//   )
// }
