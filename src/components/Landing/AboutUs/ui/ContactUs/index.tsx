import styles from './styles.module.css'

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.title}>
          <h1>Contáctanos</h1>
          <hr />
        </div>

        <div className={styles.card}>
          <img src='/images/png/ContactUsImage.png' alt='bird' />

          <div className={styles.form_container}>
            <div className={styles.form}>
              <p>Nombre completo</p>
              <input type='text' placeholder='Tu nombre' />

              <p>Email</p>
              <input type='text' placeholder='Ingresa tu correo' />

              <p>Número de teléfono</p>
              <input type='text' placeholder='+57' />

              <p>Mensaje</p>
              <textarea placeholder='Escríbenos...' />

              <button type='button'>Enviar</button>
            </div>
          </div>
        </div>
        <img className={styles.bg} src='/images/svg/contact_bg.svg' alt='bg' />
      </div>
    </div>
  )
}

export default ContactUs
