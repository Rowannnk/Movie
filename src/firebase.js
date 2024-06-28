import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAC-CngTjY-tXjDXaSNkcAA89T2wQwwlGE",
  authDomain: "netflix-clone-d0ef5.firebaseapp.com",
  projectId: "netflix-clone-d0ef5",
  storageBucket: "netflix-clone-d0ef5.appspot.com",
  messagingSenderId: "135705329277",
  appId: "1:135705329277:web:e27417ee4979a3c71bbb14",
  measurementId: "G-CB6EQ8EQX9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    }
    catch (error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signup,logout};