import {database, auth} from '../config/firebase';
import {addDoc, collection} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export const Clients = () => {
    const usersRef = collection(database, 'users');
    
    const addUserstoDB = async () => {
        // first we get the user's data 
        const auth = getAuth();
        const user = auth.currentUser;

        if(user !== null){
            const userName = user.displayName;
            const userId = user.uid;
            const photoUrl = user.photoURL;

            console.log(userId);
            // add them to the 
            await addDoc(usersRef, {
                userName: userName,
                userId: userId,
                photoUrl: photoUrl
            })
        }

    }

    useEffect(()=>{
        addUserstoDB();
    }, []);
    return <div></div>
}