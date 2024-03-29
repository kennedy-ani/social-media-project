import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Button} from 'react-bootstrap'
import { database, auth } from "../../config/firebase";
import { Navbar } from "../../components/Navbar";
import {BsFillEnvelopeFill} from 'react-icons/bs'
// import {FollowUser} from '../followUser';

export interface Users{
    id: string,
    userId: string,
    userName: string,
    photoUrl: string,
 
}

export const FindFriends = () => {

    const [usersList, setUsersList] = useState<Users[] | null>(null);
    const usersRef = collection(database, 'users');
    const currentUser = auth.currentUser;
    
    const getUsers = async () => {
        const getUserList = await getDocs(usersRef)
        setUsersList(getUserList.docs.map((doc)=>({
            ...doc.data(), id:doc.id }))as Users[]);
    }

    // const fetchUsers = async () => {
    //     const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAaS-vmNfOzL4NvfNR_lqdjy1z3Kj_He7U`);
    //     const data = await response.json();
    //     // return data.users;
    //     setUsersList(data.users);
    // }

    // const filteringUsers = async () => {
    //     const users = await fetchUsers();
    //     const filteredUsers = users.filter((user:any) => user.email !== currentUser?.email);
    // }
    



    useEffect(()=>{
        getUsers();
    },[])
    


    
    return (

                <div className="">
                    <div className="">
                        <Navbar/>
                        <div className="mx-20 my-20">

                            <div className="grid md:grid-cols-3 sm:grid-cols-1">

                                {
                                    usersList?.map((user)=>(
                                        <div className="flex justify-around items-center my-10">
                                            <div className="flex items-center">
                                                <img className="rounded-full" src={user.photoUrl} width="100"alt="" />
                                            </div>
                                            
                                            <div className=" flex flex-col">
                                                <h4 className="font-bold text-2xl">{user.userName}</h4>
                                                <div className="flex justify-around items-center mt-5 ">
                                                    <Button className="text-blue text-3xl">
                                                        <BsFillEnvelopeFill/>
                                                    </Button>
                                                    <Button className=" bg-blue px-5 py-2 ml-5 font-bold text-white rounded-full">
                                                        Follow
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
    )};

    export default FindFriends;