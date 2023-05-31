export const downloadFile = async (url: string, fileName: string, onStart: () => void, onFinish: () => void) => {
  try {
    onStart()
    const response = await fetch(url)
    const blob = await response.blob()
    const blobURL = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = blobURL
    a.style = "display: none";

    a.download = fileName;
    document.body.appendChild(a)
    a.click()
    onFinish()

  } catch (error) {
    onFinish()
    throw new Error 
  }
}
