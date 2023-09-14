import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { HiArrowLeft } from 'react-icons/hi2'
import VideoRow from '../Videos/ui/VideoRow'
import { data, eventsData } from './data'
import useFetchLearningPaths from '@/Hooks/useFetchLearningPaths'
import RouteEvent from './UI/RouteEvent'
import { LearningPath } from '@/types'
import styles from './styles.module.css'

const LeaningRoutes = () => {
  const router = useRouter()
  const { learningPaths } = useFetchLearningPaths()

  console.log('learningPaths', learningPaths)

  const handleGoBack = () => {
    router.back()
  }

  const handleGetRemainingDays = (startingDate: string, totalDays: number): number | null => {
    if (!totalDays) {
      return null
    }

    const today = dayjs()
    const finalDate = dayjs(startingDate).add(totalDays, 'days')
    const difference = today.diff(finalDate, 'days') * -1
    return difference
  }

  return (
    <section className={styles.section}>
      <Head>
        <title>Rutas de aprendizaje</title>
      </Head>
      <img
        className={styles.bg}
        src='/images/svg/community_bg.svg'
        alt='bg'
      />
      <div className={styles.container}>
        <div className={styles.page_title}>
          <Button
            size='small'
            type='ghost'
            className={styles.go_back_button}
            onClick={handleGoBack}
          >
            <HiArrowLeft /> regresar
          </Button>
          <h1>Mis rutas</h1>
        </div>
        {
          learningPaths.map((path: LearningPath) => {
            return (
              <>
                <VideoRow
                  key={path._id}
                  title={path?.route?.title}
                  videos={path?.route?.videos || []}
                  routeData={{
                    progress: Math.floor(path?.progress),
                    finishDate: handleGetRemainingDays(path?.startingDate, path?.days)
                  }}
                />
                {
                  path?.route?.workshops?.length > 0 && (
                    <div className={styles.workshops_container}>
                      {
                        path?.route?.workshops?.map((event) => (
                          <RouteEvent key={event._id} event={event} />
                        ))
                      }
                    </div>
                  )
                }
              </>
            )
          })
        }

      </div>
    </section>
  )
}

export default LeaningRoutes