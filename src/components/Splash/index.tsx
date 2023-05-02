import { FC } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import WaveBackgroundSVG from '@/svg/WaveBackground'
import styles from './styles.module.css'

const Splash: FC = () => {
  return (
    <div className={styles.splash_page}>
      <WaveBackgroundSVG className={styles.background_image} />
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  )
}

export default Splash