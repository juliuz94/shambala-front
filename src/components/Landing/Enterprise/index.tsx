import { FC } from 'react'
import FirstView from '@/components/Landing/Enterprise/ui/FirstView'
import StrategicStakes from '@/components/Landing/Enterprise/ui/StrategicStakes'
import WhyBePart from '@/components/Landing/Enterprise/ui/WhyBePart'
import WhichInclude from '@/components/Landing/Enterprise/ui/WhichInclude'
import Head from 'next/head'

const Enterprise: FC = () => {
  return (
    <>
      <Head>
        <title>Empresarial</title>
      </Head>

      <FirstView />
      <StrategicStakes />
      <WhyBePart />
      <WhichInclude />
    </>
  )
}

export default Enterprise
