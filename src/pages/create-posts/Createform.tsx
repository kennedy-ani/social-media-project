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

    return <div onSubmit={handleSubmit(onCreatePost)} className="mt-24 ">
        <h1 className='font-bold text-center text-2xl my-10'>Write your thoughts</h1>
        
        <div className='flex justify-center items-center'>
            <form className='bg-blue rounded-3xl md:max-w-md p-5'>
                <input className='bg-grey py-5 rounded-2xl my-5 w-96 px-3 outline-none' placeholder="Title..." {...register("title")}/>
                <p style={{color: 'red'}}>{errors.title?.message}</p>
                <textarea className='bg-grey py-5 rounded-2xl my-5 w-96 px-3 outline-none' placeholder='Whats On Your Mind?' {...register('description')}/>
                <p style={{color: 'red'}}>{errors.description?.message}</p>
                <input className='bg-yellow text-white mb-10 px-8 py-2 rounded-full' value={'Post'} type="submit" />
            </form>
        </div>
        
    </div>
}