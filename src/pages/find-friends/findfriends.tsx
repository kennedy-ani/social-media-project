import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database, auth } from "../../config/firebase";

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
                                    <img className="userImg" src={users.photoUrl} width="100"alt="" />
                                    <h4 className="user-name">{users.userName}</h4>
                                </div>
                                
                                <div className="d-flex ">
                                    <button className="btn-talk-to-friend">Message</button>
                                    <button className="btn-talk-to-friend">Follow</button>
                                </div>

                            </div>
                            :
                            <div className="col-lg-6 mt-5">
                                <div className="d-flex ">
                                    <img className="userImg" src={users.photoUrl} width="100"alt="" />
                                    <h4 className="user-name">{users.userName}</h4>
                                </div>
                                
                                <div className="d-flex ">
                                    <button className="btn-talk-to-friend">Message</button>
                                    <button className="btn-talk-to-friend">Follow</button>
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