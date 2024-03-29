
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import NotificationBox from './NotificationBox'
import { useState, useEffect } from 'react'
import './Navbar.css'

var iconstyle = {
  textDecoration: "none",
}
var title = {
  fontSize : "30px" ,
  color: "rgb(2, 113, 2)",
}
var out={
  color:"#222",
  fontSize : "30px" ,
}


export default function Navbar() {
  
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
//   const [show, setShow] = useState(false);
const [userTags, setUserTags] = useState([]);

const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const isLoggedin = () => {
    if (localStorage.getItem('username') !== null) {

      setLoginStatus(true);
    }
  }

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('since');
    localStorage.removeItem('Usertype');
  
    setLoginStatus(false);
  
    navigate("/"); // Navigate to home
  }
  

  const fetchUserTags = async () => {
    try {
        const username = localStorage.getItem('username');
        // Fetch tags based on user's activity (answered or asked questions)
        const response = await fetch(`http://localhost:8000/api/question/usedtags/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user tags');
        }

        const data = await response.json();
        setUserTags(data);
        // console.log(data.length)
    } catch (error) {
        console.error(error);
    }
};

  const searchQuestion = async (e) => {
    e.preventDefault();
    const que = document.getElementById('searchQue').value;

    if(! isAdmin) {
      await fetchUserTags();
  
      await fetch("http://localhost:8000/api/question/search", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: que, userTags })
      }).then(response => {
        return response.json();
      }).then(questions => {
        navigate("/search", { state: questions });
      });
    } else {
        await fetch("http://localhost:8000/api/question/search_admin", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ keyword: que })
      }).then(response => {
          return response.json();
      }).then(questions => {
          navigate("/search", { state: questions });
      })
    }
    
  }

  useEffect(() => {
    isLoggedin();
  }, [loginStatus])

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;"> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;">
        <div className="container-fluid">
          <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black',  paddingBottom:"45px"}}>
            <NavLink to="/" style={iconstyle} >
              &nbsp;{isAdmin && loginStatus ? <><i style={title}>Admin</i>&nbsp;<b style={out}>Panel</b></> : <><i style={title}>Doubt</i><b style={out}>out</b></>}
            </NavLink>
            
          </div>


          {localStorage.getItem("Usertype") === 'user' && (
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsSscrollHheight: "100px" }}>
            <li className="nav-item dropdown" >
              <NavLink className="nav-link dropdown-toggle" to="/" id="navbarScrollingDropdown" role="button" aria-expanded="false" style={{ color: 'black' }}>
                Options
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" style={{ color: 'black' }}>
                <li><NavLink className="dropdown-item" to="/questions">Classrooms</NavLink></li>
                <li><NavLink className="dropdown-item" to="/editor">Ask a Question</NavLink></li>
                {/* <li><hr className="dropdown-divider" /></li> */}
              </ul>
            </li>
          </ul>)}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarScroll" >
          {loginStatus && (
            <form className="d-flex" style={{ width: 500 }} onSubmit={searchQuestion}>
                <input className="form-control me-2" id="searchQue" type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" style={{ background: 'none', border: 'none', padding: 0, fontSize: '1rem' }}>   ❔</button>
            </form>
        
        
          )}
            <div className="searchbar">

            </div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" Style={{ bsSscrollHheight: "100px" }}>
                <li class="nav-item">
            {localStorage.getItem("Usertype") === 'user' && (
                  <NavLink className="nav-link mr" to="/editor" style={{ color: 'black' }}><button className='btn btn-outline dark'>&lt;/&gt;</button></NavLink>
                  )}
                </li>

              </ul>

            {loginStatus && (<NavLink to='/profile' className='btn btn-white mr-2'>Hey, {localStorage.getItem("username")} !</NavLink>)}
            {/* <button className='btn btn-white mr-2'><i className="fa fa-home"></i></button> */}

            {/* <button className='btn btn-white  mr-2' onClick={() => setShow(!show)}><i className="fas fa-bell"></i></button> */}

            {/* <button className='btn btn-white  mr-2'><i className="fa fa-question" aria-hidden="true"></i></button> */}
            {/* <button className='btn btn-white mr-2'><i className="fa fa-trophy"></i></button> */}

            <ul className="navbar-nav " Style={{ bsSscrollHheight: "100px" }}>

              {loginStatus === true

                ?
                (
                  <li class="nav-item">
                    <button className='btn-logout'  onClick={logout}>Logout</button>
                  </li>
                )
                :
                (<><li class="nav-item">
                  {/* <NavLink className="nav-link" to="/login" style={{ color: 'white' }}><button className='btn btn-outline-primary' Style="background-color: rgb(2, 113, 2) ">Login</button></NavLink> */}
                  <NavLink className="nav-link" to="/login" style={{ color: 'white' }}><button className='btn-login' Style="background-color: rgb(2, 113, 2) ">Login</button></NavLink>
                </li>
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/register" style={{ color: 'black' }}><button className='btn-register' Style="background-color: rgb(2, 113, 2)">Register</button></NavLink>
                  </li></>
                )
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
   
  )
}