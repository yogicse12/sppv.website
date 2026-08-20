type EmailField = { label: string, value: string } | null

// Escapes text for safe inclusion in the HTML email body.
function escapeHtml (value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Builds matching plain-text and HTML bodies for a notification email from
// an ordered list of label/value fields, plus an optional free-text message
// block at the end. Keeps both formats in sync so the labels render bold in
// HTML-capable clients while the plain-text fallback stays readable.
export function renderEmailBody (fields: EmailField[], message?: string) {
  const activeFields = fields.filter((field): field is { label: string, value: string } => field !== null)

  const textLines = activeFields.map((field) => `${field.label}: ${field.value}`)

  const htmlRows = activeFields
    .map((field) => `<p style="margin: 0 0 8px;"><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(field.value)}</p>`)
    .join('')

  let textBody = textLines.join('\n')
  let htmlBody = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #0f172a;">${htmlRows}`

  if (message) {
    textBody += `\n\nMessage:\n${message}`
    htmlBody += `<p style="margin: 20px 0 0;"><strong>Message:</strong></p><p style="margin: 4px 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>`
  }

  htmlBody += '</div>'

  return { text: textBody, html: htmlBody }
}
