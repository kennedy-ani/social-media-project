import { collection, addDoc, query, where, doc ,deleteDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../config/firebase';
import {Post as IPost} from './Home';
import {FcLike, FcLikePlaceholder} from 'react-icons/fc';

interface Props{
    post: IPost
}

interface Like {
    likeId: string;
    userId: string
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);

    // likes functionality
    const likesRef = collection(database, 'likes');
    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesDoc = query(likesRef, where("postId", "==" , post.id));
    const addLike = async () => {
        
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post?.id, 
            });
     
            if(user){ //automatically updates the like when its been clicked on
                 setLikes(
                     (prev)=> prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]
                );
            }
        }catch(error){
            console.log(error);
        }
        
    }

    const removeLike = async () => {
        try{
            
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
                );
                const liketoDeleteData = await getDocs(likeToDeleteQuery);    
                const likeId = liketoDeleteData.docs[0].id;
                const likeToDelete = doc(database, "likes", likeId);
            await deleteDoc(likeToDelete);
            
     
            if(user){ //automatically updates the like when its been clicked on
                 setLikes((prev)=> prev && prev.filter((like)=>like.likeId !== likeId, ));
            }
        }catch(error){
            console.log(error);
        } 
        
    }

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        
        if(user){
            setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})));
        }
    }

    // a boolean to check if user has liked a post in the list of post
    const hasUserLiked = likes?.find((like)=>like.userId === user?.uid);
    // console.log(user);
    useEffect(()=>{
        getLikes();
    }, [])

    return <div className='container'>
        <div className="bg-grey my-32 rounded-2xl mx-20 py-5">
            <div className='title py-3 p-6'>
                <h1 className='font-bold text-2xl'>{post.title}</h1>
            </div>
            <div className='body py-3 px-16'>
                <p>{post.description}</p>
            </div>
            <div className="footer py-3">
                <p className='font-bold pb-3'>@{post.userName}</p>
                <div className=' flex justify-center items-center '>
                    <div className='items-center'>
                        <button className='text-xl' onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <><FcLike /></> : <><FcLikePlaceholder/></>}</button>
                        {likes && <span className='ml-5'>{likes?.length}</span>}
                    </div>

                </div>
            </div> 
        </div>
    </div>
}