import { useState } from 'react'
import Head from 'next/head'
import Filter from '@/components/PageFilter'
import { Avatar, Button, Skeleton } from 'antd'
import styles from './styles.module.css'
import { Notification } from '@/types'
import { getNotificationMessage } from '@/helpers/getNotificationMessage'
import fetchNotificationsByUser from '@/Hooks/useFetchNotifications'

const Notifications = () => {
  const [filter, setFilter] = useState<boolean | null>(false)
  const { notifications, paginationData, refreshNotifications, setNotificationAsRead, loadingData } = fetchNotificationsByUser(filter, 1)

  console.log('notifications ->', notifications)

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

  return (
    <section className={styles.section}>
      <Head>
        <title>Comunidad</title>
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
                <div className={styles.notification_card}>
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
                  <div className={styles.notification_options}>
                    <Button type='link'>
                      Marcar como leída
                    </Button>
                  </div>
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