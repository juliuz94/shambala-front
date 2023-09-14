export const generateVideoThumbnail = (file: File) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const video = document.createElement("video")

    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file)

    video.onloadeddata = () => {
      let ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth / 3
      canvas.height = video.videoHeight / 3

      ctx?.drawImage(video, 0, 0, video.videoWidth / 3, video.videoHeight / 3)
      video.pause();
      return resolve(canvas.toDataURL('image/jpeg'))
    }
  })
}