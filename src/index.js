import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './page/Layout';
import Home from './page/Home';
import Blogs from './page/Blogs';
import BlogDetil from './page/BlogDetil';
import Events from './page/Events';
import EventDetil from './page/EventDetil';
import About from './page/About';
import NoPage from './page/NoPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:id" element={<BlogDetil />} />
        <Route path="events" element={<Events />} />
        <Route path="event/:id" element={<EventDetil />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

