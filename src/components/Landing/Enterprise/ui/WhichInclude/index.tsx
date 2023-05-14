import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import MembershipCard from '@/components/MembershipCard'
import Image from 'next/image'
import styles from './styles.module.css'
import { AppointmentCalendar } from '../../../../../../public/images/png'

const WhichInclude=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.whichIncludes} />
        <div className={styles.card_container} >
          <MembershipCard
            btnTitle={'Comenzar ahora'}
            title={'Membresia Completa'}
            tag={'Recomendado'}
            subtitle={'$80.000 COP/ Mensuales'}
            data={strings.ladingPage.whichIncludes.membership.complete as any}
          />
          <div className={styles.appointment} >
            <Image className={styles.image} src={AppointmentCalendar} alt={'no image'} />
            <div className={styles.footer} >
              <TitleSections title={'Agenda tu cita'} />
              <p className={styles.label} >Email</p >
              <input className={styles.input} type='email' placeholder={'Ingresa tu correo'} />
              <button className={styles.button} >Agendar cita</button >
            </div >
          </div >
        </div >
      </div >
    </GlobalContainer >

  )
}

export default WhichInclude