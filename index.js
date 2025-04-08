const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
  const store = new MongoStore({ mongoose });

  const client = new Client({
    authStrategy: new RemoteAuth({
      store,
      backupSyncIntervalMs: 300000
    }),
    webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
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
});
