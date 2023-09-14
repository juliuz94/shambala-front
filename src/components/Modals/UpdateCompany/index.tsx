import { useState, useEffect } from 'react'
import { Modal, Form, Upload, Button, Input } from 'antd'
import { VideoCameraOutlined, DeleteOutlined } from '@ant-design/icons'
import { ref } from 'firebase/storage'
import { FirebaseStorage } from '@/firebase/firebaseApp'
import { uploadImage, uploadBase64 } from '@/helpers/uploadImage'
import dynamic from 'next/dynamic'
import { generateVideoThumbnail } from '@/helpers/getVideoFileThumbnail'
import { CompanyData } from '@/types'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import useFetchCompanyData from '@/Hooks/useFetchCompany'
import styles from './styles.module.css'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

type PropTypes = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  companyData: CompanyData,
  setUpdateCompany: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateCompany = ({ open, setOpen, companyData, setUpdateCompany }: PropTypes) => {
  const [videoToUpload, setVideoToUpload] = useState<any | null>(null)
  const [videoThumbnail, setVideoThumbnail] = useState<string | {}>('')
  const [removeVideo, setRemoveVideo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (companyData) {
      form?.setFieldValue('text', companyData.description)
    }
  }, [companyData])

  const { Dragger } = Upload

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
    setRemoveVideo(false)
  }


  const handleRemoveImage = () => {
    setVideoToUpload(null)
  }

  const handleUpdateCompanyInfo = async ({ text }: { text: string }) => {
    setLoading(true)
    try {
      let videoUrl = ''
      let videoThumbnailUrl = ''

      if (videoToUpload) {
        const storageRef = ref(FirebaseStorage, `company-videos/company_${companyData._id}/${videoToUpload.name}`)
        const url = await uploadImage(videoToUpload, storageRef, null)
        videoUrl = url
        const imageStorageRef = ref(FirebaseStorage, `company-video-thumbnails/company_${companyData._id}`)
        const imageUrl = await uploadBase64(videoThumbnail, imageStorageRef, null)
        videoThumbnailUrl = imageUrl
      }

      const res = await axiosInstance.patch(`${ROUTES.COMPANY}/${companyData._id}`, {
        videoUrl: (removeVideo && videoUrl === '') ? null : videoUrl !== '' ? videoUrl : companyData.videoUrl,
        videoThumbnail: (removeVideo && videoThumbnailUrl === '') ? '' : videoThumbnailUrl !== '' ? videoThumbnailUrl : companyData.videoThumbnail,
        description: text
      })
      setUpdateCompany(prevVal => !prevVal)

    } catch (error) {
      console.log('[handleUpdateCompanyInfo]', error)
    } finally {
      setLoading(false)
      setVideoToUpload(null)
      setVideoThumbnail('')
      handleCancel()
    }
  }

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: 'video/*',
    beforeUpload: async (file: any) => {
      setVideoToUpload(file)
      const thumbnailBase64 = await generateVideoThumbnail(file)
      if (thumbnailBase64) {
        setVideoThumbnail(thumbnailBase64)
      }
    },
  }

  return (
    <Modal
      title='Actualiza información'
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Form
        name='basic'
        autoComplete='off'
        onFinish={handleUpdateCompanyInfo}
        layout='vertical'
        className={styles.form}
        form={form}
      >
        <Form.Item
          name='text'
          rules={[{ required: false, message: 'Campo requerido' }]}
          label='Descripción'
        >
          <Input.TextArea
            rows={5}
          />
        </Form.Item>

        <div className={styles.image_upload}>
          <label>Video</label>

          {
            !removeVideo && companyData?.videoUrl && companyData?.videoThumbnail && (
              <div className={styles.loaded_video_container}>
                <img src={companyData.videoThumbnail} />
                <Button type='ghost' onClick={() => setRemoveVideo(true)}>
                  Reemplazar
                </Button>
              </div>
            )
          }

          {
            ((!videoToUpload && !companyData?.videoUrl) || (companyData?.videoUrl && removeVideo)) && (
              <Dragger {...props}>
                <VideoCameraOutlined />
                <p>Cargar video</p>
              </Dragger>
            )
          }

          {
            videoToUpload && (
              <div className={styles.thumbnail_container}>
                <button onClick={handleRemoveImage}>
                  <DeleteOutlined />
                </button>
                {videoThumbnail && (
                  <img src={videoThumbnail.toString()} alt={videoToUpload.name} />
                )}
              </div>
            )
          }

        </div>

        <div className={styles.footer}>
          <Button htmlType='submit' type='primary' loading={loading}>
            Actualizar
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdateCompany