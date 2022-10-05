import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Spinner from '../components/Spinner';
import '../pages/ProductList.css';

const ProductList = props => {
    const [loadedProducts, setLoadedProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState();
    const baseURL = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(baseURL + '/api/products');
                setLoadedProducts(response.data);
            } catch (err) {
                setHasError(err.message)
            }
            setIsLoading(false);
        }
        fetchUsers();
    }, []);

    const heading = (<h4>products</h4>);

    if (isLoading) {
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
    } else if (loadedProducts && loadedProducts.length === 0) {
        return (
            <div>
                {heading}
                <p className="text-info">There are no products.</p>
            </div>
        )
    } else {
        return (
            <div>
                {heading}
                <ul className="product-list">
                    {
                        loadedProducts && loadedProducts.map((item) => {
                            return (
                                <li key={item._id}>
                                    <NavLink className="text-info" to={'view/' + item._id}>{item.name}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
};

export default ProductList;