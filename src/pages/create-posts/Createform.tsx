import {useForm} from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from 'firebase/firestore';
import {auth, database} from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
    title: string,
    description: string
};


export const CreateForm = () =>{

    const [user]  = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You need a title"),
        description: yup.string().required('You need to write a post')
    });

    const {register, handleSubmit, formState: {
        errors
    }} = useForm<CreateFormData>({
        resolver: yupResolver(schema),

    });

    // a reference variable to our post collection on firestore
    const postsRef = collection(database, 'posts');

    const onCreatePost = async (data : CreateFormData) => {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            userName: user?.displayName,
            userId: user?.uid
        })
        // console.log(data);
        navigate("/");
    }

    return <div onSubmit={handleSubmit(onCreatePost)}>
        <form >
            <input placeholder="Title..." {...register("title")}/>
            <p style={{color: 'red'}}>{errors.title?.message}</p>
            <textarea placeholder='Description...' {...register('description')}/>
            <p style={{color: 'red'}}>{errors.description?.message}</p>
            <input type="submit" />
        </form>
    </div>
}