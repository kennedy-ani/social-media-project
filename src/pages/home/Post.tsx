import { collection, addDoc, query, where, doc ,deleteDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../config/firebase';
import {Post as IPost} from './Home';

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
    console.log(user);
    useEffect(()=>{
        getLikes();
    }, [])

    return <div>
        <div className='title'>
           <h1>{post.title}</h1>
        </div>
        <div className='body'>
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.userName}</p>
            <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
            {likes && <span>{likes?.length}</span>}
        </div> 
    </div>
}