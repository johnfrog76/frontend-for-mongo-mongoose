import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../components/Spinner';

import '../pages/ProductDetail.css';

const ProductDetail = props => {
    const [loadedItem, setLoadedItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState();
    const [productRemoved, setProductRemoved] = useState();
    const history = useHistory();
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
        getDetails();
    }, []);

    const onRemoveProduct = async (evt) => {
        evt.preventDefault();
        const href = document.location.href;
        const id = href.slice(href.lastIndexOf('/') + 1, href.length);
        const url = `${baseURL}/api/products/${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setProductRemoved(responseData.message);
            setTimeout(() => {
                history.push('/');
            }, 1500);
        } catch (err) {
            setHasError(err.message);
        }
    };

    const heading = (<h4>product details</h4>);

    if (isLoading) {
        return (
            <div>
                {heading}
                <Spinner />
            </div>
        )
    } else if (productRemoved) {
        return (
            <div>
                {heading}
                <div>{productRemoved}</div>
            </div>
        )
    } else if (hasError) {
        return (
            <div>
                {heading}
                <div>error: {hasError}</div>
            </div>
        )
    } else {
        return (
            <div>
                {heading}
                <ul>
                    {loadedItem.onsale ? <li>Product is onsale!</li> : ''}
                    <li>{loadedItem.name}</li>
                    <li>${loadedItem.price}</li>
                </ul>
                <div>
                    <button className="btn btn-sm btn-outline-danger mr-1" onClick={onRemoveProduct}>Delete</button>
                    <NavLink className="btn btn-sm btn-outline-success" to={'/update/' + loadedItem._id}>Edit</NavLink>
                </div>
            </div>
        )
    }
};

export default ProductDetail;