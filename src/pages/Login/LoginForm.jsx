import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { login } from "../../services/api";
import { Link, Navigate } from "react-router-dom";

const LoginForm = ({...props}) => {
    
    const [user,setUser] = useState({email:'',password:''});
    const [error, setError] = useState('');
    const signIn = useSignIn();

    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await login(user);
            console.log(response)
            signIn({
                token : response.token,
                expiresIn : 18000,
                tokenType : 'Bearer',
                authState : response.user
            })
            
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        }
    }

    return (
        <div className="bg-base-300 p-8 rounded-lg m-auto w-2/3">
            {error &&
            <div className="alert alert-error shadow-md my-2 w-fit mx-auto">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            </div>
            }
            <form className="flex flex-col gap-y-6 justify-center items-center" onSubmit={onSubmit}>
                <input type="email" value={user.email} onChange={e=>{setUser(prevUser=>{return {...prevUser, email:e.target.value}})}} placeholder="Email" className="input input-bordered input-primary w-full max-w-xs" />
                <input type="password" value={user.password} onChange={e=>{setUser(prevUser=>{return {...prevUser, password:e.target.value}})}} placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" />
                
                <button className="btn btn-primary w-1/3" type="submit">Login</button>
            </form>
            <div className="my-3 text-sm text-center">Don't have an account? <Link to="/register">Register</Link> </div>

        </div>
    );
}

export default LoginForm;