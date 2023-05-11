import styles from './styles.module.css'
import Image from 'next/image'
import { ContactUsImage } from '../../../public/images/png'
import InputComponent from '@/components/Inputs'
import { Input } from 'antd'

const CardContactUs=() => {

  return (
    <div className={styles.container} >
      <section className={styles.image} >
        <Image src={ContactUsImage} alt={'Contact image'} />
      </section >
      <section className={styles.form} >
        <div className={styles.inputs} >
          <InputComponent placeholder={'Tu nombre'} className={styles.input_container} label={'Nombre completo'} />
          <InputComponent placeholder={'Ingresa tu correo'} className={styles.input_container} label={'Email'} />
          <InputComponent placeholder={'+57'} className={styles.input_container} label={'Numero de telefono'} />
          <Input.TextArea placeholder={'Escribe tu mensaje'} className={`${styles.input_container} ${styles.text_area}`}
                          style={{resize: 'none'}} />
          <button className={styles.button} >
            Enviar
          </button >
        </div >
      </section >
    </div >
  )
}

export default CardContactUs