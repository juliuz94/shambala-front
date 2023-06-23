import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'

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
