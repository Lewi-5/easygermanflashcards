import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Deck from './Deck.tsx'
import './index.css'
import { Header } from './Header.tsx'
import { Footer } from './Footer.tsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/decks/:deckId",
    element: <Deck/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router}/>
    <Footer/>
  </React.StrictMode>,
)
