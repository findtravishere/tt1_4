import { useRef } from "react";
import { Link } from "react-router-dom";
import classes from './CreateAccForm.module.css'



const CreateAccForm = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const SubmitHandler = (event) => {
        event.preventDefault();


        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
    }
    
    return (
        <section className={classes.signup}>
            <h1>DBS Sign Up</h1>
            <form onSubmit={SubmitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef}/>
                </div>
                <div className={classes.actions}>
                    <button>Create Account</button>
                </div>
            </form>
                <Link to="/">
                    <div className={classes.actions}>
                        <button>Go Back</button>
                    </div>
                </Link>
        </section>
    );
}
 
export default CreateAccForm;