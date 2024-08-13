import LoginForm from '../LoginFrom/LoginForm';
import SignUpForm from '../SignupForm/SignUpForm';
import './FormLayout.css';
import { useState, useEffect } from 'react';

export const FormLayout = () => {

    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('loadSignup'))
            setShowForm(false);
    }, []);

    return (
        <div className="body">
            <div className="wrapper">
                <div className="content_login_right">
                    <h1>
                        Chào mừng bạn đến với cuộc biểu tình
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio nihil in. Veritatis voluptatem labore odio eveniet, maiores doloribus alias!
                    </p>
                </div>
                <div className="content_login_left">
                    {
                        showForm ? <LoginForm  onSignUpClick={() => setShowForm(false)} /> : 
                        <SignUpForm  onLoginClick={() => setShowForm(true)}/>
                    }
                </div>
            </div>
        </div>
    )
}
