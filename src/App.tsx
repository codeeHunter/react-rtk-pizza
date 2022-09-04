import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/loader/Loader";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/home/Home";
import NotFound from "./pages/not_found/NotFound";
import "./scss/app.scss";

const Cart = lazy(() => import("./pages/cart/Cart"));
const FullPizza = lazy(() => import("./pages/full_pizza/FullPizza"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
