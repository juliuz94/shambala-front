import styles from './styles.module.css'
import Image from 'next/image'
import { ContactUsImage } from '../../../public/images/png'

const CardContactUs=() => {
  return (
    <div className={styles.container} >
      <section className={styles.image} >
        <Image src={ContactUsImage} alt={'Contact image'} />
      </section >
      <section className={styles.form} >
        <div className={styles.input_container} >
          <p className={styles.label} >Nombre completo</p >
          <input className={styles.input} type='text' placeholder={'Tu nombre'} />
        </div >
        <div className={styles.input_container} >
          <p className={styles.label} >Email</p >
          <input className={styles.input} type='email' placeholder={'Ingresa tu correo'} />
        </div >
        <div className={styles.input_container} >
          <p className={styles.label} >Numero de telefono</p >
          <input className={styles.input} type='number' placeholder={'+57 '} />
        </div >
        <div className={styles.input_container} >
          <p className={styles.label} >Mensaje</p >
          <textarea className={styles.text_area} placeholder={'Escribe tu mensaje'} />
        </div >
        <button className={styles.button} >
          Enviar
        </button >
      </section >
    </div >
  )
}

export default CardContactUs