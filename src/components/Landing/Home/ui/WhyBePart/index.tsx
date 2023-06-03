import styles from './styles.module.css'

const WhyBePart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hacer_parte}>
        <div className={styles.title}>
          <h1>¿Por qué hacer parte de esto?</h1>
          <hr />
        </div>

        <div className={styles.content}>
          <img
            className={styles.plant}
            src='/images/png/plant.png'
            alt='plant_1'
          />

          <div className={styles.text_content_1}>
            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>Contribuirás a empoderar al movimiento ambiental</p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>Aprenderás sobre la diversidad de las temáticas ambientales</p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Podrás aplicar tus conocimientos en hacer a tu organización un
                lugar mejor y en apoyar a comunidades vulnerables
              </p>
            </div>
          </div>

          <div className={styles.text_content_2}>
            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Crearás comunidades con personas que estén buscando hacer de
                este mundo un lugar mejor
              </p>
            </div>

            <div>
              <img src='/images/svg/CheckCircle.svg' alt='check' />
              <p>
                Te involucrarás en actividades experienciales que te harán más
                sensible y espiritualmente alineado con los retos que vive
                nuestra humanidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyBePart
