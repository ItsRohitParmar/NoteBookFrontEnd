import React,{ useContext, useEffect } from 'react'
import noteContext from '../context/Notes/noteContext'
import { useNavigate } from 'react-router-dom';

function About() {

  const a = useContext(noteContext);

  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('auth_token'))
    {
      navigate('/login');
    }

  }, [])
  return (
    <div>This is about {a.name} of class {a.class}</div>
  )
}

export default About