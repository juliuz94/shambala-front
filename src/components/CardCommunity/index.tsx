import styles from './styles.module.css'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface CardCommunityProps {
  comment: string
  author: string
  daysAgo: string
  reply?: string
}

const CardCommunity=({comment, daysAgo, reply, author}: CardCommunityProps) => {
  return (
    <div className={styles.container} >
      <section className={styles.comment} >
        <p >{comment}</p >
      </section >
      <section className={styles.row_container} >
        <Avatar size={26} icon={<UserOutlined />} />
        <p className={styles.author_name} >{author}</p >
      </section >
      <section className={styles.row_container} >
        <p className={styles.days_ago} >{daysAgo}</p >
        •
        <p className={styles.days_ago} >{reply}</p >
      </section >
    </div >
  )
}

export default CardCommunity