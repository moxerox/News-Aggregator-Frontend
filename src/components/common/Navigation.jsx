import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { NavLink, useNavigate } from "react-router-dom";

const NavigationComponent = ({...props})=>{
    const signOut = useSignOut();
    const navigate = useNavigate();
    const isAuthinticated = useIsAuthenticated();
    const logout = ()=>{
        signOut();
        navigate('/login');
    }
    return (
        <>
        <div className="navbar bg-news fixed top-0 z-10 px-4">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                    <li><NavLink to={'/'}>News</NavLink></li>
                    {isAuthinticated()&&(
                        <>
                            {/* <li><NavLink to={'/profile'}>Profile</NavLink></li> */}
                        </>
                    )}
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <NavLink to={'/'} className="btn btn-ghost normal-case text-xl">News Aggregator</NavLink>
            </div>
            <div className="navbar-end gap-1 hidden md:inline-flex">
                {isAuthinticated()?
                    <button className="btn btn-sm" onClick={logout}>Log Out</button>
                    :
                    <>
                        <NavLink className="btn btn-primary btn-sm" to={'/login'}>Login</NavLink>
                        <NavLink className="btn btn-sm" to={'/register'}>Register</NavLink>
                    </>
                }
            </div>
        </div>
        </>
    )
}

export default NavigationComponent;