import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
    headless: true
  }
});

client.on('qr', (qr) => {
  console.log('QR generado. Escanealo con WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot conectado y listo!');
});

client.on('message', (message) => {
  console.log(`Mensaje de ${message.from}: ${message.body}`);
  // Acá más adelante podemos enviar a n8n
});

client.initialize();
