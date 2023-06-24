import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import VideosHome from '../VideosHome'
import useFetchLandingVideos from '@/Hooks/useFetchLandingVideos'
import styles from './styles.module.css'

interface OpenedProps {
  title: string
}

const Opened = ({ title }: OpenedProps) => {
  const { landingVideos }: any = useFetchLandingVideos()

  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections title={title} />
        <section className={styles.videos_container}>
          {landingVideos &&
            landingVideos.map((video: any) => (
              <VideosHome
                key={video._id}
                video={{
                  _id: video._id,
                  image: video.image,
                  title: video.title,
                  description: video.description,
                  url: video.url,
                }}
              />
            ))}
        </section>
      </div>
    </GlobalContainer>
  )
}

export default Opened
