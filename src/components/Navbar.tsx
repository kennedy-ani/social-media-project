import {Link} from "react-router-dom";
import{auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {getDocs, collection, where, doc, query} from 'firebase/firestore';
import {AiFillHome} from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs';
import {ImExit} from 'react-icons/im';
import {FaUserFriends} from 'react-icons/fa';
import {GoThreeBars} from 'react-icons/go';
import {ImSwitch} from 'react-icons/im';
import { useNavigate } from "react-router-dom";
import {database} from '../../src/config/firebase';
import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


export interface Posts {
    id: string,
    title: string,
    description: string
}


export const Navbar = () =>{
    const [popUp , setPopUp] = useState(false);
    const [user] = useAuthState(auth); 
    const [isOpen, setIsOpen] = useState(false);
    // profile popUp 
    
    const closePopUp = () => setPopUp(false);
    const [myPosts , setMyPost] = useState<Posts[] | null>(null);
     
    const showMenu = () => {
        setIsOpen(!isOpen);
    }

    const navigation = useNavigate();

    const logOut = async () =>{
        await signOut(auth);
        navigation('/');
    }   

    
    return <div>
                <nav className="bg-blue py-3">
                    <div className="flex justify-around items-center">
                        <div className="">
                        <Link to="/home"><h1 className="text-white font-bold text-3xl">Socialize</h1></Link>
                            
                        </div>
                        
                        <div className="" id="">
                            <ul className="hidden md:grid grid-cols-3  gap-3">
                                <li className="mx-3">
                                    <Link className="text-2xl text-white" to="/"><AiFillHome/></Link>
                                </li>
                            { !user ? (
                                <li className="">
                                    <Link className="text-2xl text-white" to="/login">Login</Link>
                                </li>) : (
                                    <li className="mx-3">
                                        <Link className="text-2xl text-white" to="/createpost"><BsPencilSquare/></Link>
                                    </li>
                                )}

                                {!user ? 
                                <li className="hidden mx-3">
                                    <Link className="text-2xl text-white" to="/findfriends"><FaUserFriends/></Link>
                                </li>:
                                <li className="mx-3">
                                    <Link className="text-2xl text-white" to="/findfriends"><FaUserFriends/></Link>
                                </li>
                                }

                                
                            </ul>
                        </div>

                        
                        <div className="">
                            {user && (
                                <div className="flex justify-around items-center w-52">
                                    <div className="md:flex hidden items-center">
                                        <img className="rounded-full " src={user?.photoURL || ""} alt="" width="40" height="40" />&nbsp;&nbsp;
                                        <a href="#" className="text-white"><p>{user?.displayName}</p></a>
                                    </div>
                                    <button className="hidden md:flex text-white" onClick={logOut}><ImExit/></button>
                                </div>
                            )}
                        </div>
                        <div className="md:hidden flex items-center">
                            <img className="rounded-full mr-7" src={user?.photoURL || ""} alt="" width="40" height="40" />
                            <div onClick={showMenu} className="text-xl text-white">
                                <GoThreeBars/>
                            </div>

                        </div>
                    </div>
                </nav>
                {/* navbar responsive */}
                <div id="navBar" className={isOpen ? "bg-blue sm:flex flex-col visible" : 'hidden'}>
                    <ul>
                        <li className="mx-3 py-3 font-semibold text-white">
                            <Link className="text-lg" to="/home">Home</Link>
                        </li>
                        { user && (
                            <li className="mx-3 py-3 font-semibold text-white">
                                <Link className="text-lg" to="/createpost">Create Post</Link>
                            </li>
                        )}

                        {user && 
                        <li className="mx-3 py-3 font-semibold text-white">
                            <Link className="text-lg" to="/findfriends">Find Friends</Link>
                        </li>
                        }                
                        <li className="mx-3 py-3 font-semibold text-white">
                            <button className="text-lg bg-white text-red p-2 rounded-full" onClick={logOut}><ImSwitch/></button>
                        </li>

                    </ul>
                </div>
                
            </div>



            
}