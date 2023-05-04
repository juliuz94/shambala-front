import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import Header from '@/components/Header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Avatar, Button, Tabs } from 'antd'
import { HiOutlineArrowSmallLeft, HiOutlineClock, HiOutlineMapPin } from 'react-icons/hi2'
import { Inter, Montserrat } from 'next/font/google'
import { toast } from 'sonner'
import styles from './styles.module.css'

const inter = Inter({
  subsets: ['latin']
})

const tabs = [
  {
    key: '1',
    label: `Descripción`
  },
  {
    key: '2',
    label: `Agenda`
  }
]

const Event: FC = () => {
  const router = useRouter()
  const [tabSelected, setTabSelected] = useState('1')

  const renderTabContent = () => {
    switch (tabSelected) {
      case '1':
        return (
          <p className={styles.event_description}>
            El enfoque tradicional de corregir sólo la contaminación en el punto de producción resulta insuficiente y puede ocasionar un traslado de los efectos ambientales, de manera que las mejoras obtenidas en la fase de producción se traduce en otros efectos negativos en la fase de uso o de gestión del residuo, que suponen un impacto ambiental mayor que el evitado, si analizamos con una visión global todo el ciclo de vida del producto.
            <br />
            <br />
            Por ello, a día de hoy, la mayoría de las grandes empresas, de los ámbitos más diversos, han iniciado la mejora de sus productos analizándolos con la metodología del ACV que es la base del Ecodiseño, la Huella de Carbono, la Huella de Agua, la Huella Ambiental de Producto de la Unión Europea, las Declaraciones Ambientales de Producto y el Ecoetiquetado en general.
            <br />
            Con estas herramientas de comunicación, las empresas pueden demostrar a la sociedad su compromiso con la sostenibilidad.
            En este curso se tratarán los principios y fundamentos de la Economía Circular.
            <br />
            <br />
            A continuación se aprenderá la metodología del ACV y el manejo del software necesario para poder llevar a cabo este tipo de estudios, y posteriormente se estudiará su aplicación en el Ecodiseño, la Huella de Carbono, la Huella de Agua, la Huella Ambiental de Producto de la Unión Europea, las Declaraciones Ambientales de Producto y el Ecoetiquetado en general, materias que se desarrollarán con detalle.
          </p>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.event_container}>
      <Header />
      <div className={styles.event_header}>
        <div className={styles.event_info}>
          <Button type='ghost' className={styles.back_button} onClick={() => router.back()}>
            <HiOutlineArrowSmallLeft />
          </Button>
          <h1 className={styles.event_title}>
            FIMA Feria Internacional del Medio Ambiente
          </h1>
          <div className={styles.speakers}>
            <div className={styles.speaker}>
              <Avatar
                size='small'
                src='/images/person_image.jpg'
              />
              <p>
                Kai Olivares
              </p>
            </div>
          </div>
          <div className={styles.event_time}>
            <HiOutlineClock />
            <p>
              mar, 16 de marzo, 5:00 pm. - vie, 19 de marzo, 5:00 pm.
            </p>
          </div>
          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>
              Corferias Cra. 37 #24 - 67, Bogotá
            </p>
          </div>
          <div className={styles.sponsors}>
            <p>Presentado por:</p>
            <Image src='/images/shambala_logo.png' alt='sponsor_logo' width={80} height={25} />
          </div>
        </div>

        <div className={styles.event_image}>
          <Image
            src='/images/event_image_large.jpg'
            alt='Event image'
            fill

          />
        </div>
      </div>

      <div className={styles.event_info_container}>
        <div className={styles.left_column}>
          <div className={styles.tabs}>
            <Tabs defaultActiveKey="1" items={tabs} onChange={(tab) => setTabSelected(tab)} />
          </div>
          <div className={styles.tabs_content}>
            {renderTabContent()}
          </div>
        </div>

        <div className={styles.right_column}>
          <div className={styles.speaker_card}>
            <div className={styles.speaker_card_header}>
              <Avatar
                size='large'
                src='/images/person_image.jpg'
              />
              <p className={styles.speaker_name}>
                Kai Olivares
              </p>
            </div>
            <div className={styles.speaker_card_body}>
              <p className={styles.speaker_bio}>
                Modern Cubist abstract artist, NFT artist, Art educator & bridging the Contemporary with the Digital art realms
              </p>
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div className={styles.event_subscription}>
          <div className={styles.event_subscription_content}>
            <div className={styles.event_subscription_left_column}>
              <div className={styles.event_info_block}>
                <label className='event_info_label'>
                  Fecha
                </label>
                <p className='event_info_text'>
                  25 Mayo 2023
                </p>
              </div>
              <div className={styles.event_info_block}>
                <label className='event_info_label'>
                  Hora
                </label>
                <p className='event_info_text'>
                  5:30 PM
                </p>
              </div>
              <div className={styles.event_info_block}>
                <label className='event_info_label'>
                  Duración
                </label>
                <p className='event_info_text'>
                  60 minutos
                </p>
              </div>
            </div>

            <div className={styles.event_subscription_right_column}>
              <div className={styles.event_info_price}>
                <label className='event_info_label'>
                  Precio
                </label>
                <p className='event_info_text'>
                  GRATIS
                </p>
              </div>
              <button className='event_info_button' onClick={() => toast.success('Inscripción exitosa')}>
                <p>
                  Registrarme ahora
                </p>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx global>{`
        .event_info_label,
        .event_info_text,
        .event_info_button {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </div>
  )
}

export default Event