import React, {useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {URL} from '../../constants';


function ModalEdit({product}) {
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

  const handleOtherCategory = (e) => {
    console.log("COMIUNGNG  GJWJHEHHEJEKJ")
    setOtherCategory(e.target.value)
    console.log("Other Category", otherCategory)
  }

  const handleChangeCategory = (e) => {
    console.log("EEE", e.target.value)
    let val = e.target.value

    if (val === "Other") {
      setShowCategory(true)
    } else {
      setShowCategory(false)
    }
    setSelectedCategory(val)
    // console.log("Cat", showCategory)
  }

  const submit = (e) => {
    e.preventDefault()

    console.log("Other cat", otherCategory ? otherCategory : category)
    let configPost = {
      method: 'post',
      url: `${URL}:3001/updateProduct`,
      data: {
        Name: name,
        Description: description,
        Price: price,
        Quantity: quantity,
        Category: otherCategory ? otherCategory : category,
        ProductID: product.ProductID
      },
      headers: {}
    };

    console.log("DATAAA", configPost.data)

    const sumbitDetails = async () => {
      await axios(configPost)
        .then(function (response) {
          console.log("user deets!!", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log("Error", error);
          return "ERROR"
        });
    }

    sumbitDetails().then(() => {
      console.log("SUBMIT details")
    }).catch(e => console.log("ERRORS", e))

    setModalIsOpenToFalse()
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
      <Button onClick={setModalIsOpenToTrue}> Edit Item </Button>
      <Modal isOpen={show} style={customStyles} ariaHideApp={false}>
        <h2>Edit Item</h2>

        <Button style={{float: 'right'}} onClick={setModalIsOpenToFalse}>x</Button>
        <Form>
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={handleChangeName} value={name} required/>
          </Form.Group>
          <Form.Group>
            <Form.Select onChange={handleChangeCategory} value={selectedCategory}>
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
                <Form.Control type="text" onChange={handleOtherCategory}  required/>
              </Form.Group> : ''
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" onChange={handleChangeDesp} required value={description}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" onChange={handleChangePrice} required value={price}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemQuantity">
            <Form.Label>Quantity Available</Form.Label>
            <Form.Control type="number" onChange={handleChangeQuan} required value={quantity}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="submit">
            <Form.Control type="submit" onClick={submit} required/>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalEdit
