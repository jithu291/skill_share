import React from 'react'

function Auth() {
  return (
    <>
    <div className="section">
        <div className="container">
            <div className="row full-height justify-content-center">
                <div className='col-12 text-center align-self-center py-5'>
                  <div className='section pb-5 pt-5 pt-sm-2 text-center'>
                  <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                  <input className='checkbox' type="checkbox" id="reg-log" name='reg-log' />
                  <label for="reg-log"></label>
                   <div className='card-3d-wrap mx-auto'>
                    <div className='card-3d-wrapper'>
                        <div className='card-front'>
                           <div className='center-wrap'>
                              <div className='section text-center'>
                              <h4 class="mb-4 pb-3">Log In</h4>
                              <div className="form-group">
                                <input type="email" className='form-style' placeholder='email' />
                                <i class="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input type="password" className='form-style' placeholder='password' />
                                <i class="input-icon uil uil-lock-alt"></i>
                              </div>
                              <a href="https://www.web-leb.com/code" class="btn mt-4">Login</a>
                      <p class="mb-0 mt-4 text-center"><a href="https://www.web-leb.com/code" class="link">Forgot your password?</a></p>
                              </div>
                           </div>
                        </div>


                        <div className='card-back'>
                            <div className="center-wrap">
                                <div className="section text-center">
                                <h4 class="mb-3 pb-3">Sign Up</h4>
                                 <div className="form-group">
                                    <input type="text" className='form-style' placeholder='Full name' />
                                    <i class="input-icon uil uil-user"></i>
                                 </div>
                                 <div className="form-group mt-2">
                                    <input type="tel" className='form-style' placeholder='Phone number' />
                                    <i class="input-icon uil uil-phone"></i>
                                 </div>
                                 <div className="form-group mt-2">
                                 <input type="email" class="form-style" placeholder="Email"/>
												<i class="input-icon uil uil-at"></i>
                                 </div>
                                 <div class="form-group mt-2">
												<input type="password" class="form-style" placeholder="Password"/>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
                                            <a href="https://www.web-leb.com/code" class="btn mt-4">Register</a>

                                </div>
                            </div>
                        </div>
                    </div>
                   </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Auth