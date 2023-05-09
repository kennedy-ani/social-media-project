import {useRef} from 'react';
import { Login } from "../Login";
import {auth, database, provider} from '../../config/firebase';
import { getAuth, signInWithPopup, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Intro = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        // redirect
        navigate('/home');
    }

    return <div className="my-32 mx-10">
        <Login signInWithGoogle={signInWithGoogle}/>
        
    </div>
}

export default Intro; 