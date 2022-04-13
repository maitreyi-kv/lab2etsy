import {useParams} from "react-router-dom";
import {getInvoice} from './ProductList';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

export default function Product() {
  let params = useParams();
  // let invoice = getInvoice(Number.parseInt(params.productId))
  // return <h2>Invoice: {invoice.number}</h2>;

  let {Name, Price} = getInvoice(Number.parseInt(params.productId));
  console.log("Invoice===", Number.parseInt(params.productId));

  return (
    <div>
      {/*<Card sx={{minWidth: 275}}>*/}

      {/*<CardActionArea>*/}
      {/*  <CardMedia image='https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg'*/}
      {/*             title={Name}*/}
      {/*  />*/}
      {/*</CardActionArea>*/}

      <Card sx={{minWidth: 275}}>
        <CardMedia
          component="img"
          image="https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg"
          alt={Name}
          height="200"
          title={Name}
        />
      </Card>
      <Typography sx={{fontSize: 22}} variant="h6">
        {Price}
      </Typography>

      <Typography variant="h6">
        {Name}
      </Typography>
    </div>
)
}
