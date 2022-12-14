import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});

    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }
    const onSubmit = async (a)=>{
        a.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method:"POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })

       const json = await response.json();
       console.log(json);
       if(json.success===true){
           localStorage.setItem("auth_token", json.auth_token);
           navigate('/');
           props.showAlert("success","Logged in Successfully")
        }

        else{
            props.showAlert("danger","Invalid Login Details")
        }
    }
    return (
        <div className='container my-5'>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required className="form-control" id="email" onChange={onChange} value={credentials.email}  aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"minLength={5} required className="form-control" onChange={onChange} value={credentials.password}  id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login