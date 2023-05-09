import { FC } from 'react'
import FirstView from '@/components/Landing/Empresarial/ui/FirstView'
import StrategicStakes from '@/components/Landing/Empresarial/ui/StrategicStakes'
import WhyBePart from '@/components/Landing/Empresarial/ui/WhyBePart'
import WhichInclude from '@/components/Landing/Empresarial/ui/WhichInclude'

const Empresarial: FC=() => {
  return (
    <>
      <FirstView />
      <StrategicStakes />
      <WhyBePart />
      <WhichInclude />
    </>
  )
}

export default Empresarial