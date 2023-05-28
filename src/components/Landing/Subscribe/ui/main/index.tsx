import styles from './styles.module.css'
import GlobalContainer from '@/components/GlobalContainer'
import MembershipCard from '@/components/MembershipCard'
import { strings } from '@/constants/strings'
import TitleSections from '@/components/TitleSections'
import { Button, Checkbox, Form, Input } from 'antd'

const Main = () => {
  const [form] = Form.useForm()

  return (
    <GlobalContainer>
      <main className={styles.main}>
        <section className={styles.section}>
          <TitleSections title={'Suscribirse'} />
          <Form layout={'vertical'} form={form}>
            <Form.Item
              label={<label className={styles.label}>Nombre completo</label>}
              name={'name'}
            >
              <Input placeholder={'Nombre completo'} className={styles.input} />
            </Form.Item>
            <Form.Item
              label={<label className={styles.label}>Email</label>}
              name={'email'}
            >
              <Input
                placeholder={'Email'}
                className={styles.input}
                type={'email'}
              />
            </Form.Item>
            <Form.Item
              label={<label className={styles.label}>Seleccionar plan</label>}
              name={'plan'}
            >
              <Checkbox>$80.000 COP / Mensuales</Checkbox>
            </Form.Item>
            <Form.Item
              label={<label className={styles.label}>Pagan con</label>}
              name={'pay'}
            >
              <Button type={'primary'}>Tarjeta de credito</Button>
            </Form.Item>
            <Form.Item
              label={<label className={styles.label}>Numero de tarjeta</label>}
              name={'card'}
            >
              <Input
                placeholder={'0000 0000 0000 0000'}
                className={styles.input}
                type={'number'}
              />
            </Form.Item>
            <Form.Item
              label={<label className={styles.label}>Codigo cvc</label>}
              name={'cvc'}
            >
              <Input
                placeholder={'CVC'}
                className={styles.input}
                type={'number'}
              />
            </Form.Item>
            <Form.Item
              label={
                <label className={styles.label}>Nombre en la tarjeta</label>
              }
              name={'nameCard'}
            >
              <Input
                placeholder={'Tu nombre'}
                className={styles.input}
                type={'text'}
              />
            </Form.Item>
          </Form>
        </section>
        <MembershipCard
          title={'Membresia completa'}
          tag={'PREMIUN'}
          data={strings.ladingPage.whichIncludes.membership.complete as any}
          btnTitle={'Pagar ahora'}
          pay
        />
      </main>
    </GlobalContainer>
  )
}

export default Main