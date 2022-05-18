import React, {useEffect, useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';

import {URL} from '../../constants';
import {useSelector} from 'react-redux';

function ModalAddProduct({ShopName}) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const [category, setCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showCategory, setShowCategory] = useState(false)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [otherCategory, setOtherCategory] = useState(false)
  const [selectedFile, setSelectedFile] = useState(false)
  const [urlUpload, setUrlUpload] = useState("");

  const login = useSelector(state => state.login);


  // const storeID = useSelector(state => state.authentication.storeID)

  const setModalIsOpenToTrue = () => {
    setShow(true)
    console.log("Modal open!")
    let configPost = {
      method: 'get',
      url: `${URL}/products/category`,
      data: {},
      headers: login ? {Authorization: login} : {}
    };

    const getCategory = async () => {
      await axios(configPost)
        .then(function (response) {
          console.log("user deets!!", JSON.stringify(response.data));
          setCategory(response.data)
          console.log("Categories", category)
        })
        .catch(function (error) {
          console.log("Error", error);
          return "ERROR"
        });
    }

    getCategory().then(r => console.log("cat", r)).catch(e => console.log(e))
  }

  const setModalIsOpenToFalse = () => {
    setShow(false)
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
    console.log("Name", name)
  }

  const handleChangeDesp = (e) => {
    setDescription(e.target.value)
    console.log("Name", description)
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value)
    console.log("Name", price)
  }

  const handleChangeQuan = (e) => {
    setQuantity(e.target.value)
    console.log("Name", quantity)
  }

  const handleChangeCategory = (e) => {
    console.log("EEE Modal", e.target.value)
    let val = e.target.value

    if (val === "Other") {
      setShowCategory(true)
    } else {
      setShowCategory(false)
    }
    setSelectedCategory(val)
  }

  const handleOtherCategory = (e) => {
    console.log("COMIUNGNG  GJWJHEHHEJEKJ")
    setOtherCategory(e.target.value)
    console.log("Other Category", otherCategory)
  }

  const submit = async (e) => {
    e.preventDefault()
    const getImageURL = async () => {
      const resp = await axios.post(`${URL}/s3image`, {fileType: selectedFile.type, fileName: selectedFile.name});
      console.log("URL ===", resp.data.url);
      setUrlUpload(resp.data.url);
      return resp.data.url;
    }
    const uploadImageFromURL = async (ImageURL) => {
      await fetch(ImageURL, {
        method: "PUT",
        headers: {
          "Content-type": selectedFile.type
        },
        body: selectedFile
      });
      console.log("Uplaoded image?", ImageURL.split('?')[0]);
      return ImageURL.split('?')[0];
    }
    let response = await uploadImageFromURL(await getImageURL());
    console.log("Respose", response, ShopName, login)

    const UserID = jwt_decode(login).UserID
    console.log("uaser id", UserID)
    // Ref: https://graphql.org/graphql-js/graphql-clients/
    var varsToPass = { product: {
        Name: name,
        Price: price,
        Description: description,
        ImageURL: response,
        QuantityAvailable: Number.parseInt(quantity),
        Category: selectedCategory,
        ShopName: ShopName,
        UserID: UserID
      }
      }

    console.log("Vars", JSON.stringify(varsToPass))

    var query = `mutation addProduct($product: ProductInput!) {
        addProduct(product: $product )
      }`;

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: varsToPass,
      })
    })
      .then(async r => {
        let res = await r.json()
        console.log("resss product===", res)
        // return res.data.registerUser
      })
      .then(msg => {
        console.log("Response graphql", msg)
        setModalIsOpenToFalse()
        window.location.reload(false);
      });
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-30%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      width: '60%'
    }
  };

  return (
    <div>
      <Button onClick={setModalIsOpenToTrue}> Add Item </Button>

      <Modal isOpen={show} style={customStyles} ariaHideApp={false}>
        <h2>Add Items</h2>

        <Button style={{float: 'right'}} onClick={setModalIsOpenToFalse}>x</Button>
        <Form>
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={handleChangeName} required/>
          </Form.Group>
          <Form.Group>
            <Form.Select onChange={handleChangeCategory}>
              {category ?
                category.map((e) => (
                    <option value={e}>{e}</option>
                  )
                ) : "Loading..."
              }
            </Form.Select>
          </Form.Group>
          <Form.Group>
            {
              showCategory ? <Form.Group className="mb-3" controlId="itemNewCat">
                <Form.Label>Add New Category</Form.Label>
                <Form.Control type="text" onChange={handleOtherCategory} required/>
              </Form.Group> : ''
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" onChange={handleChangeDesp} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemPhtot">
            <Form.Label>Image</Form.Label>
            <Form.Control id="imageInput" type="file" accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files[0])} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" onChange={handleChangePrice} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemQuantity">
            <Form.Label>Quantity Available</Form.Label>
            <Form.Control type="number" onChange={handleChangeQuan} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="submit">
            <Form.Control type="submit" onClick={submit} required/>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalAddProduct
