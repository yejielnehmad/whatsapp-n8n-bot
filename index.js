const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
    headless: true
  }
});

client.on('qr', (qr) => {
  console.log('Escaneá este QR con tu WhatsApp para conectar:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('¡Bot de WhatsApp conectado!');
});

client.on('message', (message) => {
  console.log(`Mensaje de ${message.from}: ${message.body}`);
});

client.initialize();