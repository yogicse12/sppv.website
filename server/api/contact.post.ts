export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const firstName = String(body?.firstName || '').trim()
  const lastName = String(body?.lastName || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const message = String(body?.message || '').trim()

  if (!firstName || !lastName || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please fill in your first name, last name and email.'
    })
  }

  const name = `${firstName} ${lastName}`.trim()

  const config = useRuntimeConfig()
  const resend = useResend()

  const { text, html } = renderEmailBody([
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    phone ? { label: 'Phone', value: phone } : null
  ], message)

  const { error } = await resend.emails.send({
    from: config.emailFrom,
    to: config.emailTo,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text,
    html
  })

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'We could not send your message. Please try again shortly.'
    })
  }

  return { success: true }
})
