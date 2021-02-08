import { createProxyMiddleware } from 'http-proxy-middleware'
import accepts from 'accepts'

/**
 * negotiates whether flask should process the request or not.
 * defaults to all requests that accept first to json will proxied to :4000
 * @param {*} req
 */
function negotiate(pathname, req) {
  /* eslint: operator-linebrak: 0 */
  return accepts(req).type(['html', 'json']) === 'json'
}

export default createProxyMiddleware(negotiate, {
  target: 'http://127.0.0.1:4000'
})
