import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./About.css"

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('auth_token'))
    {
      navigate('/login');
    }  

  }, [navigate])

  return (
    <div className='aboutus'>
      <div>
        <h4>Let's Know Something About YourNoteBook</h4>
        <p>YourNoteBook is build to keep notes of user and provide capability to access it from any device.</p> 
        <p>Technology used in this project-</p>
        <p>Frontend - React JS, useContext, Fetch API, Bootstrap 5, HTML5, CSS3, JavaScript.</p>
        <p>Backend - Node JS, Express JS, JWT Token, Bcrypt.</p>
        <p>Database - MongoDB</p>
        <p>Please do check-out below my other projects as well.</p>
         
      </div>
      <div>
      <div className='projects'>
        <h5>QuickNews - Webapp using NEWS API</h5> <a target={"blank"} href="https://rohitsnotebook.netlify.app/"><button>View</button></a>
      </div>

      <div className='projects'>
        <h5>React JS Project - MI Store Clone</h5> <a target={"blank"} href="https://miclonebyrohit.netlify.app/"><button>View</button></a>
      </div>

      <div className='projects'>
        <h5>React JS Project - TextEditor</h5> <a target={"blank"} href="https://rohitstexteditor.netlify.app/"><button>View</button></a>
      </div>
      </div>
    </div>
  )
}

export default About