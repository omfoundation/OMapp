// At the top of test/index.test.js
const test = require('firebase-functions-test')({
  databaseURL: 'https://omapp-2018.firebaseio.com',
  storageBucket: 'omapp-2018.appspot.com',
  projectId: 'omapp-2018',
}, '../../../private/omapp-gcp-8681f4ce021d.json');