import React from 'react'
import Header from './Header'
import { Button } from 'react-bootstrap'
import girl from '../assets/Images/landing6.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


function HomePage() {
    return (
        <>
            <Header showUserButton={false} />
            <div className='row' style={{ width: '100vw' }}>
                <div className="col-lg-7 d-flex justify-content-center text-center ">
                    <h1 className='h1' style={{ marginLeft: '-100px', marginTop: '100px' }}>The <span>#1</span> skill <br></br> learning platform</h1>

                </div>
                <div className="col-lg-7 ms-5">
                    <p className='para1'>The Skill Share Platform is an online learning platform designed<br /> to connect users with skilled individuals who can teach various<br />skills through video modules. </p>
                    <Link to={'/register'} className='btn rounded shadow bg-primary text-light mt-5 d-flex justify-content-center gap-2' style={{ marginLeft: ' 150px', width: '200px ' }} variant="primary">Get Started</Link>
                </div>
                <div className="col-lg-4">
                    <motion.div
                        initial={{ scale: 0 }} // Initial scale of 0
                        animate={{ scale: 1 }} // Animate to a scale of 1
                        transition={{ duration: 1 }} // Transition duration
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 2 }}
                    >
                        <img style={{ width: '490px', marginTop: '-180px', marginLeft: '-100px', borderRadius: '10%' }} className=' ' src={girl} alt="Animated Image" />
                    </motion.div>
                </div>
            </div>

        </>
    )
}

export default HomePage