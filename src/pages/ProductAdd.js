import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Spinner from '../components/Spinner';

import '../pages/ProductAdd.css';

const ProductAdd = props => {
    const history = useHistory();
    const [productCreated, setProductCreated] = useState();
    const [productError, setProductError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onAddProduct = async (evt) => {
        evt.preventDefault();
        const eles = evt.target.elements;
        let body = {};
        let i;
        let len = eles.length;
        let clientError = false;

        setIsLoading(true);

        for (i = 0; i < len; i++) {
            if (eles[i].tagName === 'INPUT' || eles[i].tagName === 'SELECT') {
                if (eles[i].value === '') {
                    clientError = true;
                    break;
                }
                body[eles[i].name] = eles[i].value;
            }
        }

        try {
            if (clientError) {
                let err = {message: 'error: all fields are required'};
                throw err;
            }
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const responseData = await response.json();

            if (responseData) {
                setIsLoading(false);
            }

            setProductCreated(true);
            setTimeout(() => {
                history.push('/')
            }, 1500);

        } catch (err) {
            setProductError(err.message)
            setIsLoading(false)
        }
    }

    const heading = (<h4>new product</h4>);

    if (productCreated) {
        return (
            <div>
                {heading}
                <div className="text-success">Product created!</div>
            </div>
        )
    } else if (isLoading) {
        return (
            <div>
                {heading}
                <Spinner />
            </div>
        )
    }

    return (
        <div>
            {heading}
            <form id="createProduct" onSubmit={onAddProduct}>
                {productError && (<div className="text-danger">{productError}</div>)}
                <div className="form-group">
                    <label htmlFor="productName">product name</label>
                    <input type="text" className="form-control" name="name" id="productName" placeholder="product name" />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">product price</label>
                    <input type="text" className="form-control" name="price" id="productPrice" placeholder="product price" />
                </div>
                <div className="form-group">
                <label htmlFor="productOnSale">product is onsale</label>
                    <select className="form-control" name="onsale" id="productOnSale" defaultValue={false}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-outline-info mb-2"
                >Add
                </button>
            </form>
        </div>
    )
};

export default ProductAdd;
