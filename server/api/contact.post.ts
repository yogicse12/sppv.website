export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const service = String(body?.service || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please fill in your name, email and message.'
    })
  }

  const config = useRuntimeConfig()
  const resend = useResend()

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    service ? `Interested in: ${service}` : null,
    '',
    'Message:',
    message
  ].filter((line) => line !== null).join('\n')

  const { error } = await resend.emails.send({
    from: config.emailFrom,
    to: config.emailTo,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: lines
  })

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'We could not send your message. Please try again shortly.'
    })
  }

  return { success: true }
})
