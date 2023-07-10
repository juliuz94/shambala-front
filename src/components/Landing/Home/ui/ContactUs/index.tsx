import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Form, Input, Button } from 'antd'
import styles from './styles.module.css'

const ContactUs = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (values: any) => {
    try {
      setIsLoading(true)

      await axios.post('/api/sendEmail', {
        sentTo: [
          'shambalarevolucionhippieya@gmail.com',
          'daniel@shambala.life',
        ],
        templateId: 'd-103491b60dc648f2a612bfdac960feb7',
        dynamicData: {
          ...values,
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      toast.success('Tu mensaje ha sido enviado')
      form.resetFields()
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.title}>
          <h1>Contáctanos</h1>
          <hr />
        </div>

        <div className={styles.card}>
          <img src='/images/png/contactUsImage.png' alt='bird' />

          <div className={styles.form_container}>
            <div className={styles.form}>
              <Form
                layout='vertical'
                form={form}
                className={styles.contact_form}
                onFinish={handleSubmitForm}
              >
                <Form.Item
                  name='name'
                  label={<p>Nombre completo</p>}
                  className={styles.input_item}
                  rules={[
                    { required: true, message: 'Este campo es requerido' },
                  ]}
                >
                  <Input
                    className={styles.login_input}
                    size='large'
                    placeholder='Tu nombre'
                  />
                </Form.Item>
                {/* <input type='text' placeholder='Tu nombre' /> */}

                <Form.Item
                  name='email'
                  label={<p>Email</p>}
                  className={styles.input_item}
                  rules={[
                    { required: true, message: 'Este campo es requerido' },
                  ]}
                >
                  <Input
                    className={styles.login_input}
                    size='large'
                    placeholder='Ingresa tu correo'
                  />
                </Form.Item>
                {/* <input type='text' placeholder='Ingresa tu correo' /> */}

                <Form.Item
                  name='phone'
                  label={<p>Número de teléfono</p>}
                  className={styles.input_item}
                  rules={[
                    { required: true, message: 'Este campo es requerido' },
                  ]}
                >
                  <Input
                    className={styles.login_input}
                    size='large'
                    placeholder='Ingresa tu número'
                  />
                </Form.Item>
                {/* <input type='text' placeholder='Ingresa tu número' /> */}

                <Form.Item
                  name='message'
                  label={<p>Mensaje</p>}
                  className={styles.input_item}
                  rules={[
                    { required: true, message: 'Este campo es requerido' },
                  ]}
                >
                  <Input.TextArea
                    className={styles.login_input}
                    size='large'
                    placeholder='Deja tu mensaje...'
                  />
                </Form.Item>
                {/* <textarea placeholder='Escríbenos...' /> */}

                <Form.Item className={styles.input_item}>
                  <Button htmlType='submit' loading={isLoading}>
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <img className={styles.bg} src='/images/svg/contact_bg.svg' alt='bg' />
      </div>
    </div>
  )
}

export default ContactUs
