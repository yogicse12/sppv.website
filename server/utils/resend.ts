import { Resend } from 'resend'

let client: Resend | null = null

// Lazily instantiated, shared across requests within the same server
// process. Throws a clean 500 if RESEND_API_KEY hasn't been configured,
// instead of letting the Resend SDK throw its own opaque error.
export function useResend () {
  if (!client) {
    const config = useRuntimeConfig()

    if (!config.resendApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service is not configured.'
      })
    }

    client = new Resend(config.resendApiKey)
  }

  return client
}
