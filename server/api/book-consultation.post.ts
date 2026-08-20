export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const firstName = String(body?.firstName || '').trim()
  const lastName = String(body?.lastName || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const company = String(body?.company || '').trim()
  const service = String(body?.service || '').trim()
  const preferredDate = String(body?.preferredDate || '').trim()
  const preferredTime = String(body?.preferredTime || '').trim()
  const format = String(body?.format || '').trim()
  const message = String(body?.message || '').trim()
  const howHeard = String(body?.howHeard || '').trim()

  if (!firstName || !lastName || !email || !phone || !service || !preferredDate || !preferredTime) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete the required fields before submitting.'
    })
  }

  const config = useRuntimeConfig()
  const resend = useResend()

  const { text, html } = renderEmailBody([
    { label: 'Name', value: `${firstName} ${lastName}` },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone },
    company ? { label: 'Company', value: company } : null,
    { label: 'Service', value: service },
    { label: 'Preferred date', value: preferredDate },
    { label: 'Preferred time', value: preferredTime },
    format ? { label: 'Format', value: format } : null,
    howHeard ? { label: 'Heard about us via', value: howHeard } : null
  ], message)

  const { error } = await resend.emails.send({
    from: config.emailFrom,
    to: config.emailTo,
    replyTo: email,
    subject: `New consultation request from ${firstName} ${lastName}`,
    text,
    html
  })

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'We could not submit your request. Please try again shortly.'
    })
  }

  return { success: true }
})
