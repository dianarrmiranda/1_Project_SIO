import { useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import { fetchData } from '../../utils';

function RegisterUserPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [image, setImage] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
          const response = await fetchData(`/user/add?name=${username}&email=${email}&password=${password}&cardNumber=${cardNumber}&image=${image}`);
          console.log(response);
          if (response) {
            console.log('Register successful');
            setUsername('');
            setEmail('');
            setPassword('');
            setCardNumber('');
            setImage('');
          } else {
            console.error('Register failed');
          }
        } catch (error) {
          console.error('Error during API call', error);
        }
    };
    
    return (
        <div>
            <Navbar />
            <div className=" min-h-screen bg-base-200">
                <div className=" w-full justify-center items-center">
                    <div className="text-center" >
                    <h1 className="text-5xl font-bold">Register User!</h1>
                    </div>
                    <div className="card max-w mr-10 ml-10 shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required value={password} onChange={handlePasswordChange}/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Card Number</span>
                        </label>
                        <input type="text" placeholder="Card Number" className="input input-bordered" required value={cardNumber} onChange={handleCardNumberChange} />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" placeholder="Image" className="input input-bordered" value={image} onChange={handleImageChange}/>
                        </div>
                        <div className="form-control mt-6 flex justify-center items-center">
                        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <Footer />
      </div>
    );
}

export default RegisterUserPage;
