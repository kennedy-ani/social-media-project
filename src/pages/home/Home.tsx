import {getDocs, collection, addDoc, doc ,where, query, orderBy, limit, setDoc} from 'firebase/firestore';
import {database} from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post';
import { getAuth } from 'firebase/auth';
import { Clients } from '../Clients';
import { Navbar } from '../../components/Navbar';

export interface Post {
    id: string;
    userId : string;
    title: string;
    userName : string;
    description: string
}

const Home = () => {
    // get the user's info
    const usersRef = collection(database, 'users');

    const addUserstoDB = async () => {
        // first we get the user's data 
        const auth = getAuth();
        const user = auth.currentUser;

        
        if(user !== null){
            const userName = user.displayName;
            const userId = user.uid;
            const photoUrl = user.photoURL;
            
            
            // check if userId already exists in the database
            const checkUserquery = query(usersRef, where('userId', '==', user?.uid));
            
            if(checkUserquery){
                let querySnapshot = await getDocs(checkUserquery);
                // console.log(querySnapshot.docs)
                if(querySnapshot.docs.length === 0){
                    setDoc(doc(usersRef), {
                        userName: userName,
                        userId: userId,
                        photoUrl: photoUrl
                    });
                }else if(querySnapshot.docs.length > 0){
                    querySnapshot.forEach((doc)=>{
                        console.log(doc.id, "=>", doc.data());
                    })
                }   
            }
        }
    }

    const [postList, setPostList] = useState<Post[] | null>(null);
    const postsRef = collection(database, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(()=>{
        addUserstoDB();
        getPosts();
    }, []);
    
    return <div className=''>
        <Navbar/>
        {postList?.map((post)=>(
            <div>
                <Post post={post}/>
            </div>
        ))}
    </div>
};
export default Home