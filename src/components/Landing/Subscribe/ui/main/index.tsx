import styles from './styles.module.css'

const Main = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.membership}>
          <div className={styles.title}>
            <h1>Suscribirse</h1>
            <hr />
          </div>

          <div className={styles.cards}>
            <div className={styles.form_container}>
              <div className={styles.form}>
                <p>Nombre completo</p>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Tu nombre'
                />

                <p>Email</p>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Ingresa tu correo'
                />

                <p>Seleccionar plan</p>
                <div className={styles.plan}>
                  <input
                    className={styles.checkbox}
                    type='checkbox'
                    id='scales'
                    name='scales'
                  />
                  <p>$80.000 COP / Mensuales</p>
                </div>

                <p>Pagar con</p>
                <button type='button' className={styles.new_button}>
                  Tarjeta de Crédito
                </button>

                <p>Número de la tarjeta</p>
                <input
                  className={styles.input}
                  type='number'
                  placeholder='0000 0000 0000 0000'
                />

                <p>Mes/Año</p>
                <input className={styles.input} type='text' placeholder='CVC' />

                <p>Nombre en la tarjeta</p>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Tu nombre'
                />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card_title}>
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
                    (10%) de los videos
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
              <button className={styles.card_button} type='button'>
                Pagar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        className={styles.bg}
        src='/images/svg/waves_subscribe.svg'
        alt='bg'
      />
    </div>
  )
}

export default Main
