import React from "react";
import { Routes, Route } from "react-router";

import { AppHeader } from "./cmps/app-header";
import { AppFooter } from "./cmps/app-footer";
import { UserDetails } from "./pages/user-details";
import { StayIndex } from "./pages/stay-index";
import { Dashboard } from "./pages/dashboard";
import { Listings } from "./pages/listings";
import { StayDetails } from "./pages/stay-details.jsx";
import { StayOrder } from "./pages/stay-order.jsx";
import { StayEdit } from "./pages/stay-edit";
import { StaySearchResults } from "./cmps/filter/stay-search-results";
import { AmenitiesModal } from "./cmps/modals/amenities-modal";
import { Orders } from "./pages/orders";
import { OrderDetails } from "./cmps/order-details";
import { OrderEdit } from "./pages/order-edit";
// import { UserDetails } from './pages/user-details'

export function RootCmp() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/orders/:orderId/edit" element={<OrderEdit />} />
          <Route path="/orders/edit" element={<OrderEdit />} />
          <Route path="/" element={<StayIndex />}>
            <Route path="/:filterBy" element={<StayIndex />} />
          </Route>

          <Route path="/stay/edit" element={<StayEdit />} />
          <Route path="/stay/edit/:stayId" element={<StayEdit />} />
          <Route path="/room/:stayId/:filter" element={<StayDetails />} />
          <Route path="/dashboard/:hostId" element={<Dashboard />} />
          <Route path="/listings/:hostId" element={<Listings />} />
          <Route path="/book/stay/:id/" element={<StayOrder />}>
            <Route path="/book/stay/:id/:filterBy" element={<StayOrder />} />
          </Route>
          <Route path="/amenities/" element={<AmenitiesModal />} />
        </Routes>
      </main>
    </div>
  );
}
