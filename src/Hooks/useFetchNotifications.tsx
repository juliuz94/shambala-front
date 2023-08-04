import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import { Notification } from '@/types'
import ROUTES from '@/helpers/routes'

const fetchNotificationsByUser = (read: boolean | null, page: number = 1) => {
  const [loadingData, setLoadingData] = useState(false)
  const [paginationData, setPaginationData] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0
  })
  const [notifications, setNotifications] = useState<Notification[]>([])

  const fetchNotifications = async (read: boolean | null, page: number) => {
    setLoadingData(true)
    try {
      let url = `${ROUTES.NOTIFICATIONS_BY_USER}?page=${page}`
      if (typeof read !== 'object') {
        url = `${url}&read=${read}`
      }

      const { data } = await axiosInstance.get(url)
      
      if (page === 1) {
        setNotifications(data.docs)
      } else {
        setNotifications(prevDocs => {
          return [...prevDocs, ...data.docs]
        })
      }

      setPaginationData({
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
        limit: data.limit,
        nextPage: data.nextPage,
        page: data.page,
        pagingCounter: data.pagingCounter,
        prevPage: data.prevPage,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages
      })

    } catch (error) {
      console.log('[fetchVideos]', error)
    } finally {
      setLoadingData(false)
    }
  }

  const refreshNotifications = (read: boolean | null, page: number) => {
    console.log('refreshNotifications ->', {
      read,
      page
    })
    fetchNotifications(read, page)
  }

  const setNotificationAsRead = async (notificationId: string, read: boolean) => {
    try {
      await axiosInstance.patch(`${ROUTES.NOTIFICATIONS}/${notificationId}`, {
        read: true,
        notifyByEmail: true
      })
      fetchNotifications(read, paginationData.page)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    fetchNotifications(read, page)
  }, [])

  return { notifications, paginationData, loadingData, refreshNotifications, setNotificationAsRead }
}

export default fetchNotificationsByUser