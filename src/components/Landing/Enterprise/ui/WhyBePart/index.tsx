import styles from './styles.module.css'

const WhyBePart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hacer_parte}>
        <div className={styles.title}>
          <h1>¿Por qué tu organización debería volverse parte de Shambala?</h1>
          <hr />
        </div>

        <div className={styles.content}>
          <img
            className={styles.plant}
            src='/images/png/friends.png'
            alt='plant_1'
          />

          <div className={styles.text_content_1}>
            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Alinear tu empresa a los objetivos de sostenibilidad y a los
                objetivos de desarrollo sostenible
              </p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Educación y conocimiento ambiental en todas las temáticas
                relevantes para tu empresa
              </p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>Teambulding y bienestar para tus empleados</p>
            </div>
          </div>

          <div className={styles.text_content_2}>
            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>Programa de bienestar para tus empleados</p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>Proyectar una marca sostenible para todos tus stakeholders</p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Conocer las nuevas tendencias en sostenibilidad y hacer parte de
                una comunidad de aprendizaje continuo
              </p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Marketing y branding por parte de la empresa y por parte de tus
                empleados
              </p>
            </div>
          </div>
        </div>

        <div className={styles.button_container}>
          <button type='button' className={styles.button}>
            Conoce qué experiencias tenemos pensadas para tu empresa
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhyBePart
