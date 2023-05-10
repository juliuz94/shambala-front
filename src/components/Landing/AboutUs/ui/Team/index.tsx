import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import TeamCard from '@/components/TeamCard'
import styles from './styles.module.css'
import { Bill } from '../../../../../../public/images/png'

const Team=() => {
  return (
    <GlobalContainer >
      <section >
        <TitleSections title={strings.ladingPage.homeSectionsTitles.team} />
        <main className={styles.main} >
          <article className={styles.card_container} >
            <TeamCard image={Bill}
                      description={'El propósito de mi vida es cambiar el mundo. La lucha más importante que enfrenta la humanidad es la crisis climática y he decidido dedicar mi vida por completo a esto. '}
                      name={'Daniel Gutiérrez Patiño'} career={'Founder and CEO'} />
          </article >
          <article className={styles.card_container} >
            <TeamCard image={Bill}
                      description={'El propósito de mi vida es cambiar el mundo. La lucha más importante que enfrenta la humanidad es la crisis climática y he decidido dedicar mi vida por completo a esto. '}
                      name={'Daniel Gutiérrez Patiño'} career={'Founder and CEO'} />
          </article >
          <article className={styles.card_container} >
            <TeamCard image={Bill}
                      description={'El propósito de mi vida es cambiar el mundo. La lucha más importante que enfrenta la humanidad es la crisis climática y he decidido dedicar mi vida por completo a esto. '}
                      name={'Daniel Gutiérrez Patiño'} career={'Founder and CEO'} />
          </article >
          <article className={styles.card_container} >
            <TeamCard image={Bill}
                      description={'El propósito de mi vida es cambiar el mundo. La lucha más importante que enfrenta la humanidad es la crisis climática y he decidido dedicar mi vida por completo a esto. '}
                      name={'Daniel Gutiérrez Patiño'} career={'Founder and CEO'} />
          </article >
        </main >
      </section >
    </GlobalContainer >

  )
}

export default Team