import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBIserrxC_Q-RxmidPsuBbqbuVuuMHFGPo",
    authDomain: "simple-counter-graph.firebaseapp.com",
    databaseURL: "https://simple-counter-graph.firebaseio.com",
    storageBucket: "simple-counter-graph.appspot.com",
    messagingSenderId: "316244650449"
};

const fire = firebase.initializeApp(config);
export default fire;