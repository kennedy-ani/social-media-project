import {Link} from "react-router-dom";
import{auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useState } from "react";

import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


export const Navbar = () =>{
    const [popUp , setPopUp] = useState(false);
    const [user] = useAuthState(auth); 

    // profile popUp 
    
    const closePopUp = () => setPopUp(false);
    const showPopUp = () => setPopUp(true);


    const logOut = async () =>{
        await signOut(auth);
    }   
    return <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid d-flex">
                        <div className="nav-brand">
                            <h1 className="text-light">Socialize</h1>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="navigationLink" to="/"><i className="fa-solid fa-house-chimney"></i></Link>
                                </li>
                            { !user ? (
                                <li className="nav-item">
                                    <Link className=" btn btn-light" to="/login">Login</Link>
                                </li>) : (
                                    <li className="nav-item">
                                        <Link className="navigationLink" to="/createpost"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </li>
                                )}

                                {!user ? 
                                <li className="nav-item d-none">
                                    <Link className="navigationLink" to="/findfriends"><i className="fa-solid fa-user-group"></i></Link>
                                </li>:
                                <li className="nav-item">
                                    <Link className="navigationLink" to="/findfriends"><i className="fa-solid fa-user-group"></i></Link>
                                </li>
                                }

                                {!user ? 
                                <li className="nav-item d-none">
                                    <Link to='/notifications' className="navigationLink"><i className="fa-solid fa-user-group"></i></Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link to='/notifications' className="navigationLink"><i className="fa-solid fa-bell"></i></Link>
                                </li>
                                }

                                {!user ? 
                                <li className="nav-item d-none">
                                    <Link to='/messaging' className="navigationLink"><i className="fa-solid fa-envelope"></i></Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link to='/messaging' className="navigationLink"><i className="fa-solid fa-envelope"></i></Link>
                                </li>
                                }
                            </ul>
                        </div>
                        <div className=" userAvatar">
                            {user && (
                                <div className="d-flex align-items-center">
                                    <div className="d-flex" onClick={showPopUp} style={{cursor: 'pointer'}}>
                                        <img src={user?.photoURL || ""} alt="" width="40" height="40" />&nbsp;&nbsp;
                                        <a href="#" className="text-decoration-none"><p>{user?.displayName}</p></a>
                                    </div>
                                    <button className="btn btn-transparent rounded" onClick={logOut}><i className="fa-solid fa-right-from-bracket"></i></button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>


                {/* Modal for Users Profile */}
                <Modal show={popUp} onHide={closePopUp}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="d-flex flex-column align-items-center">
                                <img src={user?.photoURL || ""} alt="" width="100" className="rounded-circle" />
                                <Link to={'#'}>Change Photo</Link>
                                <h2>{user?.displayName}</h2>    
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <div className="followers mx-5">
                                    <h5 className="text-center">{/* followers */}0</h5>
                                    <h3 style={{color: '#06BCC1'}}>Followers</h3>

                                </div>
                                <div className="following mx-5">
                                    <h5 className="text-center">{/* followers */}0</h5>
                                    <h3 style={{color: '#06BCC1'}}>Following</h3>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-center mt-5">My Posts</h2>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="primary" onClick={closePopUp}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>



            
}