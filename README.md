# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh






  <div>
          <Modal size='lg' show={selectedItem !== null} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col>
                  <img className='img-fluid' style={{ height: '250px', width: '300px' }} src={selectedItem ? selectedItem.media : ""} alt="" />
                </Col>
                <Col>
                  <h2>{selectedItem ? selectedItem.title : ""}
                    {/* {selectedItem ? selectedItem.id : ""} */}
                  </h2>
                  <p className='fw-bolder mt-4'>Description: <span style={{ fontWeight: 'lighter' }}  >{selectedItem ? selectedItem.description : ""}</span></p>
                  <p className='fw-bolder'>Price: <span style={{ fontWeight: 'lighter' }}>{selectedItem ? selectedItem.price : ""}</span></p>
                  <p className='fw-bolder'>Category: <span style={{ fontWeight: 'lighter' }}>{selectedItem ? selectedItem.category : ""}</span></p>

                  <div style={{ marginLeft: '280px', marginTop: '-30px' }} className='d-flex justify-content-evenly'>
                    <Button onClick={() => { addToCart(selectedItem.id); handleClose(); }} ><i class="fa-solid fa-cart-plus"></i></Button>
                  </div>
                  <div style={{ marginLeft: '280px', marginTop:'40px'}}> 
                    <Button onClick={() => { placeBid(selectedItem.id); handleClose(); }} className='btn btn-primary'>BID<i class="fa-solid fa-coins ms-2"></i></Button>
                  </div>
                </Col>
              </Row>

            </Modal.Body>
          </Modal>
        </div>