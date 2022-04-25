import React from 'react'
import Table from 'react-bootstrap/Table';
import PurchasedOrder from './PurchasedOrder';

function PurchaseList({orders, loading}) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{display: "flex", flexWrap: "wrap", width: "80%"}}>
      <Table striped bordered hover>
        <thead>
        <tr>
          <td>Idx</td>
          <td> Orders</td>
        </tr>
        </thead>
        <tbody>
        {
          orders.map((order, idx) => (
            // console.log("Order", order)
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td><h6>Total Price {order.TotalPrice}</h6>
                <h6>Date {order.Date}</h6>
                <Table striped bordered hover>
                  <thead>
                  <tr>
                    <td>Index</td>
                    <td>Photo</td>
                    <td>Name</td>
                    <td>ShopName</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Gift</td>
                    <td>Checkbox</td>
                  </tr>
                  </thead>
                  <tbody>
                  <PurchasedOrder order={{order: order.Order}}/>
                  </tbody>
                </Table></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  )
}

export default PurchaseList
