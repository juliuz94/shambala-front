import styles from './styles.module.css'

const WhichInclude = () => {
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.bg}
          src='/images/svg/waves_which_include.svg'
          alt='bg'
        />
        <div className={styles.membership}>
          <div className={styles.title}>
            <h1>¿Qué incluye la membresía?</h1>
            <hr />
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.card_title}>
                <div className={styles.card_price}>
                  <p>Recomendado</p>
                </div>
                <h3>Membresía Completa</h3>
                <h4>
                  $80.000 COP / <span>Mensuales</span>
                </h4>
                <hr className={styles.card_line} />
              </div>

              <div className={styles.card_content}>
                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>
                    Acceso a cantidad limitada de videos, talleres y eventos
                    (100%) de los videos
                  </p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Acceso completo al espacio de comunidad</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Apoyo a comunidades</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Creación propia de contenido en la plataforma</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Acompañamiento semi-personalizado en canales multicanal</p>
                </div>

                <div>
                  <img src='/images/svg/CheckCircle.svg' alt='check' />
                  <p>Eventos y talleres semi-personalizados</p>
                </div>

                <hr className={styles.card_line} />
              </div>
              <button className={styles.card_button}>Comenzar ahora</button>
            </div>

            <div className={styles.card_container}>
              <img
                className={styles.card_img}
                src='/images/png/appointmentCalendar.png'
                alt='img'
              />
              <div className={styles.card}>
                <div className={styles.card_title_2}>
                  <h2>Agenda tu Cita</h2>
                  <hr className={styles.card_line_2} />
                </div>

                <div className={styles.form}>
                  <p>Email</p>
                  <input type='text' placeholder='Ingresa tu correo' />

                  <button type='button'>Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhichInclude
