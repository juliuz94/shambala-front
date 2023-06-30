import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Dropdown, type MenuProps } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { VideoProfile } from '@/types'
import { useUserContext } from '@/context/userContext'
import VideoSlider from './VideoSlider'
import VideoRowSkeleton from '../Videos/ui/Skeleton'
import useFetchVideos from '@/Hooks/useFetchVideos'
import EditProfileModal from '../Modals/EditProfile'
import useFetchUser from '@/Hooks/useFetchUser'
import styles from './styles.module.css'

const Profile = ({ id }: any) => {
  const router = useRouter()
  const { userGuest } = useFetchUser(id)
  const { user } = useUserContext()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)

  const { videos, videosWithProgress, loadingData } = useFetchVideos()

  const renderProfileImage = () => {
    if (userGuest?.image) {
      return <img src={user.image} className={styles.pfp} alt='profile' />
    } else {
      const initials = `${userGuest?.firstName?.[0] || ''}${
        userGuest?.lastName?.[0] || ''
      }`
      return <div className={styles.pfp}>{initials}</div>
    }
  }

  const countFinishedVideos = (videos: VideoProfile[]) => {
    let finishedCount = 0
    videos.forEach((video) => {
      if (video.progress.finished) {
        finishedCount += 1
      }
    })
    return finishedCount
  }

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
                    userGuest.tags.map((tag: any) => <p key={tag}>{tag.es}</p>)}
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
                    <h3>0</h3>
                    <p>Eventos</p>
                  </div>

                  <div className={styles.projects_text}>
                    <h3>0</h3>
                    <p>Puntos</p>
                  </div>
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
                <button type='button'>Enviar</button>
                <button type='button'>Enviar</button>
              </div>
            </div>
          )}
        </div>

        {user._id === id && (
          <>
            {loadingData ? (
              <div style={{ marginTop: '2rem' }}>
                <VideoRowSkeleton />
                <VideoRowSkeleton />
              </div>
            ) : (
              <>
                {videosWithProgress.length > 0 && (
                  <div className={styles.slider}>
                    <VideoSlider
                      title='En progreso'
                      videos={videosWithProgress}
                    />
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
        />
      </div>
    </div>
  )
}

export default Profile
