import { FC, useEffect, useState } from 'react'
import { Button } from 'antd'
import { HiPlay } from 'react-icons/hi2'
import { useUserContext } from '@/context/userContext'
import { CompanyData } from '@/types'
import styles from './styles.module.css'

type CompanyBioProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  companyData: CompanyData,
  setOpenUpdateCompany: React.Dispatch<React.SetStateAction<boolean>>
  setOpenVideoModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CompanyBio: FC<CompanyBioProps> = ({ setIsModalOpen, companyData, setOpenUpdateCompany, setOpenVideoModal }) => {
  const { user } = useUserContext()

  const parseText = (text: string) => {
    const splitText = text.split('\n')
    const textHTML = splitText.map((string: string, index: number) => <p key={index}>{string}</p>)
    return textHTML
  } 

  return (
    <div className={styles.company_bio_container}>
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
            onClick={() => setIsModalOpen(true)}
          >
            Actualizar info
          </Button>
        </div>
      )}

      {
        companyData?.videoUrl && (
          <div className={styles.thumbnail_container} onClick={() => setOpenVideoModal(true)}>
            <img src={companyData.videoThumbnail || '/images/card_image.jpg'} />
            <div className={styles.play_icon_container}>
              <HiPlay />
            </div>
          </div>
        )
      }
      {
        companyData?.description ? (
          <p>
            {parseText(companyData.description)}
          </p>
        ) : (
          <div className={styles.description_empty}>
            <p className={styles.floating_text}>Esto sólo lo ves tu</p>
            <p> Añade una descripción a tu organización</p>
            <Button type='primary' onClick={() => setOpenUpdateCompany(true)}>
              Añadir descripción
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default CompanyBio
