import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../components/Spinner';

import '../pages/ProductUpdate.css';

const ProductUpdate = props => {
    const history = useHistory();
    const [loadedItem, setLoadedItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState();
    const [productUpdated, setProductUpdated] = useState();
    const [productError, setProductError] = useState();
    const [formDirty, setFormDirty] = useState(false);
    const baseURL = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        const getDetails = async () => {
            try {
                const href = document.location.href;
                const id = href.slice(href.lastIndexOf('/') + 1, href.length);
                const response = await axios.get(`${baseURL}/api/products/${id}`);
                const product = response.data.product;
                setLoadedItem(product);
            } catch (err) {
                setHasError(err.message);
            }
            setIsLoading(false);
        }

        // useEffect called every render
        // form set to dirty onChange
        if (!formDirty) {
            getDetails();
        }
    }, [formDirty]);

    const onSetFormDirty = (evt) => {
        if (!formDirty) {
            setFormDirty(true);
        }

        const myVal = evt.target.value;
        const key = evt.target.name;

        let existing = { ...loadedItem };

        existing[key] = myVal;
        setLoadedItem(existing)
    };

    const onUpdateProduct = async (evt) => {
        evt.preventDefault();

        const eles = evt.target.elements;
        let body = loadedItem;
        let i;
        let len = eles.length;
        let clientError = false;

        for (i = 0; i < len; i++) {
            if (eles[i].tagName === 'INPUT' || eles[i].tagName === 'SELECT') {
                if (eles[i].value === '') {
                    clientError = true;
                    break;
                }
            }
        }

        try {
            if (clientError) {
                let err = { message: 'error: all fields are required' };
                throw err;
            } else if (!formDirty) {
                let err = { message: 'error: there are no field changes' };
                throw err;
            }


            const href = document.location.href;
            const id = href.slice(href.lastIndexOf('/') + 1, href.length);
            const response = await fetch(`${baseURL}/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const responseData = await response.json();

            // console.log(responseData);
            setProductUpdated(true);
            setTimeout(() => {
                history.push('/')
            }, 1500);

        } catch (err) {
            setProductError(err.message);
        }
    }

    const heading = (<h4>update product</h4>);

    if (productUpdated) {
        return (
            <div>
                {heading}
                <div className="text-success">Product updated!</div>
            </div>
        )
    } else if (isLoading) {
        return (
            <div>
                {heading}
                <Spinner />
            </div>
        )
    } else if (hasError) {
        return (
            <div>
                {heading}
                <div className="text-danger">error: {hasError}</div>
            </div>
        )
    } else if (!isLoading && loadedItem) {
        return (
            <div>
                {heading}
                <form id="updateProduct" onSubmit={onUpdateProduct}>
                    {productError && (<div className="text-danger">{productError}</div>)}
                    <div className="form-group">
                        <label htmlFor="productName">product name</label>
                        <input type="text"
                            value={loadedItem.name}
                            className="form-control"
                            name="name"
                            id="productName"
                            placeholder="product name"
                            onChange={onSetFormDirty}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">product price</label>
                        <input type="text"
                            value={loadedItem.price}
                            className="form-control"
                            name="price"
                            id="productPrice"
                            placeholder="product price"
                            onChange={onSetFormDirty}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productOnSale">product is onsale</label>
                        <select
                            className="form-control"
                            value={loadedItem.onsale}
                            name="onsale"
                            id="productOnSale"
                            onChange={onSetFormDirty}
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-outline-info mb-2"
                    >Update
                    </button>
                </form>
            </div>
        )
    }
};

export default ProductUpdate;
