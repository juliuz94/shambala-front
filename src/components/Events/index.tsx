import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Empty, Skeleton } from 'antd'
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
  nextPage: number | null
  page: number
  pagingCounter: number
  prevPage: boolean | null
  totalDocs: number
  totalPages: number
}

const Events = () => {
  const [loading, setLoading] = useState(false)
  const [activeMonthTag, setActiveMonthTag] = useState('1')
  const [activeMonth, setActiveMonth] = useState<Month | null>(null)
  const [months, setMonths] = useState<Month[]>([])
  const [workShopsData, setWorkShopsData] = useState<MonthData>()
  const [filter, setFilter] = useState('ALL')

  const fetchEvents = async (
    month: Month | null,
    category: string,
    search?: string
  ) => {
    if (!month || !filter) return
    try {
      setLoading(true)
      setActiveMonth(month)
      setFilter(category)

      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP_PER_MONTH}?month=${
          month.monthNumber
        }&type=${category}&search=${search || ''}`
      )
      setWorkShopsData(data)
    } catch (error) {
      console.log('[fetchEvents]', error)
    } finally {
      setLoading(false)
    }
  }

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
    fetchEvents(monthArray[0], filter)
  }, [])

  const handleChangeMonth = (month: Month) => {
    setActiveMonthTag(month.key)
    setActiveMonth(month)
    fetchEvents(month, filter)
  }

  const filters = [
    {
      tag: 'Todos',
      category: 'todos',
    },
    {
      tag: 'Eventos',
      category: 'eventos',
    },
    {
      tag: 'Talleres',
      category: 'talleres',
    },
  ]

  const handleChangeTag = (tag: string) => {
    switch (tag) {
      case 'todos':
        setFilter('ALL')
        fetchEvents(activeMonth, 'ALL')
        break

      case 'eventos':
        setFilter('EVENT')
        fetchEvents(activeMonth, 'EVENT')
        break

      case 'talleres':
        setFilter('WORKSHOP')
        fetchEvents(activeMonth, 'WORKSHOP')
        break

      default:
        return
    }
  }

  const handleOnSearch = (searchString: string) => {
    fetchEvents(activeMonth, filter, searchString)
  }

  const handleFetchUpdatedEvent = () => {
    fetchEvents(activeMonth, filter)
  }

  return (
    <div>
      <Head>
        <title>Talleres & Eventos</title>
      </Head>

      <div className={styles.content_container}>
        <div className={styles.events_options}>
          <SearchInput onSearch={handleOnSearch} />
          <Filter filters={filters} onFilterSelect={handleChangeTag} />
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
          {loading ? (
            <>
              <Skeleton />
              <br />
              <Skeleton />
            </>
          ) : (
            workShopsData?.docs?.map((workshop) => (
              <EventCard
                key={workshop._id}
                event={workshop}
                fetchEvents={handleFetchUpdatedEvent}
              />
            ))
          )}

          {!loading && workShopsData?.docs.length === 0 && (
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
