import { useState } from 'react'
import { Button, Spin, Tag } from 'antd'
import { downloadFile } from '@/helpers/downloadFile'
import { Attachment } from '@/types'
import { HiCloudArrowDown } from 'react-icons/hi2'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

const FileCard = ({ file }: { file: Attachment}) => {
  const [loadingDownload, setLoadingDownload] = useState(false)

  const handleDownload = (url: string, fileName: string) => {
    downloadFile(url, fileName, () => setLoadingDownload(true), () => setLoadingDownload(false))
  }

  return (
    <div key={file._id} className={`${styles.attachment_card}`}>
      <div className={styles.attachment_data}>
        <p className={styles.attachment_title}>
          {file.title}
          {
            file.guide && <Tag color='green'>Guía</Tag>
          }
        </p>
        <p className={styles.attachment_description}>
          {file.description}
        </p>
      </div>
      <div className={styles.attachment_actions}>
        <Button disabled={loadingDownload} className={styles.attachment_button} onClick={() => handleDownload(file.url, file.title)}>
          {!loadingDownload ? <HiCloudArrowDown />: <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />}
        </Button>
      </div>
    </div>
  )
}

export default FileCard

