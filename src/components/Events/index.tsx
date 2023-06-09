import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { Empty } from 'antd'
import Header from '@/components/Header'
import Filter from '@/components/PageFilter'
import SearchInput from '@/components/SearchInput'
import EventCard from './ui/EventCard'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/es'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { VscFolderOpened } from 'react-icons/vsc'
import { Workshop } from '@/types'
import styles from './styles.module.css'

dayjs.locale(locale)

interface Month {
  key: string
  monthNumber: number
  label: string
}

interface MonthData {
  docs: Workshop[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number
  page: number
  pagingCounter: number
  prevPage: boolean | null
  totalDocs: number
  totalPages: number
}

const Events = () => {
  const [activeMonthTag, setActiveMonthTag] = useState('1')
  const [activeMonth, setActiveMonth] = useState<Month | null>(null)
  const [months, setMonths] = useState<Month[]>([])
  const [workShopsData, setWorkShopsData] = useState<MonthData>()
  const [filter, setFilter] = useState('ALL')

  const fetchEvents = useCallback(async () => {
    if (!activeMonth || !filter) return
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP_PER_MONTH}?month=${activeMonth.monthNumber}&type=${filter}`
      )
      setWorkShopsData(data)
    } catch (error) {
      console.log('[fetchEvents]', error)
    }
  }, [filter, activeMonth])

  useEffect(() => {
    const currentMonthNumber = dayjs().month()
    const monthArray = [
      {
        key: '1',
        monthNumber: currentMonthNumber,
        label: dayjs().month(currentMonthNumber).format('MMMM'),
      },
      {
        key: '2',
        monthNumber: currentMonthNumber + 1,
        label: dayjs()
          .month(currentMonthNumber + 1)
          .format('MMMM'),
      },
      {
        key: '3',
        monthNumber: currentMonthNumber + 2,
        label: dayjs()
          .month(currentMonthNumber + 2)
          .format('MMMM'),
      },
    ]
    setMonths(monthArray)
    setActiveMonth(monthArray[0])
  }, [])

  useEffect(() => {
    if (months.length < 1) return
    fetchEvents()
  }, [fetchEvents, months])

  const handleChangeMonth = (month: Month) => {
    setActiveMonthTag(month.key)
    setActiveMonth(month)
    fetchEvents()
  }

  const filters = ['Todos', 'Eventos', 'Talleres']

  const handleChangeTag = (tag: string) => {
    console.log('tag', tag)
    switch (tag) {
      case 'Todos':
        setFilter('ALL')
        break

      case 'Eventos':
        setFilter('EVENT')
        break

      case 'Talleres':
        setFilter('WORKSHOP')
        break

      default:
        return
    }
    fetchEvents()
  }

  return (
    <div>
      <Head>
        <title>Talleres & Eventos</title>
      </Head>

      <Header />

      <div className={styles.content_container}>
        <div className={styles.events_options}>
          <SearchInput />
          <Filter filters={filters} callback={handleChangeTag} />
        </div>

        <div className={styles.tabs}>
          {months.map((month) => {
            return (
              <div
                key={month.key}
                className={`${styles.tab} ${
                  month.key === activeMonthTag ? styles.active : null
                }`}
                onClick={() => handleChangeMonth(month)}
              >
                <p>{month.label}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.events_container}>
          {workShopsData?.docs?.map((workshop) => (
            <EventCard key={workshop._id} event={workshop} />
          ))}

          {workShopsData?.docs.length === 0 && (
            <div>
              <Empty
                image={<VscFolderOpened color='#54C055' size={60} />}
                imageStyle={{ height: 60 }}
                description={
                  <span>
                    No hay{' '}
                    {filter === 'filter'
                      ? 'eventos o talleres'
                      : filter === 'EVENT'
                      ? 'eventos'
                      : 'talleres'}{' '}
                    para esta fecha
                  </span>
                }
              ></Empty>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
