import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';
import apiData from "./firebaseAPI.json";

// const config = {
//     apiKey: "AIzaSyDY_tcZRdaMceRBXUsS4dsywvy0fc9Jl78",
//     authDomain: "spam-classifier-b4a27.firebaseapp.com",
//     databaseURL: "https://spam-classifier-b4a27.firebaseio.com",
//     projectId: "spam-classifier-b4a27",
//     storageBucket: "spam-classifier-b4a27.appspot.com",
//     messagingSenderId: "674091040076",
//     appId: "1:674091040076:web:b1a36344ba0eb0a586a3e9"
// };

const config = apiData

class Firebase{
    constructor(){
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
    }

    async login(email,password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });
        return logout;
    }

    async register(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async getUserState(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    async createPost(post){

        const storageRef = await this.db.collection("Misclassification_Instances").add({
            "email":post.email,
            "sms": post.sms
        }).catch(err => {
            console.log(err);
            return err;
        });
        return storageRef;
    }
}

export default new Firebase();