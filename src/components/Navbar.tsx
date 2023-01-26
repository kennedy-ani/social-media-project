import {Link} from "react-router-dom";
import{auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {getDocs, collection, where, doc, query} from 'firebase/firestore';
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

    // profile popUp 
    
    const closePopUp = () => setPopUp(false);
    const [myPosts , setMyPost] = useState<Posts[] | null>(null);
    const getUserInfo = async () => { //get alll user's post too...
        
        const postRef = collection(database, 'posts');
        const nowUser = auth.currentUser?.uid;

        const getUserquery = query(postRef, where('userId', "==" , nowUser));
        
        const result = await getDocs(getUserquery);
        setMyPost(result.docs.map((doc)=>(
            {
                ...doc.data(), id: doc.id
            }
        )) as Posts[]);
        // result.forEach((d)=>{
        //     console.log(d.id, "=>", d.data());
        // });
        setPopUp(true);
    };


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
                                    <div className="d-flex" onClick={getUserInfo} style={{cursor: 'pointer'}}>
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
                        <div className="p-3">
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
                                <div className=" my-5">
                                    {/* get post of this user */}
                                    {myPosts?.map((post)=>(
                                        < >
                                            <div className="d-flex flex-column align-items-center my-5">
                                                <h4 className="text-center">{post.title}</h4>
                                                <p className="text-center">{post.description}</p>
                                            </div>
                                        </>
                                    ))}
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