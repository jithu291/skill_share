import React from 'react'
import Header from './Header'
import { Button } from 'react-bootstrap'
import girl from '../assets/Images/girl.png'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <>
            <Header />
            <div className='row' style={{width:'100vw'}}>
                <div className="col-lg-7 d-flex justify-content-center text-center ">
                    <h1 className='h1' style={{ marginLeft: '-100px', marginTop: '100px' }}>The <span>#1</span> skill <br></br> learning platform</h1>
                    
                </div>
               <div className="col-lg-7 ms-5">
               <p className='para1'>The Skill Share Platform is an online learning platform designed<br/> to connect users with skilled individuals who can teach various<br/>skills through video modules. </p>
               <Link to={'/register'} className='btn rounded shadow bg-primary text-light mt-5 d-flex justify-content-center gap-2' style={{marginLeft:' 180px',width:'200px'}} variant="primary">Get Started <i class="fa-solid fa-right-long mt-1 " ></i></Link>
               </div>
                <div className="col-lg-4">
<img style={{width:'490px', marginTop:'-150px', marginLeft:'-150px'}} src={girl} alt="" />
                </div>
            </div>
        </>
    )
}

export default HomePage