import { Inter } from 'next/font/google'
import styles from './styles.module.css'

const inter = Inter({
  subsets: ['latin'],
})

const CardContactUs = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.card}>
        <img src='/images/png/ContactUsImage.png' alt='bird' />

        <div className={styles.form_container}>
          <div className={styles.form}>
            <p className='text'>Nombre completo</p>
            <input type='text' placeholder='Tu nombre' />

            <p className='text'>Email</p>
            <input type='text' placeholder='Ingresa tu correo' />

            <p className='text'>Número de teléfono</p>
            <input type='number' placeholder='Ingresa tu número' />

            <p className='text'>Mensaje</p>
            <textarea placeholder='Escríbenos...' />

            <button className='text' type='button'>
              Enviar
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </div>
  )
}

export default CardContactUs
