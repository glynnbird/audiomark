import { okResponse, notOkResponse, missingResponse, notOk } from './lib/constants.js'
import { mustBePOST, mustBeJSON, apiKey, handleCORS } from './lib/checks.js'

export async function onRequest(context) {
  // handle POST/JSON/apikey chcecks
  const r =  handleCORS(context.request) || apiKey(context.request, context.env) || mustBePOST(context.request) || mustBeJSON(context.request)
  if (r) return r

  // parse the json
  const json = await context.request.json()

  // if there's a id
  if (json.id) {
    //const response = await get(context.env.TVKV, json.id)

    // send response
    return new Response(JSON.stringify({ ok: true }), okResponse)
  }

  // everyone else gets a 400 response
  return new Response(notOk, notOkResponse)

}
