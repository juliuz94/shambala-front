import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button, Dropdown, type MenuProps } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { VideoProfile, Video } from '@/types'
import { useUserContext } from '@/context/userContext'
import VideoSlider from './VideoSlider'
import VideoRowSkeleton from '../Videos/ui/Skeleton'
import useFetchVideos from '@/Hooks/useFetchVideos'
import EditProfileModal from '../Modals/EditProfile'
import useFetchUser from '@/Hooks/useFetchUser'
import useRenderProfileImage from '@/Hooks/useRenderProfileImage'
import styles from './styles.module.css'
import { axiosInstance } from '@/axios/axiosInstance'

type ProfileProps = {
  id: string
}

const Profile = ({ id }: ProfileProps) => {
  const router = useRouter()
  const { userGuest, fetchUser } = useFetchUser(id)
  const { user } = useUserContext()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [unfinishedVideos, setUnfinishedVideos] = useState<Video[]>([])
  const [finishedVideos, setFinishedVideos] = useState<Video[]>([])
  const [workshopsSignedUp, setWorkshopsSignedUp] = useState([])

  const { videos, videosWithProgress, loadingData, fetchVideosByTags } =
    useFetchVideos()

  const { renderProfileImage } = useRenderProfileImage(
    userGuest?.image,
    userGuest?.firstName,
    userGuest?.lastName,
    styles.pfp
  )

  const countFinishedVideos = (videos: VideoProfile[]) => {
    let finishedCount = 0
    videos.forEach((video) => {
      if (video.progress.finished) {
        finishedCount += 1
      }
    })
    return finishedCount
  }

  const fetchUserStats = async () => {
    try {
      const { data } = await axiosInstance.get('/users/statistics')
      setWorkshopsSignedUp(data[0].registeredWorkshops)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserStats()
    const finished = videosWithProgress.filter(
      (video: VideoProfile) => video.progress.finished
    )
    const unFinished = videosWithProgress.filter(
      (video: VideoProfile) => !video.progress.finished
    )

    setFinishedVideos(finished)
    setUnfinishedVideos(unFinished)
  }, [])

  const allVideos: VideoProfile[] = []
  videos.forEach((videoCategory: any) => {
    allVideos.push(...videoCategory.videos)
  })

  const uniqueVideosArray: VideoProfile[] = allVideos.filter(
    (video, index, self) =>
      index === self.findIndex((v) => v.title === video.title)
  )

  const newVideos = videos.map((videoCategory) => {
    return { ...videoCategory, videos: uniqueVideosArray }
  })

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className={styles.user_option}
          onClick={() => setOpenEditModal(true)}
        >
          Editar perfil
          <EditOutlined />
        </div>
      ),
    },
  ]

  const handleToggleBio = () => {
    setShowFullBio(!showFullBio)
  }

  const renderBio = () => {
    if (userGuest?.bio && userGuest.bio.length > 80 && !showFullBio) {
      return (
        <>
          <p>{userGuest.bio.slice(0, 160)}...</p>
          <button className={styles.show_button} onClick={handleToggleBio}>
            Mostrar más
          </button>
        </>
      )
    } else if (userGuest?.bio && userGuest.bio.length > 80 && showFullBio) {
      return (
        <>
          <p>{userGuest.bio}</p>
          <button className={styles.show_button} onClick={handleToggleBio}>
            Ocultar
          </button>
        </>
      )
    } else {
      return <p>{userGuest?.bio}</p>
    }
  }

  const handleFilterVideos = async () => {
    if (!userGuest) return
    const userTags = userGuest.tags
    const tagsString = userTags.reduce(
      (acc: string, cur: any, index: number) => {
        if (index === 0) {
          return `tags=${cur._id}`
        } else {
          return `${acc}&tags=${cur._id}`
        }
      },
      ''
    )

    const data = await fetchVideosByTags(tagsString)
    if (data) {
      const videos = data.docs.reduce((acc: any, cur: any) => {
        const tagVideos = cur.videos
        return [...acc, ...tagVideos]
      }, [])
      setFilteredVideos(videos)
    }

    // if (userGuest && userGuest.tags) {
    //   const filtered = allVideos.filter((video) =>
    //     video.tags.some((tag: any) => userGuest.tags.includes(tag))
    //   )
    //   setFilteredVideos(filtered)
    // }
  }

  useEffect(() => {
    handleFilterVideos()
  }, [userGuest])

  useEffect(() => {
    if (!id) return
    fetchUser()
  }, [id])

  return (
    <div className={styles.section}>
      <Head>
        <title>Shambala | Perfil</title>
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
                    {userGuest?.firstName || ''} {userGuest?.lastName || ''}
                  </h1>

                  {user?._id === id && (
                    <Dropdown menu={{ items }} placement='bottomRight'>
                      <Button
                        className={styles.user_options_button}
                        type='text'
                      >
                        <img
                          src='/images/svg/dots_vertical.svg'
                          alt='options'
                        />
                      </Button>
                    </Dropdown>
                  )}
                </div>

                <p className={styles.email}>{userGuest?.email || ''}</p>

                <div className={styles.tags}>
                  {userGuest?.tags &&
                    userGuest.tags.map((tag: any) => (
                      <p key={tag._id}>{tag.es}</p>
                    ))}
                </div>

                <p>{renderBio()}</p>
              </div>
            </div>

            {user?._id === id && (
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
                    <h3>{workshopsSignedUp?.length}</h3>
                    <p>Eventos</p>
                  </div>
                  {/* 
                  <div className={styles.projects_text}>
                    <h3>0</h3>
                    <p>Puntos</p>
                  </div> */}
                </div>
              </div>
            )}
          </div>

          {user?._id === id && (
            <div className={styles.options}>
              <div className={styles.options_text}>
                <p>¿Quieres apoyar de alguna manera?</p>
                <p>Recomendaciones y oportunidades de mejora</p>
              </div>

              <div className={styles.options_text}>
                <a
                  type='button'
                  href='https://x0ligg93mr8.typeform.com/to/CPluoViu'
                  target='_blank'
                >
                  Enviar
                </a>
                <a
                  type='button'
                  href='https://x0ligg93mr8.typeform.com/to/HgWGshEp'
                  target='_blank'
                >
                  Enviar
                </a>
              </div>
            </div>
          )}
        </div>

        {user?._id === id && (
          <>
            {loadingData ? (
              <div style={{ marginTop: '2rem' }}>
                <VideoRowSkeleton />
                <VideoRowSkeleton />
              </div>
            ) : (
              <>
                {unfinishedVideos.length > 0 &&
                  !unfinishedVideos.some(
                    (video) => video.progress.finished
                  ) && (
                    <div className={styles.slider}>
                      <VideoSlider
                        title='En progreso'
                        videos={unfinishedVideos}
                      />
                    </div>
                  )}

                {finishedVideos.length > 0 && (
                  <div className={styles.slider}>
                    <VideoSlider
                      title='Videos completados'
                      videos={finishedVideos}
                    />
                  </div>
                )}

                {newVideos.length > 0 && filteredVideos.length > 0 && (
                  <div className={styles.slider}>
                    <VideoSlider
                      key={'Recomendados'}
                      title={'Recomendados para ti'}
                      videos={filteredVideos}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}

        <img
          className={styles.bg}
          src='/images/svg/community_bg.svg'
          alt='bg'
        />

        <EditProfileModal
          isModalOpen={openEditModal}
          setIsModalOpen={setOpenEditModal}
          fetchUser={fetchUser}
        />
      </div>
    </div>
  )
}

export default Profile
