import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { stayService } from '../services/stay.service';
import { useParams } from 'react-router';
import { orderService } from '../services/order.service';
import { useEffect, useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale,ArcElement, Tooltip, Legend);



// const rows = [
//     createData('Carla', 'Nice house', new Date().toLocaleDateString(), new Date().toLocaleDateString(), 5000, 'approved', <button>approve</button>),
//     createData('Louis', 'Nice house', new Date().toLocaleDateString(), new Date().toLocaleDateString(), 3000, 'appending', <button>approve</button>),
// ]


export function Dashboard() {
    const { hostId } = useParams()
    const [listings, setListings] = useState(null)
    const [orders, setOrders] = useState(null)



useEffect(()=>{
    loadHost()
},[])

console.log(listings)
console.log(orders)

async function loadHost(){
    try{
        const listings = await stayService.getListings(hostId)
        const orders = await orderService.getOrders(hostId)
        setListings(listings)
        setOrders(orders)
    }
    catch (err){
        console.log(err)
    }

}


function calculateStatus(status){
    const sumStatus  = orders.reduce((acc, order)=> order.status === status && acc + 1, 0 )
    return sumStatus>0 ? sumStatus : 0
}

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    
    datasets: [
        {
            label: 'number of Votes',
            data: [12, 19, 3, 5, 2, 3],
            
            options:{
                    plugins:{
                        legend:{
                            location: 'left'
                        }
                    }
                }
            ,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
            
        },
    ],
}

    if (!orders) return <div>loading...</div>
    return (
        <section className="dashboard">
            <div className="charts-section">
                <div className='chart-container'>Revenue / month</div>
                <div className="chart-container">
                    <div>Reservations status</div>
                    <div>Pending: {calculateStatus('pending')}</div>
                    <div>Approved: {calculateStatus('approved')} </div>
                    <div>Rejected: {calculateStatus('rejected')} </div>
                </div>
                <div className="chart-container">
                    <div>Reservations / listing</div>
                    <div className='flex'><Doughnut data={data} /></div>
                </div>
            </div>
            <div className='table-container'>
                <div className='pad-b24 fs24 bold'> 17 reservations</div>
                <TableContainer className='table' component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='table-row'>
                                <TableCell >Guest</TableCell>
                                <TableCell >Listing</TableCell>
                                <TableCell> <TableSortLabel>Check-in</TableSortLabel></TableCell>
                                <TableCell ><TableSortLabel>Check-out</TableSortLabel></TableCell>
                                <TableCell ><TableSortLabel>Total price</TableSortLabel></TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow className='table-row-body'
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.buyer.fullname}
                                    </TableCell>
                                    <TableCell >{order.stay.name}</TableCell>
                                    <TableCell >{order.startDate}</TableCell>
                                    <TableCell >{order.endDate}</TableCell>
                                    <TableCell >{order.totalPrice}</TableCell>
                                    <TableCell >{order.status}</TableCell>
                                    <TableCell ><button onClick={()=>console.log('yes') }>Approve</button><button>Reject</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    )
}








