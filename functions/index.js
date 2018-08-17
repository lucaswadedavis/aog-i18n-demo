const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const i18n = require('i18n');
const path = require('path');

const app = dialogflow({debug: true});

i18n.configure({
  'directory': path.join(__dirname, '/locales')
});

app.middleware((conv) => {
  console.log('x_middleware: ', conv.user.locale);
  i18n.setLocale(conv.user.locale);
});

app.intent('Default Welcome Intent', (conv) => {
  console.log('uh hmmm');
  console.log(conv.user.locale);
  console.log(i18n.__l('hello'));
  i18n.setLocale(conv.user.locale);
  console.log(i18n.getLocale());
  console.log(i18n.__('hello'));
  conv.close(i18n.__('hello'));
});

exports.yourAction = functions.https.onRequest(app);

