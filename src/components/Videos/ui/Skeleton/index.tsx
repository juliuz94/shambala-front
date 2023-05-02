import { Skeleton } from 'antd'
import styles from './styles.module.css'

const VideosSkeletonCard = () => {
  return (
    <div className={styles.skeleton_card}>
      <Skeleton.Image className={styles.skeleton_card_image} style={{ width: '100%', height: '200px' }} active={true} />
      <Skeleton.Input active={true} size='large' style={{ margin: '0.6rem 0' }} />
      <Skeleton.Input active={true} size='small' block={true} style={{ marginBottom: '0.4rem' }} />
      <Skeleton.Input active={true} size='small' block={true} />
    </div>
  )
}

const VideoRowSkeleton = () => {
  return (
    <div className={styles.skeleton_row_container}>
      <div style={{ width: '200px', marginBottom: '1rem' }}>
        <Skeleton.Button active={true} size='large' block={true} />
      </div>
      <div className={styles.skeleton_row}>
        <VideosSkeletonCard />
        <VideosSkeletonCard />
        <VideosSkeletonCard />
        <VideosSkeletonCard />
      </div>
    </div>
  )
}

export default VideoRowSkeleton