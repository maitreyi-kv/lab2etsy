import {getInvoices} from './ProductList';
import {Link} from "react-router-dom";

export default function Products() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => {
          console.log("Invoices", invoice)
          return (
          <Link
            style={{ padding: "1rem 0" }}
            to={`/product/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.Name}
          </Link>
        )})}
      </nav>
    </div>
  )
}
