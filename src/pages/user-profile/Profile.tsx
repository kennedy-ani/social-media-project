import { Link } from "react-router-dom"
import {AiOutlineArrowLeft} from 'react-icons/ai';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, database} from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Post{
    id: string,
    userId: string,
    title: string,
    description: string
}

const Profile = ()=> {
    const [user] = useAuthState(auth);

    // get user's post
    const [postsList, setPostList] = useState<Post[] | null>(null);
    const myPostsRef = collection(database, 'posts');

    const getMyPosts = async() => {
        const queryData = query(myPostsRef, where("userId", '==', user?.uid ))
        const data = await getDocs(queryData);
        setPostList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[])
        // if the userID of the post matches the username on the profile,
        console.log(postsList);
        
    }

    useEffect(()=>{
        getMyPosts();
    }, [])


    return <>
        <div className="my-20 mx-20">
            <Link to='/home' className="text-2xl font-bold text-blue"><AiOutlineArrowLeft/></Link>

            <div className="flex flex-col justify-center items-center my-10">
                <img className="w-24 rounded-full"
                 src={user?.photoURL || ''} alt="" />

                 <h1 className="font-bold text-2xl mt-5">{user?.displayName}</h1>
            </div>

            <div className="flex justify-around my-10">
                <div>
                    <h3 className="font-bold text-2xl">100</h3>
                    <h1 className="font-semibold text-blue">Followers</h1>
                </div>
                <div>
                <h3 className="font-bold text-2xl">50</h3>
                    <h1 className="font-semibold text-blue">Followings</h1>
                </div>
            </div>

            <div className="my-20">
                <h2 className="text-3xl font-bold ">My Posts</h2>
                <div>
                    {postsList?.map((post)=>(
                        <div className="bg-grey my-32 rounded-2xl max-w-lg mx-auto py-5">
                            <div className='title py-3 p-6'>
                                
                                <h1 className='font-bold text-2xl'>{post.title}</h1>
                            </div>
                            <div className='body py-3 px-16'>
                                
                                <p>{post.description}</p>
                            </div>
                            <div className="footer py-3">
                                
                                
                            </div> 
                        </div> 

                    ))}
                </div>
                
            </div>
        </div>
    </>
}

export default Profile;