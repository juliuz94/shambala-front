import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import styles from './styles.module.css'
import VideoCard from '@/components/VideoCard'
import { strings } from '@/constants/strings'

const Opened=() => {
  return (
    <div className={styles.container} >
      <TitleSections title={strings.ladingPage.homeSectionsTitles.opened} />
      <section className={styles.videos_container} >
        <VideoCard video={
          {
            _id: '1',
            image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'video 1',
            description: 'este video es el mejor video de prueba que va a existir'
          }
        } />
        <VideoCard video={
          {
            _id: '2',
            image: 'https://images.unsplash.com/photo-1683481951374-1d62b42afaba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
            title: 'video 1',
            description: 'este video es el mejor video de prueba que va a existir'
          }
        } />
        <VideoCard video={
          {
            _id: '3',
            image: 'https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
            title: 'video 1',
            description: 'este video es el mejor video de prueba que va a existir'
          }
        } />
        <VideoCard video={
          {
            _id: '4',
            image: 'https://plus.unsplash.com/premium_photo-1675448891094-0f3acc556fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3271&q=80',
            title: 'video 1',
            description: 'este video es el mejor video de prueba que va a existir'
          }
        } />
        <VideoCard video={
          {
            _id: '5',
            image: 'https://images.unsplash.com/photo-1683350919521-b1f8e0733ef6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2750&q=80',
            title: 'video 1',
            description: 'este video es el mejor video de prueba que va a existir'
          }
        } /> <VideoCard video={
        {
          _id: '6',
          image: 'https://plus.unsplash.com/premium_photo-1669731124128-b4ff5cc94881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
          title: 'video 1',
          description: 'este video es el mejor video de prueba que va a existir'
        }
      } />

      </section >
    </div >
  )
}

export default Opened