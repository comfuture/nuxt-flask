import path from 'path'
import  { spawn } from 'child_process'
import { createProxyMiddleware } from 'http-proxy-middleware'
import accepts from 'accepts'
import consola from 'consola'

export const meta = {
  name: 'nuxt-payload',
  version: '0.2.0'
}

export default function PayloadModule(moduleOptions) {
  const options = Object.assign({}, this.options.payload, moduleOptions)

  const {
    proxyRule = () => false,
    backendPort = 4000
  } = options

  /**
   * negotiates whether flask should process the request or not.
   * defaults to all requests that accept first to json will proxied to :4000
   * @param {*} req
   */
  const negotiate = (pathname, req)  => {
    /* eslint: operator-linebrak: 0 */
    return accepts(req).type(['html', 'json']) === 'json'
        || proxyRule(pathname, req)
  }

  // provide server middleware
  this.addServerMiddleware({
    path: '/',
    handler: createProxyMiddleware(negotiate, {
      target: `http://127.0.0.1:${backendPort}`
    })
  })

  // provide plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      backendPort
    }
  })

  let backend

  this.nuxt.hook('listen', async (server, {host, port}) => {
    backend = spawn('python', ['server.py'], {
      env: process.env,
      detached: true,
      stdio: [0, 'pipe', process.stderr]
    })
    backend.unref()
    backend.ref()
    consola.info('Backend process spawned')
    backend.stdout.on('data', buffer => consola.log(buffer.toString('utf8')))
  })

  this.nuxt.hook('close', async nuxt => {
    if (backend !== null) {
      consola.info('Backend process closed')
      backend.kill('SIGTERM')
    }
  })

  this.nuxt.hook('error', async error => {
    if (backend !== null) {
      consola.info('Backend process closed')
      backend.kill('SIGTERM')
    }
  })

  process.on('SIGINT', () => {
    if (backend !== null) {
      consola.info('Backend process closed')
      backend.kill('SIGTERM')  
    }
    process.exit()
  })
}
