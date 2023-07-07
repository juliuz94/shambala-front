import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail
} from 'firebase/auth'
import { toast } from 'sonner'
import { Form, Input, Button, Spin, Modal } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface';
import styles from './styles.module.css'
import WaveBackgroundSVG from '@/svg/WaveBackground'
import { LoadingOutlined } from '@ant-design/icons'
import { useUserContext } from '@/context/userContext'

const LoginComponent: FC = () => {
  const { setUser, handleLogin } = useUserContext()
  const [loading, setLoading] = useState({
    isLoading: false,
    type: '',
  })
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const router = useRouter()
  const [form] = Form.useForm();

  type createAccountType = {
    name: string
    email: string
    password: string
  }

  const handleResetLoading = () => {
    setLoading({
      isLoading: false,
      type: '',
    })
  }

  const signInWithGoogle = async () => {
    setLoading({
      isLoading: true,
      type: 'google',
    })
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      handleLogin(result.user)
    } catch (error) {
      handleLoginError(error)
    }

    handleResetLoading()
  }

  const singInWithForm = async (data: any) => {
    setLoading({
      isLoading: true,
      type: 'email&password',
    })
    try {
      const hasOtherSignInMethod = await fetchSignInMethodsForEmail(
        auth,
        data.email
      )
      if (
        hasOtherSignInMethod.length > 0 &&
        !hasOtherSignInMethod.includes('password')
      ) {
        return handleUserUsedDifferentMethod(hasOtherSignInMethod)
      }

      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      setUser(result.user)
      router.push('/videos')
    } catch (error) {
      handleLoginError(error)
    }

    handleResetLoading()
  }

  const handleUserUsedDifferentMethod = (methods: string[]) => {
    toast.error(`Previmente iniciaste sesión con ${methods}`)
    handleResetLoading()
  }

  const handleLoginError = (error: any) => {
    const errorMessage = error?.message || null
    console.log(errorMessage)

    switch (errorMessage) {
      case 'Firebase: Error (auth/user-not-found).':
        toast.error('No existe un usuario con este correo')
        break

      case 'Firebase: Error (auth/wrong-password).':
        toast.error('La contraseña no es correcta')
        break

      case 'Firebase: Error (auth/email-already-in-use).':
        toast.error('Ya existe un usuario con este correo')
        break

      default:
        toast.error('Algió salió mal. Intenta nuevamente')
        break
    }
  }

  const handleCreateAccount = async (data: createAccountType) => {
    const { name, email, password } = data

    setLoading({
      isLoading: true,
      type: 'signUp',
    })

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser as any, { displayName: name })
      setUser(auth.currentUser)
      router.push('/community')
    } catch (error) {
      console.log(error)
      handleLoginError(error)
    }
  }


  const handleResetPassword = (values: {email: string}) => {
    console.log(values)
    try {
      sendPasswordResetEmail(auth, values.email)
      toast.message('Solicitud recibida', {
        description: 'Si tu email se encuentra en base de datos. Enviaremos un correo para que recuperes tu contraseña',
        duration: 7000
      })
      form.resetFields()
      setShowResetPassword(false)
    } catch (error: any) {
      handleLoginError(error)
      console.log(error.code)
      console.log(error.message)
    }
  }

  return (
    <div className={styles.login_page}>
      <WaveBackgroundSVG className={styles.background_image} />
      <div className={styles.login_content_container}>
        <Image
          width={200}
          height={65}
          src='/images/shambala_logo.png'
          alt='Shambala Logo'
        />

        <h1>Iniciar sesión</h1>
        <Form
          layout='vertical'
          className={styles.login_form}
          onFinish={singInWithForm}
        >
          <Form.Item
            name='email'
            label={<label>Correo electrónico</label>}
            className={styles.input_item}
            rules={[{ required: true, message: 'Olvidaste tu email!' }]}
          >
            <Input className={styles.login_input} size='large' />
          </Form.Item>
          <Form.Item
            name='password'
            label={<label>Contraseña</label>}
            className={styles.input_item}
            rules={[{ required: true, message: 'Olvidaste tu contraseña!' }]}
          >
            <Input.Password className={styles.login_input} size='large' />
          </Form.Item>

          <Form.Item className={styles.input_item}>
            <Button
              disabled={loading.isLoading}
              className={styles.login_button}
              size='large'
              type='primary'
              htmlType='submit'
            >
              {loading.isLoading && loading.type === 'email&password' ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                'Ingresar'
              )}
            </Button>
          </Form.Item>
        </Form>
        <Button
          disabled={loading.isLoading}
          className={`${styles.login_button}`}
          size='large'
          onClick={signInWithGoogle}
        >
          {loading.isLoading && loading.type === 'google' ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <>
              Ingresa con Google{' '}
              <Image
                src='/images/google_logo.png'
                alt='Google Login'
                width={15}
                height={15}
              />
            </>
          )}
        </Button>
        <div className={styles.other_options}>
          <p onClick={() => setShowResetPassword(true)}>
            ¿Olvidaste tu contraseña? <a>Haz click aquí</a>
          </p>
          <p>
            ¿No tienes cuenta?{' '}
            <a onClick={() => setShowCreateUser(true)}>
              Registrate para acceder
            </a>
          </p>
        </div>
        <Modal
          title='Registrate en Shambala'
          open={showCreateUser}
          onCancel={() => setShowCreateUser(false)}
          footer={false}
          width={400}
          centered
        >
          <Form
            layout='vertical'
            size='small'
            style={{ marginTop: '1.5rem' }}
            onFinish={handleCreateAccount}
          >
            <Form.Item
              name='name'
              label={<label>Nombre completo</label>}
              className={styles.input_item}
              rules={[{ required: true, message: 'Este campo es necesario' }]}
            >
              <Input className={styles.login_input} size='large' />
            </Form.Item>
            <Form.Item
              name='email'
              label={<label>Email</label>}
              className={styles.input_item}
              rules={[{ required: true, message: 'Este campo es necesario' }]}
            >
              <Input className={styles.login_input} size='large' />
            </Form.Item>
            <Form.Item
              name='password'
              label={<label>Contraseña</label>}
              className={styles.input_item}
              rules={[{ required: true, message: 'Olvidaste tu contraseña!' }]}
            >
              <Input.Password className={styles.login_input} size='large' />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={loading.isLoading}
                className={`${styles.login_button}`}
                type='primary'
                size='large'
                htmlType='submit'
              >
                {loading.isLoading && loading.type === 'signUp' ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  'Crear cuenta'
                )}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='Recuperar contraseña'
          open={showResetPassword}
          onCancel={() => setShowResetPassword(false)}
          footer={false}
          width={400}
          centered
        >
          <p>Ingresa tu correo para recuperar tu contraseña</p>
          <Form
            layout='vertical'
            size='small'
            style={{ marginTop: '1rem' }}
            form={form}
            onFinish={handleResetPassword}
          >
            <Form.Item
              name='email'
              label={<label>Email</label>}
              className={styles.input_item}
              rules={[{ required: true, message: 'Este campo es necesario' }]}
            >
              <Input className={styles.login_input} size='large' />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={loading.isLoading}
                className={`${styles.login_button}`}
                type='primary'
                size='large'
                htmlType='submit'
              >
                {loading.isLoading && loading.type === 'signUp' ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  'Recuperar contraseña'
                )}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default LoginComponent
