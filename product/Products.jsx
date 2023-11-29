import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import CardMedia from '@material-ui/core/CardMedia'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'


import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {Link} from 'react-router-dom'
import AddToCart from './../cart/AddToCart'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  products: {
    padding: '24px'
  },
  addButton:{
    float:'right'
  },
  leftIcon: {
    marginRight: "8px"
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px'
  },
  details: {
    padding: '10px'
  },
}))

export default function Products(){
  const classes = useStyles();
  const [products, setProducts]=useState([])
  useEffect(()=>{
    axios('/api/products').then(response=>{
      if (response.status===200){
        const fetchedData=response.data;
        setProducts(fetchedData)
        console.log(fetchedData)
      }
   }).catch(err=>{

   }) 
  },[])
    return (
      <Card className={classes.products}>
        <Typography type="title" className={classes.title}>
          Products
        </Typography>
        <List dense>
        {products.map((product, i) => {
            return <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.cover}
                  image={'/api/product/image/'+product._id+"?"}
                  title={product.name}
                />
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.productTitle}>
                    {product.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
              </ListItem>
              <Divider/></span>})}
        </List>
      </Card>)
    
    
    // (
    // <div>
    //   <p>products</p>
    //     <div >
    //       <GridList cellHeight={200} >
    //       {products.map((product, i) => (
    //         <GridListTile key={i} className={classes.tile}>
    //           <Link to={"/product/"+product._id}><p>link to product</p></Link>
    //           <GridListTileBar className={classes.tileBar}
    //             title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
    //             subtitle={<span>$ {product.price}</span>}
    //             actionIcon={
    //               <AddToCart item={product}/>
    //             }
    //           />
    //         </GridListTile>
    //       ))}
    //     </GridList>
    //     </div>
    //   </div>
    //    )

}
