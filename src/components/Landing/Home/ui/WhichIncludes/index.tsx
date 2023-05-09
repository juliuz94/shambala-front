import styles from './styles.module.css'
import MembershipCard from '@/components/MembershipCard'
import { strings } from '@/constants/strings'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import GlobalContainer from '@/components/Landing/Home/ui/GlobalContainer'

const WhichIncludes=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.whichIncludes} />
        <section className={styles.memberships} >
          <MembershipCard
            title={'Gratuita'}
            tag={'Gratis'}
            data={strings.ladingPage.whichIncludes.membership.free as any}
          />
          <MembershipCard
            title={'Membresia Completa'}
            tag={'Recomendado'}
            subtitle={'$80.000 COP/ Mensuales'}
            data={strings.ladingPage.whichIncludes.membership.complete as any}
          />
        </section >
      </div >
    </GlobalContainer >

  )
}

export default WhichIncludes