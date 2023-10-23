import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick=async ()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth, provider);
            const res=await fetch("/api/auth/google",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
            })
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        }
        catch(err){
            console.log("Could not connect to Google",err);
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='parent p-3 rounded-lg bg-neutral-500 hover:font-bold text-white uppercase border hover:bg-slate-500 border-gray-500 hover:text-white transition-all delay-75 hover:tracking-[.15em]'>
            Continue with <span className='child'>Google</span>
        </button>
    )
}

export default OAuth
