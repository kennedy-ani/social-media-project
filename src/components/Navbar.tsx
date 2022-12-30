import {Link} from "react-router-dom";
import{auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

export const Navbar = () =>{
    const [user] = useAuthState(auth); 

    const logOut = async () =>{
        await signOut(auth);
    }   
    return <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <div className="container-fluid d-flex">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="navigationLink" to="/">Home</Link>
                            </li>
                           { !user ? (
                            <li className="nav-item">
                                <Link className="navigationLink" to="/login">Login</Link>
                            </li>) : (
                                <li className="nav-item">
                                    <Link className="navigationLink" to="/createpost">Create Post</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className=" userAvatar">
                        {user && (
                            <div className="d-flex align-items-center">
                                <p>{user?.displayName}</p>
                                <img src={user?.photoURL || ""} alt="" width="40" height="40" />
                                <button onClick={logOut}>Log Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
}