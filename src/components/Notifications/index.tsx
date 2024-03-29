import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Filter from '@/components/PageFilter'
import { Avatar, Button, Skeleton } from 'antd'
import styles from './styles.module.css'
import { Notification } from '@/types'
import { getNotificationMessage, getNotificationURL } from '@/helpers/getNotificationMessage'
import { useUserContext } from '@/context/userContext'
import useFetchNotifications from '@/Hooks/useFetchNotifications'

const Notifications = () => {
  const router = useRouter()
  const { user } = useUserContext()
  const [filter, setFilter] = useState<boolean | null>(false)
  const { notifications, paginationData, refreshNotifications, setNotificationAsRead, loadingData } = useFetchNotifications(filter, 1)

  const options = [
    {
      tag: 'No leídas',
      category: false,
    },
    {
      tag: 'Leídas',
      category: true,
    },
    {
      tag: 'Todas',
      category: null,
    },
  ]

  const handleChangeCategory = (category: boolean | null) => {
    setFilter(category)
    refreshNotifications(category, 1)
  }

  const redirectUserToNotification = (notification: Notification) => {
    const url = getNotificationURL(notification, user)
    if (url) {
      router.push(url)
    }
  }

  return (
    <section className={styles.section}>
      <Head>
        <title>Notificaciones</title>
      </Head>
      <img
        className={styles.bg}
        src='/images/svg/community_bg.svg'
        alt='bg'
      />
      <div className={styles.container}>
        <div className={styles.page_title}>
          <h1>Notificaciones</h1>
        </div>
        <div className={styles.events_options}>
          <Filter filters={options} onFilterSelect={(category) => handleChangeCategory(category)} />
        </div>

        {loadingData && (
          <div className={styles.skeleton_container}>
            <Skeleton active={true} />
            <Skeleton active={true} />
          </div>
        )}

        {
          notifications?.length > 0 && !loadingData && <div className={styles.notifications_container}>
            {notifications.map((notification: Notification) => {
              return (
                <div className={styles.notification_card} key={notification._id} onClick={() => redirectUserToNotification(notification)}>
                  <div className={styles.notification_data}>
                    <div className={styles.notification_avatar_container}>
                      <Avatar
                        shape='square'
                        className={notification.user_dispatch?.image ? '' : styles.avatar}
                        src={notification.user_dispatch?.image}
                      >
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>
                          {notification.user_dispatch?.firstName?.split('')[0]}
                          {notification.user_dispatch?.lastName?.split('')[0]}
                        </p>
                      </Avatar>
                    </div>
                    <p className={styles.notification_message}>
                      {getNotificationMessage(notification)}
                    </p>
                  </div>
                  {
                    !notification.read && (
                      <div className={styles.notification_options}>
                        <Button type='link' onClick={(e) => setNotificationAsRead(e, notification._id, false)}>
                          Marcar como leída
                        </Button>
                      </div>
                    )
                  }
                </div>
              )
            })
            }
            {
              paginationData.hasNextPage && (
                <Button size='large' className={styles.load_more_button} onClick={() => refreshNotifications(filter, paginationData.nextPage)}>
                  Ver más notificaciones
                </Button>
              )
            }
          </div>
        }
      </div>
    </section>
  )
}

export default Notifications