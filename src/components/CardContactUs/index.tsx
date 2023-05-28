import styles from './styles.module.css'
import Image from 'next/image'
import { ContactUsImage } from '../../../public/images/png'
import { Button, Form, Input } from 'antd'

interface IFormItems {
  label: string
  name: string
  placeholder: string
  type: string
}

const CardContactUs = () => {
  const [form] = Form.useForm()

  function FormItem(props: IFormItems) {
    return (
      <Form.Item
        label={<label className={styles.label}>{props.label}</label>}
        name={props.name}
        className={styles.input_container}
      >
        <Input
          className={styles.inputs}
          size='large'
          placeholder={props.placeholder}
          type={props.type}
        />
      </Form.Item>
    )
  }

  return (
    <div className={styles.container}>
      <section className={styles.image}>
        <Image src={ContactUsImage} alt={'Contact image'} />
      </section>
      <Form
        className={styles.form}
        form={form}
        layout='vertical'
        name='contac_us'
      >
        <FormItem
          label='Nombre completo'
          name='name'
          placeholder='Tu nombre'
          type='text'
        />
        <FormItem
          label='Email'
          name='email'
          placeholder='Ingresa tu correo'
          type='email'
        />
        <FormItem
          label='Numero de telefono'
          name='phone'
          placeholder='+57'
          type='number'
        />
        <Form.Item
          label={<label className={styles.label}>Escribe tu mensaje</label>}
          name='message'
          className={styles.input_container}
        >
          <Input.TextArea
            size='large'
            placeholder='message'
            className={styles.text_area}
          />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button htmlType='submit' className={styles.button} type='ghost'>
            <p>Enviar</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CardContactUs
