import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";

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
                    <div className="d-flex mt-3 col-lg-6">
                        <img className="userImg" src={users.photoUrl} width="100"alt="" />
                        <h4 className="user-name">{users.userName}</h4>
                        <button className="btn-talk-to-friend">Talk to {users.userName}</button>
                    </div>
                    
               ))}
            </div>
        </div>
    </div>
};