import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import baseurl from "../config/apiMethods/baseurl"

const Home = () => {
    //states
    const [shouldFetch, setShoudFetch] = useState(true);
    const [disable, setDisable] = useState(true);
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [price, setPrice] = useState("");
    const [updateItem, setUpdateItem] = useState(null);

    useEffect(() => {
        if (shouldFetch) {
            axios.get(baseurl + 'products')
                .then((res) => {
                    setData(res.data)
                    console.log(res.data)
                    setShoudFetch(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [shouldFetch])

    //add product function
    const sendProduct = () => {
        axios.post(baseurl + "product", {
            name, price, description
        })
            .then(() => {
                setShoudFetch(true)
                setName("")
                setdescription("")
                setPrice("")
            })
    }

    //delete product function
    const deleteProduct = (item) => {
        axios.delete(baseurl + `product/${item._id}`)
            .then(() => {
                setShoudFetch(true)
            })
    }

    //update product function
    const updateProduct = (item) => {
        setDisable(false);
        setUpdateItem(item)
        setName(item.name)
        setdescription(item.description)
        setPrice(item.price)
    }
    const editProduct = () => {
        axios.put(baseurl + `product/${updateItem._id}`, {
            name, price, description
        })
            .then(() => {
                setShoudFetch(true);
                setDisable(true);
                setName("")
                setdescription("")
                setPrice("")
            })
    }

    return (
        <>
            <div className='text-center mt-3 text-2xl h3'>Product Management</div>
            <div className='w-50 mt-5 mx-auto '>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder='Name'
                    style={{ margin: '1rem' }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder='Price'
                    type='number'
                    style={{ margin: '1rem' }}
                    onChange={(e) => setPrice(+e.target.value)}
                    value={price}
                />
                <Form.Control
                    as="textarea"
                    placeholder="Description"
                    style={{ height: '100px', margin: "1rem" }}
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                />
            </div>
            <div className="text-center d-flex justify-content-center">
                <Button className='m-2' variant='primary' disabled={disable ? false : true} onClick={sendProduct}>Add Product</Button>
                <Button className='m-2' variant='primary' disabled={disable} onClick={editProduct}>Update</Button>
            </div>
            <div className="second-part w-50 mx-auto mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><i className="fa-regular fa-pen-to-square" onClick={disable ? () => updateProduct(item) : null}></i></td>
                                <td><i className="fa-solid fa-trash" onClick={disable ? () => deleteProduct(item) : null}></i></td>
                            </tr>
                        }) : <h1>Loading...</h1>}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Home