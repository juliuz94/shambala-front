import { FC } from 'react'
import FirstView from '@/components/Landing/Enterprise/ui/FirstView'
import StrategicStakes from '@/components/Landing/Enterprise/ui/StrategicStakes'
import WhyBePart from '@/components/Landing/Enterprise/ui/WhyBePart'
import WhichInclude from '@/components/Landing/Enterprise/ui/WhichInclude'

const Enterprise: FC=() => {
  return (
    <>
      <FirstView />
      <StrategicStakes />
      <WhyBePart />
      <WhichInclude />
    </>
  )
}

export default Enterprise