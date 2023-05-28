import GlobalContainer from '@/components/GlobalContainer'
import TitleSections from '@/components/TitleSections'
import { strings } from '@/constants/strings'
import MembershipCard from '@/components/MembershipCard'
import Image from 'next/image'
import styles from './styles.module.css'
import { AppointmentCalendar } from '../../../../../../public/images/png'
import { Button, Form, Input } from 'antd'

const WhichInclude = () => {
  const [form] = Form.useForm()
  return (
    <GlobalContainer>
      <div className={styles.container}>
        <TitleSections
          title={strings.ladingPage.homeSectionsTitles.whichIncludes}
        />
        <div className={styles.card_container}>
          <MembershipCard
            btnTitle={'Comenzar ahora'}
            title={'Membresia Completa'}
            tag={'Recomendado'}
            subtitle={'$80.000 COP/ Mensuales'}
            data={strings.ladingPage.whichIncludes.membership.complete as any}
          />

          <div className={styles.appointment}>
            <Image
              className={styles.image}
              src={AppointmentCalendar}
              alt={'no image'}
            />
            <div className={styles.footer}>
              <article className={styles.title_card}>
                <h1>Agenda tu cita</h1>
                <div className={styles.divider} />
              </article>
              <Form layout={'vertical'} form={form}>
                <Form.Item
                  label={<label className={styles.label}>Nombre</label>}
                  name='email'
                  rules={[{ required: true, message: 'Ingresa tu nombre' }]}
                >
                  <Input
                    size={'large'}
                    placeholder={'Ingresa tu correo'}
                    className={styles.input}
                    type={'email'}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    size={'large'}
                    htmlType='submit'
                    className={styles.button}
                  >
                    <p>Agendar cita</p>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </GlobalContainer>
  )
}

export default WhichInclude