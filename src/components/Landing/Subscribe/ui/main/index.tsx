import styles from './styles.module.css'
import GlobalContainer from '@/components/GlobalContainer'
import MembershipCard from '@/components/MembershipCard'
import { strings } from '@/constants/strings'
import TitleSections from '@/components/TitleSections'
import InputComponent from '@/components/Inputs'
import { Button, Checkbox } from 'antd'

const Main=() => {
  return (
    <GlobalContainer >
      <main className={styles.main} >
        <section className={styles.section} >
          <TitleSections title={'Suscribirse'} />
          <InputComponent placeholder={'Nombre completo'} className={styles.container_input}
                          label={'Nombre completo'} />
          <InputComponent placeholder={'Correo electronico'} className={styles.container_input} label={'Email'}
                          type={'email'} />
          <article className={styles.selects} >
            <p > Seleccionar plan</p >
            <Checkbox >$80.000 COP / Mensuales</Checkbox >
          </article >
          <article className={styles.selects} >
            <p >Pagar con</p >
            <Button type={'primary'} >Tarjeta de credito</Button >
          </article >
          <InputComponent placeholder={'0000 0000 0000 0000'} className={styles.container_input}
                          label={'Numero de tarjeta'} type={'number'} />
          <InputComponent placeholder={'CVC'} label={'Codigo cvc'} className={styles.container_input_cvc}
                          type={'number'} />
          <InputComponent placeholder={'Tu nombre'} className={styles.container_input} label={'Nombre en la tarjeta'} />
        </section >
        <MembershipCard title={'Membresia completa'} tag={'PREMIUN'}
                        data={strings.ladingPage.whichIncludes.membership.complete as any} btnTitle={'Pagar ahora'}
                        pay />
      </main >
    </GlobalContainer >

  )
}

export default Main