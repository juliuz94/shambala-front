import React, { useState } from 'react'
import { Modal } from 'antd'
import styles from './styles.module.css'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedVideo: any
}

const ShowVideoModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedVideo,
}: Props) => {
  const maxSnippetLength = 200

  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsModalOpen(false)
  }

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsModalOpen(false)
  }

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev)
  }

  const getDescriptionSnippet = () => {
    if (selectedVideo?.description.length > maxSnippetLength) {
      return selectedVideo?.description.substring(0, maxSnippetLength) + '...'
    } else {
      return selectedVideo?.description
    }
  }

  return (
    <Modal
      title={`${selectedVideo?.title}`}
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
      width={800}
    >
      <video width='100%' controls>
        <source src={selectedVideo?.url} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <p>
        {showFullDescription
          ? selectedVideo?.description
          : getDescriptionSnippet()}
        {selectedVideo?.description.length >= maxSnippetLength && (
          <button className={styles.button} onClick={toggleDescription}>
            {showFullDescription ? 'Mostrar menos' : 'Mostrar más'}
          </button>
        )}
      </p>
    </Modal>
  )
}

export default ShowVideoModal
