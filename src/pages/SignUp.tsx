import {Link} from 'react-router-dom';


export const SignUp = () => {
    return <div>
        <form className='SignUpForm'>
            <h1 className='text-light py-3'>Create Your Account</h1>
            <div className="mb-3">
                <input type="text" placeholder='Username' className="form-control"/>
            </div>
            <div className="mb-3">
                <input type="email" placeholder='Email' className="form-control"/>
            </div>
            <div className="mb-3">
                <input type="password" placeholder='Password' className="form-control" />
            </div>
            <div className="mb-3">
                <input type="password" placeholder='Confirm Password' className="form-control" />
            </div>
            <button type="submit" className="btn signInbtn btn-light">Sign Up</button>
            <p className='text-light mt-4'>Already Have An Account?</p><Link to={'/login'}>Log In</Link>
        </form>
    </div>
}