import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const config = {
    "apiKey": process.env.REACT_APP_FIREBASE_APIKEY,
    "authDomain": process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    "databaseURL": process.env.REACT_APP_FIREBASE_DATABASEURL,
    "projectId": process.env.REACT_APP_FIREBASE_PROJECTID,
    "storageBucket": process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    "appId": process.env.REACT_APP_FIREBASE_APPID
}

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