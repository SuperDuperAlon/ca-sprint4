import React from "react";
import { Routes, Route } from "react-router";


import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayIndex } from './pages/stay-index'
import { StayDetails } from './pages/stay-details.jsx'
import { StayEdit } from "./pages/stay-edit";
import { StaySearchResults } from "./cmps/filter/stay-search-results";
// import { AppFooter } from './cmps/app-footer'
// import { UserDetails } from './pages/user-details'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} >
                        <Route path="/:filterBy" element={<StayIndex />} />
                    </Route>

                    <Route path="/stay/edit" element={<StayEdit />}/>
                    <Route path="/stay/edit/:stayId" element={<StayEdit />}/>
                        {/* cmps
                            filter by where and dates
                            filter by prefrence 
                            list:
                                preview
                             */}
                    <Route path="/room/:stayId" element={<StayDetails />} />
                            {/* 
                                cmps:
                                -phtose
                                -amenities
                                -reviews
                                -loaction
                            -resrvation preview */}

                    {/* <Route path="/book/stay/:id" element={<Stayorder />} />    */}
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
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}