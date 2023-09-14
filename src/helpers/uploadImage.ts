import { uploadBytesResumable, getDownloadURL, uploadString } from 'firebase/storage'

export const uploadImage = (
  file: any,
  ref: any,
  sendProgress: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(ref, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (sendProgress) {
          sendProgress(file.uid, progress)
        }
      },
      (error) => {
        console.log('error', error)
        reject(error)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadUrl)
      }
    )
  })
}

export const uploadBase64 = async (  
  base64File: any,
  ref: any,
  sendProgress: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const byteArray = Uint8Array.from(atob(base64File.split(',')[1]), c => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: 'image/jpeg' })

    const uploadTask = uploadBytesResumable(ref, blob)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (sendProgress) {
          sendProgress(base64File.uid, progress)
        }
      },
      (error) => {
        console.log('error', error)
        reject(error)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadUrl)
      }
    )
  })
}

