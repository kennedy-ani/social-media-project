import {auth, database, provider} from '../config/firebase';
import { getAuth, signInWithPopup, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {Clients} from './Clients';
import {addDoc, collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link} from 'react-router-dom';
import { useEffect, forwardRef, useImperativeHandle} from 'react';
import SignUp from './SignUp';
import  Intro  from './intro-page/Intro';


interface ChildProps {
    signInWithGoogle: () => void
}

export const Login = ({signInWithGoogle}: ChildProps) => {
    
    return <div>  
        <div className="my-32 mx-10">
            <div>
                <h1 className="uppercase text-3xl font-black text-blue">Socialize</h1>
            </div>
            <div className="flex items-center justify-center">
                <a onClick={signInWithGoogle} href="#" className=" flex w-max px-5 py-2 my-10  rounded-xl bg-blue items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" width="30" alt="" />{"   "}
                    <p className="text-white ">Get in with Google</p>
                </a>
            </div>
            <div>
                <p className="font-bold text-xl">Create an account <span className="font-normal">to share your thoughts with others.</span></p>
            </div>
        </div>    
        {/* <div className="signWithGoogle mt-5">
            <button onClick={signInWithGoogle} className="goggle-btn text-bold btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" width="30" alt="" /> 
                {" "}Sign in with Google
            </button>
        </div> */}

        {/* sign in form */}
        {/* <form className='SignInForm'>
            <h1 className='text-light py-3'>Access Your Account</h1>
            <div className="mb-3">
                <input type="email" placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <input type="password" placeholder='Password' className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn signInbtn btn-light">Sign In</button>
            <p className='text-light mt-4'>Don't Have An Account?</p><Link to={'/signUp'}>Sign Up</Link>
        </form> */}

    </div>
}