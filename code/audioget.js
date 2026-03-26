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
  
  // read from object storage
  const object = await context.env.VIDEO_BUCKET.get(key)
  if (object === null) {
    return new Response(notOk, missingResponse)
  }

  // if we get here, we have an object to send back
  return new Response(object.body, { headers: { 'Content-type': 'audio/ogg' }})
}
