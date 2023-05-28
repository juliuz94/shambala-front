import CardWhyBePart from '@/components/CardWhyBePart'
import { strings } from '@/constants/strings'
import { Friends } from '../../../../../../public/images/png'
import styles from './styles.module.css'

const WhyBePart = () => {
  return (
    <div className={styles.container}>
      <CardWhyBePart
        title={'¿Por qué tu organización debería volverse parte de Shambala?'}
        image={Friends as any}
        data={strings.ladingPage.empresarial.whyBePart as any}
      />
    </div>
  )
}

export default WhyBePart