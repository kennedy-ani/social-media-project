import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Button} from 'react-bootstrap'
import { database, auth } from "../../config/firebase";
// import {FollowUser} from '../followUser';

export interface Users{
    id: string,
    userId: string,
    userName: string,
    photoUrl: string,
 
}

export const FindFriends = () =>{

    const [usersList, setUsersList] = useState<Users[] | null>(null);
    const usersRef = collection(database, 'users');
    
    const getUsers = async () => {
        const getUserList = await getDocs(usersRef)
        setUsersList(getUserList.docs.map((doc)=>({
            ...doc.data(), id:doc.id }))as Users[]);
    }

    useEffect(()=>{
        getUsers();
    }, [])
    return <div>
        <div className="container">
            <div className="friend row">
                {/* image, displayName will be inserted here */}
               {usersList?.map((users)=>(
                    
                    <div className="container">
                        <div className="row ">
                            {auth.currentUser?.uid === users.userId ?
                            
                            <div className="col-lg-6 d-none">
                                <div className="d-flex ">
                                    <img className="userImg" src={users.photoUrl} width="75"alt="" />
                                    <h4 className="user-name">{users.userName}</h4>
                                </div>
                                
                                <div className="d-flex ">
                                    <Button className="btn-talk-to-friend" disabled>
                                        Message 
                                    </Button>
                                    <Button className="btn-talk-to-friend" >
                                        Follow
                                    </Button>
                                </div>

                            </div>
                            :
                            <div className="col-lg-6 mt-5">
                                <div className="d-flex ">
                                    <img className="userImg" src={users.photoUrl} width="100"alt="" />
                                    <h4 className="user-name">{users.userName}</h4>
                                </div>
                                
                                <div className="d-flex ">
                                    <Button className="btn-talk-to-friend" disabled>
                                        Message 
                                    </Button>
                                    <Button className="btn-talk-to-friend" >
                                        Follow
                                    </Button>
                                </div>

                            </div>
                        } 
                        </div>
                    </div>
               ))}
            </div>
        </div>
    </div>
};