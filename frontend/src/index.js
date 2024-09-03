import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Browse from './components/Browse';
import Items from "./components/Items.js";
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Account from "./components/Account.js"

const appRouter = createBrowserRouter([
  
    {
      path: "/",
      element: <Login /> // This will render inside the Outlet in App
    },  
    {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/browse",
        element: <Browse />
      },
      {
        path: "/browse/:id/items",
        element: <Items />
      },
      {
        path: "/browse/:id",
        element: <Product />
      }, 
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/account", 
        element: <Account />
      }
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
