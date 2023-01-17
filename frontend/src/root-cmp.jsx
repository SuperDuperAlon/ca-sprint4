import React from 'react'
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/room/:id" element={<StayDetails />} />
                    <Route path="/book/stay/:id" element={<StayReservation />} />
                    <Route path="/guest/inbox/:id" element={<UserMsgs />} />
                    <Route path="/contact_host/:id" element={<SendMsgsToHost />} />
                    <Route path="/users/show/:id" element={<UserDetails />} />
                    <Route path="/hosting" element={<PropertyCollcation />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


