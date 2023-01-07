import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"

function About() {

  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('auth_token'))
    {
      navigate('/login');
    }  

  }, [navigate])
  return (
    <div className='aboutpage'>Working on about page</div>
  )
}

export default About