import { okResponse, notOkResponse, notOk } from './lib/constants.js'
import { handleCORS } from './lib/checks.js'

export async function onRequest(context) {
  // handle POST/JSON/apikey chcecks
  const r = handleCORS(context.request)
  if (r) return r


  // get request args
  let url = new URL(context.request.url)
  const key = url.searchParams.get('key')
  if (!key) {
    return new Response(notOk, notOkResponse)
  }

  // write to object storage
  const r2obj = await context.env.VIDEO_BUCKET.put(key, context.request.body, {
    httpMetadata: {
      contentType: 'audio/ogg'
    }
  })

  return new Response(JSON.stringify(r2obj), okResponse)
}
