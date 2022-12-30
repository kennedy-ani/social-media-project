import {getDocs, collection} from 'firebase/firestore';
import {database} from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post';

export interface Post {
    id: string;
    userId : string;
    title: string;
    userName : string;
    description: string
}

export const Home = () => {

    const [postList, setPostList] = useState<Post[] | null>(null);
    const postsRef = collection(database, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(()=>{
        getPosts();
    }, []);
    
    return <div>
        {postList?.map((post)=>(
            <Post post={post}/>
        ))}
    </div>
};