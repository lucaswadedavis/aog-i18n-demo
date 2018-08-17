const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const i18n = require('i18n');
const path = require('path');

const app = dialogflow({debug: true});

i18n.configure({
  'directory': path.join(__dirname, '/locales')
});

app.middleware((conv) => {
  i18n.setLocale(conv.user.locale);
});

app.intent('Default Welcome Intent', (conv) => {
  conv.close(i18n.__('hello'));
});

exports.yourAction = functions.https.onRequest(app);

