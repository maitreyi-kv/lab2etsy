let invoices = [
  {
    Name: "Santa Monica",
    number: 1995,
    Price: "$10,800",
    due: "12/05/1995",
  },
  {
    Name: "Stankonia",
    number: 2000,
    Price: "$8,000",
    due: "10/31/2000",
  },
  {
    Name: "Ocean Avenue",
    number: 2003,
    Price: "$9,500",
    due: "07/22/2003",
  },
  {
    Name: "Tubthumper",
    number: 1997,
    Price: "$14,000",
    due: "09/01/1997",
  },
  {
    Name: "Wide Open Spaces",
    number: 1998,
    Price: "$4,600",
    due: "01/27/1998",
  },
];

export function getInvoices() {
  return invoices;
}

export function getInvoice(number) {
  return invoices.filter(invoice => invoice.number === number)[0];
}
