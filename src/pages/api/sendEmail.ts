import mail from '@sendgrid/mail'
mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '')

export default async function sendMessage(req: any, res: any) {
  try {
    const { body } = req
    const { sentTo, templateId, dynamicData } = body

    await mail.send({
      to: sentTo,
      from: {
        email: 'no-reply@shambala.life',
        name: 'Shambala'
      },
      templateId: templateId,
      // subject: "Gracias por tu confianza",
      dynamicTemplateData: {
        ...dynamicData
      }
    })
    res.status(200).end()
  } catch (error) {
    console.error('sendMessage', error)
    console.log(JSON.stringify(error))
    res.status(500).end()
  }  
}

