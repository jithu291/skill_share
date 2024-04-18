import React from 'react'
import Header from './Header'
import { Button } from 'react-bootstrap'
import girl from '../assets/Images/landing6.png'
import { Link } from 'react-router-dom'






function HomePage() {
    

    
    return (
        <>
            <Header showUserButton={false} />
           

            
            <div className='backgroundImg  row' style={{ width: '100vw' }}>
                <div className="col-lg-7 d-flex justify-content-center text-center ">
                    <h1 className='h1' style={{ marginLeft: '-100px', marginTop: '100px' }}>The <span>#1</span> skill <br></br> Share Platform</h1>

                </div>
                <div className=" content col-lg-7 ms-5">
                    <p className='para1'>The Skill Share Platform is an online learning platform designed<br /> to connect users with skilled individuals who can teach various<br />skills through video modules. </p>
                    <Link to={'/register'} className='btn rounded shadow bg-primary text-light mt-5 d-flex justify-content-center gap-2' style={{ marginLeft: ' 150px', width: '200px ' }} variant="primary">Get Started</Link>
                </div>
            
            </div>


            
        </>
    )
}

export default HomePage