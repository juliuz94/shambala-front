import { FC, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Events from './UI/Events'
import useFetchWorkshop from '@/Hooks/useFetchWorkshop'
import CreateAnnounModal from '../Modals/CreateAnnoun'
import { Button } from 'antd'
import CompanyBio from './UI/CompanyBio'
import Announcements from './UI/Announcements'
import styles from './styles.module.css'

const Company: FC = () => {
  const router = useRouter()
  const workshopId = router.query.id
  const { workshop } = useFetchWorkshop(workshopId as string)
  const { user } = useUserContext()

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className={styles.company_container}>
      <Head>
        <title>{user?.community.title || ''}</title>
      </Head>

      <section className={styles.company_content_container}>
        <div className={styles.left_column}>
          <div className={styles.left_column_top}>
            <div className={styles.left_column_header}>
              <div className={styles.logo_container}>
                {user?.company.image ? (
                  <img src={user?.company.image} alt='logo' />
                ) : (
                  ''
                )}
              </div>

              <div className={styles.company_stats}>
                <div className={styles.stat}>
                  <h3>0</h3>
                  <p>Usuario</p>
                </div>

                <div className={styles.stat}>
                  <h3>0</h3>
                  <p>Cursos</p>
                </div>

                <div className={styles.stat}>
                  <h3>0</h3>
                  <p>Eventos</p>
                </div>
              </div>
            </div>

            {user?.company.owner === user?._id ? (
              <Button
                type='primary'
                size='large'
                className={styles.comment_button}
                onClick={() => setIsModalOpen(true)}
              >
                Añadir anuncio
              </Button>
            ) : (
              ''
            )}
          </div>

          <CompanyBio setIsModalOpen={setIsModalOpen} />
          <Announcements />
        </div>

        <div className={styles.right_column}>
          <h1>Eventos para {user?.community.title || ''}</h1>

          <div className={styles.events_container}>
            {workshop &&
              workshop.docs &&
              workshop.docs.map((work, index) => (
                <Events key={index} work={work} />
              ))}
          </div>
        </div>

        <CreateAnnounModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </section>
    </main>
  )
}

export default Company
