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
          {/* cmps
                            filter by where and dates
                            filter by prefrence 
                            list:
                                preview
                             */}
          <Route path="/room/:stayId/:filter" element={<StayDetails />} />
          
          <Route path="/dashboard/:hostId" element={<Dashboard />} />
          <Route path="/listings/:hostId" element={<Listings/>} />
            

          {/* 
                                cmps:
                                -phtose
                                -amenities
                                -reviews
                                -loaction
                            -resrvation preview */}

            <Route path="/book/stay/:id/" element={<StayOrder/>}>
                <Route path="/book/stay/:id/:filterBy" element={<StayOrder />} />  
            </Route> 
          {/* 
                                cmps:
                                -resrvation deatils
                                -payment options
                                -resrvation preview*/}

          {/* <Route path="/guest/inbox/:id" element={<UserMsgs />} /> */}
          {/* cmps:
                                    -messages preview
                                    -chet box
                                    -resrvation deatials */}

          {/* <Route path="/contact_host/:id" element={<SendMsgsToHost />} /> */}
          {/* 
                                cmps:
                                -location ask about
                                -text box
                                -resrvation preview*/}
          {/* <Route path="/users/show/:id" element={<UserDetails />} /> */}
          {/* 
                                cmps:
                                -user deatails
                                -reviews wrote on */}
          {/* <Route path="/hosting" element={<PropertyCollcation />} /> */}
          <Route path="/amenities/" element={<AmenitiesModal />} />
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}
