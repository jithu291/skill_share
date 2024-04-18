import React, { useState } from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';

function UPI() {
    const [open, setOpen] = useState(false);
  return (
    <>
 
       
       
 <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                <Form.Check
                    type="checkbox"
                    label="UPI"
                    style={{ color: 'white' }}
                />
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Form.Group className="d-flex">
                        <Form.Control
                            id="upiIdInput"
                            type="email"
                            placeholder="Enter UPI ID"
                            className="shadow"
                        />
                    </Form.Group>
                </div>
            </Collapse>
               </>
  )
}

export default UPI