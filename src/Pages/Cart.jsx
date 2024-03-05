import React from 'react'
import { Table } from 'react-bootstrap'

function Cart() {
  return (
    <div className="row mt-5">
        <div className="col-lg-8">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
        </div>
        <div className="col-lg-4"></div>
    </div>
  )
}

export default Cart