import axios from 'axios'

export const sendPoints = async (type: string, data: any) => {
  try {
    const token = localStorage.getItem('sha_user_token')
    console.log({
      type,
      data
    })
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/points/assign_point`,
      { 
        type,
        ...data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('res ->', res)
  } catch (error) {
    console.log('error')
  }
}