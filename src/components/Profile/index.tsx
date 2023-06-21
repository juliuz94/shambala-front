import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import VideoSlider from './VideoSlider'
import VideoRowSkeleton from '../Videos/ui/Skeleton'
import useFetchVideos from '@/Hooks/useFetchVideos'
import styles from './styles.module.css'

type VideoProgress = {
  user: string
  progress: number
  finished: boolean
}

type Video = {
  progress: VideoProgress
  _id: string
  title: string
  url: string
  image: string
  description: string
}

type Label = {
  createdAt: string
  updatedAt: string
  en: string
  es: string
  videos: Video[]
}

const Profile = () => {
  const router = useRouter()
  const { user } = useUserContext()

  const { videos, videosWithProgress, loadingData } = useFetchVideos()

  const renderProfileImage = () => {
    if (user?.image) {
      return <img src={user.image} className={styles.pfp} alt='profile' />
    } else {
      const initials = `${user?.firstName?.[0] || ''}${
        user?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  const countFinishedVideos = (videos: Video[]) => {
    let finishedCount = 0
    videos.forEach((video) => {
      if (video.progress.finished) {
        finishedCount += 1
      }
    })
    return finishedCount
  }

  const allVideos: Video[] = []
  videos.forEach((videoCategory: any) => {
    allVideos.push(...videoCategory.videos)
  })

  const uniqueVideosArray: Video[] = allVideos.filter(
    (video, index, self) =>
      index === self.findIndex((v) => v.title === video.title)
  )

  const newVideos = videos.map((videoCategory) => {
    return { ...videoCategory, videos: uniqueVideosArray }
  })

  return (
    <div className={styles.section}>
      <Head>
        <title>Perfil</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.profile}>
          <img
            src='/images/svg/arrow_back.svg'
            alt='back'
            onClick={() => router.back()}
            className={styles.back}
          />

          <div className={styles.cards}>
            <div className={styles.user}>
              {renderProfileImage()}

              <div className={styles.info}>
                <div className={styles.info_name}>
                  <h1>
                    {user?.firstName || ''} {user?.lastName || ''}
                  </h1>
                  <img src='/images/svg/dots_vertical.svg' alt='options' />
                </div>

                <p className={styles.email}>{user?.email || ''}</p>

                <div className={styles.tags}>
                  {user.tags.map((tag: any) => (
                    <p>{tag.es}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.projects}>
              <div className={styles.projects_container}>
                <div className={styles.projects_text}>
                  <h3>{countFinishedVideos(videosWithProgress)}</h3>
                  <p>
                    {countFinishedVideos(videosWithProgress) > 1
                      ? 'Videos'
                      : 'Video'}
                  </p>
                  <p>
                    {countFinishedVideos(videosWithProgress) > 1
                      ? 'Completados'
                      : 'Completado'}
                  </p>
                </div>

                <div className={styles.projects_text}>
                  <h3>0</h3>
                  <p>Eventos</p>
                </div>

                <div className={styles.projects_text}>
                  <h3>0</h3>
                  <p>Puntos</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.options}>
            <div className={styles.options_text}>
              <p>¿Quieres apoyar de alguna manera?</p>
              <p>Recomendaciones y oportunidades de mejora</p>
            </div>

            <div className={styles.options_text}>
              <button type='button'>Enviar</button>
              <button type='button'>Enviar</button>
            </div>
          </div>
        </div>

        {loadingData ? (
          <div style={{ marginTop: '2rem' }}>
            <VideoRowSkeleton />
            <VideoRowSkeleton />
          </div>
        ) : (
          <>
            {videosWithProgress.length > 0 && (
              <div className={styles.slider}>
                <VideoSlider title='En progreso' videos={videosWithProgress} />
              </div>
            )}

            {newVideos.length > 0 && (
              <div className={styles.slider}>
                <VideoSlider
                  key={'Recomendados'}
                  title={'Recomendados para ti'}
                  videos={uniqueVideosArray as any}
                />
              </div>
            )}
          </>
        )}

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />
      </div>
    </div>
  )
}

export default Profile
