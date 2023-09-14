import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import Events from './UI/Events'
import useFetchWorkshop from '@/Hooks/useFetchWorkshop'
import CreateAnnounModal from '../Modals/CreateAnnoun'
import UpdateCompany from '../Modals/UpdateCompany'
import CompanyVideoModal from '../Modals/CompanyVideoModal'
import { Button } from 'antd'
import CompanyBio from './UI/CompanyBio'
import Announcements from './UI/Announcements'
import useFetchAnnouncement from '@/Hooks/useFetchAnnouncement'
import useFetchCompanyStatistics from '@/Hooks/useFetchCompanyStatistics'
import styles from './styles.module.css'
import useFetchCompanyData from '@/Hooks/useFetchCompany'

const Company = () => {
  const router = useRouter()
  const companyId = router.query.id
  const { workshop } = useFetchWorkshop(companyId as string)
  const { announcement, setAnnouncement, setUpdateAnnoun }: any = useFetchAnnouncement()
  const { user } = useUserContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openUpdateCompany, setOpenUpdateCompany] = useState(false)
  const [openVideoModal, setOpenVideoModal] = useState(false)

  const { companyStatistics } = useFetchCompanyStatistics(companyId)
  const { companyData, setUpdateCompany } = useFetchCompanyData(companyId)

  return (
    <main className={styles.company_container}>
      <Head>
        <title>{user?.company.title || ''}</title>
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
                  <h3>{companyStatistics?.users?.length || 0}</h3>
                  <p>Usuario</p>
                </div>

                <div className={styles.stat}>
                  <h3>{companyStatistics?.courses?.length || 0}</h3>
                  <p>Cursos</p>
                </div>

                <div className={styles.stat}>
                  <h3>{companyStatistics?.events?.length || 0}</h3>
                  <p>Eventos</p>
                </div>
              </div>
            </div>
            {user?.company.owner === user?._id && (
              <div className={styles.organization_buttons}>
                <Button
                  type='primary'
                  size='large'
                  className={styles.comment_button}
                  onClick={() => setIsModalOpen(true)}
                >
                  Añadir anuncio
                </Button>
                <Button
                  type='primary'
                  size='large'
                  className={styles.comment_button}
                  onClick={() => setOpenUpdateCompany(true)}
                >
                  Actualizar info
                </Button>
              </div>
            )}
          </div>

          <CompanyBio 
            setIsModalOpen={setIsModalOpen} 
            companyData={companyData} 
            setOpenUpdateCompany={setOpenUpdateCompany}
            setOpenVideoModal={setOpenVideoModal}
          />

          <Announcements
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            setUpdateAnnoun={setUpdateAnnoun}
          />
        </div>

        <div className={styles.right_column}>
          <h1>Eventos para {user?.company.title || ''}</h1>

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
          setUpdateAnnoun={setUpdateAnnoun}
        />

        <UpdateCompany 
          open={openUpdateCompany}
          setOpen={setOpenUpdateCompany}
          companyData={companyData}
          setUpdateCompany={setUpdateCompany}
        />

        <CompanyVideoModal 
          open={openVideoModal}
          setOpen={setOpenVideoModal}
          videoUrl={companyData?.videoUrl}
        />
      </section>
    </main>
  )
}

export default Company
