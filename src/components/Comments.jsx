import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { Form } from 'react-router-dom';

function Comments() {

    const [open, setOpen] = useState(false);

    return (
        <> <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            style={{ marginTop: '-66px' }}
        >
            <i class="fa-solid fa-comment"></i>
        </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <form className='d-flex flex-column' >
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Add a comment</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </form>
                </div>
            </Collapse></>
    )
}

export default Comments