import '@zendeskgarden/css-bedrock'

import App from '../modules/app'

declare const ZAFClient: any

const client = ZAFClient.init()

client.on('app.registered', function (appData: any) {
  return new App(client, appData)
})
