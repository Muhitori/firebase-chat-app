import { initializeApp, setLogLevel } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC8kBAQjpLWM4e2IkJrdCJ9vJ0Txqwdhu8',
  authDomain: 'smiss-education-project-2.firebaseapp.com',
  projectId: 'smiss-education-project-2',
  storageBucket: 'smiss-education-project-2.appspot.com',
  messagingSenderId: '460220185551',
  appId: '1:460220185551:web:bc0a8f0433c280cf9530ba',
  measurementId: 'G-SZWBZG7NE3',
  databaseURL: 'https://smiss-education-project-2-default-rtdb.europe-west1.firebasedatabase.app',
};

initializeApp(firebaseConfig);
setLogLevel('silent');
