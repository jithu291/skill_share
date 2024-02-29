import React from 'react'
import Header from './Header'
import { Button } from 'react-bootstrap'
import girl from '../assets/Images/girl.png'

function HomePage() {
    return (
        <>
            <Header />
            <div className='row' style={{overflow:'hidden'}}>
                <div className="col-lg-7 d-flex justify-content-center text-center ">
                    <h1 className='h1' style={{ marginLeft: '-100px', marginTop: '100px' }}>The <span>#1</span> skill <br></br> learning platform</h1>
                    
                </div>
               <div className="col-lg-7 ms-5">
               <p className='para1'>The Skill Share Platform is an online learning platform designed<br/> to connect users with skilled individuals who can teach various<br/>skills through video modules. </p>
               <Button style={{marginLeft:' 180px'}} variant="primary">Get Started</Button>
               </div>
                {/* <div className="col-lg-4">
<img style={{width:'490px', marginTop:'-150px', marginLeft:'-150px'}} src={girl} alt="" />
                </div> */}
            </div>
        </>
    )
}

export default HomePage