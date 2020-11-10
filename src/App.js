import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import MainNavigation from './shared/MainNavigation';
import ProductList from './pages/ProductList';
import ProductAdd from './pages/ProductAdd';
import ProductDetail from './pages/ProductDetail';
import ProductUpdate from './pages/ProductUpdate';

const App = () => {

  let routes = (
    <Switch>
      <Route path="/" exact>
          <ProductList />
      </Route>
      <Route path="/add" exact>
          <ProductAdd />
      </Route>
      <Route path="/view/:id" exact>
          <ProductDetail />
      </Route>
      <Route path="/update/:id" exact>
          <ProductUpdate />
      </Route>
    </Switch>
  );

  return (
    <Router>
      <MainNavigation />
      <main className="inner">
      {routes}
      </main>
    </Router>
  );
};

export default App;