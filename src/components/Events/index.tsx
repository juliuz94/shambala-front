import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Filter from '@/components/PageFilter'
import SearchInput from '@/components/SearchInput'
import EventCard from './ui/EventCard'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/es'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Workshop } from '@/types'
import styles from './styles.module.css'

dayjs.locale(locale)

interface Month {
  key: string;
  monthNumber: number;
  label: string;
}

interface MonthData {
  docs: Workshop[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: boolean | null;
  totalDocs: number;
  totalPages: number;
}

const Events = () => {
  const [activeMonth, setActiveMonth] = useState('1')
  const [months, setMonths] = useState<Month[]>([])
  const [workShopsData, setWorkShopsData] = useState<MonthData>()
  const [filter, setFilter] = useState('ALL')

  const fetchEvents = async (month: number) => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.WORKSHOP_PER_MONTH}?month=${month}&type=${filter}`)
      console.log('res', data)
      setWorkShopsData(data)
    } catch (error) {
      console.log('[fetchEvents]', error)
    }
  }

  useEffect(() => {
    const currentMonthNumber = dayjs().month()
    const monthArray = [
      {
        key: '1',
        monthNumber: currentMonthNumber,
        label: dayjs().month(currentMonthNumber).format('MMMM')
      },
      {
        key: '2',
        monthNumber: currentMonthNumber + 1,
        label: dayjs().month(currentMonthNumber + 1).format('MMMM')
      },
      {
        key: '3',
        monthNumber: currentMonthNumber + 2,
        label: dayjs().month(currentMonthNumber + 2).format('MMMM')
      }
    ]
    setMonths(monthArray)
  }, [])

  useEffect(() => {
    if (months.length < 1) return
    console.log(months)
    fetchEvents(months[0].monthNumber)
  }, [months])

  const handleChangeMonth = (month: Month) => {
    console.log(month)
    setActiveMonth(month.key)
    fetchEvents(month.monthNumber)
  }

  const filters = ['Todos', 'Fauna', 'Ambiente', 'Sostenibilidad']

  return (
    <div>
      <Header />
      <div className={styles.content_container}>
        <div className={styles.events_options}>
          <SearchInput />
          <Filter filters={filters} />
        </div>

        <div className={styles.tabs}>
          {months.map((month) => {
            return (
              <div 
                key={month.key} 
                className={`${styles.tab} ${month.key === activeMonth ? styles.active : null}`} 
                onClick={() => handleChangeMonth(month)}
              >
                <p>{month.label}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.events_container}>
          {
            workShopsData?.docs?.map(workshop => (
              <EventCard key={workshop._id} event={workshop} />
            ))
          }
          {
            workShopsData?.docs.length === 0 && (
              <div>
                empty
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Events
