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
// import { CategoryScale } from "chart.js";

import { Bar, Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, CategoryScale} from 'chart.js';

ChartJS.register(RadialLinearScale,ArcElement, Tooltip, Legend, CategoryScale);



// const rows = [
//     createData('Carla', 'Nice house', new Date().toLocaleDateString(), new Date().toLocaleDateString(), 5000, 'approved', <button>approve</button>),
//     createData('Louis', 'Nice house', new Date().toLocaleDateString(), new Date().toLocaleDateString(), 3000, 'appending', <button>approve</button>),
// ]


export function Dashboard() {
    const { hostId } = useParams()
    const [listings, setListings] = useState(null)
    const [orders, setOrders] = useState(null)
    // const [labels, setLabels] = useState([])
    const [doughnutData, setDoughnutData] = useState({})

    
    useEffect(()=>{
        loadHost()
    },[])
    
console.log(doughnutData)
// console.log(listings)
// console.log(orders)

async function loadHost(){
    try{
        const listings = await stayService.getListings(hostId)
        const orders = await orderService.getOrders(hostId)
        setListings(listings)
        setOrders(orders)
        setDoughnutData(getData())
    }
    catch (err){
        console.log(err)
    }

}
// !acc.includes(order.stay.name) && acc.push(order.stay.name)
function getData(){
    // orders.forEach((order)=> !labels.includes(order.stay.name) && labels.push(order.stay.name))
    const constChartData = orders.reduce((acc, order)=>{
        acc[order.stay.name] = acc[order.stay.name] ? ++acc[order.stay.name] : 1
        return acc
    }, 
    {})
    return constChartData
}

// function getData(){
//     orders.forEach((order)=> !labels.includes(order.stay.name) && labels.push(order.stay.name)
// }

function calculateStatus(status){
    const sumStatus  = orders.reduce((acc, order)=> order.status === status && acc + 1, 0 )
    return sumStatus>0 ? sumStatus : 0
}

    const dataDoughnut = {
    labels: Object.keys(doughnutData),
    
    datasets: [
        {
            label: 'reservations',
            data: Object.values(doughnutData),
            
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

const dataBar = {
        labels:  ['Oct','Nov','Dec', 'Jan'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
    }



    if (!orders) return <div>loading...</div>
    return (
        <section className="dashboard">
            <div className="charts-section">
                <div className='chart-container'>
                    <div>Revenue / month</div>
                    <div><Bar data={dataBar} /></div>
                </div>
                <div className="chart-container">
                    <div>Reservations status</div>
                    <div>Pending: {calculateStatus('pending')}</div>
                    <div>Approved: {calculateStatus('approved')} </div>
                    <div>Rejected: {calculateStatus('rejected')} </div>
                </div>
                <div className="chart-container">
                    <div>Reservations / listing</div>
                    <div className='flex'><Doughnut data={dataDoughnut} /></div>
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








