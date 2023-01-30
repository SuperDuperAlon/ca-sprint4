import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { stayService } from '../services/stay.service';
import { Navigate, useNavigate, useParams } from 'react-router';
import { orderService } from '../services/order.service';
import { useEffect, useState } from 'react';

import {socketService, SOCKET_EVENT_ORDER_REQUEST} from '../services/socket.service'

import { Bar, Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, CategoryScale, LinearScale, BarElement} from 'chart.js';
import { utilService } from '../services/util.service';
import { loadOrders, updateOrder } from '../store/order.actions';
import { useSelector } from 'react-redux';
import { AppHeader } from '../cmps/app-header';

ChartJS.register(RadialLinearScale,ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


export function Dashboard() {
    const { hostId } = useParams()
    const [listings, setListings] = useState(null)
    // const [orders, setOrders] = useState(null)
    // const [labels, setLabels] = useState([])
    const [doughnutData, setDoughnutData] = useState({})
    const [barData, setBarData] = useState({})

    const navigate = useNavigate()
    const orders = useSelector(storeState => storeState.orderModule.orders)
    
    useEffect(()=>{
        socketService.on(SOCKET_EVENT_ORDER_REQUEST, gotMsg)
    },[])
    
    useEffect(()=>{
        // loadOrders(host)
        // loadHost(hostId)
        loadOrders(hostId)
        loadHost()
    },[])

    useEffect(()=>{
        setDoughnutData(getDoughnutData())
        setBarData( getBarData())
    },[orders])
    

// console.log(orders)
// console.log(doughnutData)
// console.log(barData)
console.log(listings);
    

async function loadHost(){
    try{
        const listings = await stayService.getListings(hostId)
        setListings(listings)
        console.log(listings);    
    }
    catch (err){
        console.log(err)
    }

}

async function handelStatus(currOrder, status){
    try {
        const orderIndex = orders.findIndex((order)=> order._id === currOrder._id)
        currOrder.status = status
        const updatedOrder = await updateOrder(currOrder)
        orders.splice(orderIndex, 1, updatedOrder)
        // setOrders(orders
    } catch(err){
        console.log(err)
    }
    // const orderIndex = orders.findIndex((order)=> order._id === currOrder._id)
    // currOrder.status = status
    // orders.splice(orderIndex, 1, currOrder)
    // setOrders(orders)
   
}

function gotMsg(){
    console.log('got in dashboard:')
}

function getBarData(){
    const constChartData = orders.reduce((acc, order)=>{
        acc[utilService.getMonthName(new Date(order.startDate))] +=   order.totalPrice
        acc[utilService.getMonthName(new Date(order.startDate))] = acc[utilService.getMonthName(new Date(order.startDate))] ? (acc[utilService.getMonthName(new Date(order.startDate))] += order.totalPrice) : order.totalPrice
        return acc
    }, 
    {})
    return constChartData
}

function getDoughnutData(){
    const constChartData = orders.reduce((acc, order)=>{
        acc[order.stay.name] = acc[order.stay.name] ? ++acc[order.stay.name] : 1
        return acc
    }, 
    {})
    return constChartData
}


function calculateStatus(status){
    const sumStatus  = orders.reduce((acc, order)=> (order.status === status)? acc + 1 : acc+0 , 0 )
    return sumStatus
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

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      }
  }
}

const dataBar = {
        labels:  Object.keys(barData),
        datasets: [{
          label: 'revenue',
          data: Object.values(barData),
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
            <div className='header-container full border-bottom'><AppHeader origin={'dashboard'}/></div>
            <nav>
                <button className='dashboard-btn mar-r8' onClick={()=>navigate(`/dashboard/${hostId}`)}>Reservations</button>
                <button className='dashboard-btn ' onClick={()=>navigate(`/listings/${hostId}`)}>Listings</button>
            </nav>
            <div className="charts-section">
                <div className='chart-container'>
                    <div className='fs22 bold pad-b16'>Revenue / month</div>
                    <div><Bar options={options} data={dataBar} /></div>
                </div>
                <div className="chart-container">
                    <div className='fs22 bold pad-b38'>Reservations status</div>
                    <div className='fs18 pad-b24 flex space-between'><div>Pending</div> <div className='grey-76'>{calculateStatus('pending')}</div></div>
                    <div className='fs18 pad-b24 flex space-between'><div>Approved</div> <div className='turquoise'>{calculateStatus('approved')}</div> </div>
                    <div className='fs18 pad-b24 flex space-between'><div>Rejected</div> <div className='pink'>{calculateStatus('rejected')}</div></div>
                </div>
                <div className="chart-container">
                    <div className='fs22 bold pad-b8'>Reservations / listing</div>
                    <div className='flex'>{doughnutData ? <Doughnut options={options} data={dataDoughnut} /> : <div class="loader"></div>}</div>
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
                                <TableCell align='center'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                            .sort((a, b) => new Date(a.startDate) > new Date(b.startDate) ? -1 : 1)
                            .map((order) => (
                                <TableRow className='table-row-body'
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.buyer.fullname}
                                    </TableCell>
                                    <TableCell >{order.stay.name}</TableCell>
                                    <TableCell >{new Date(order.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell >{new Date(order.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell >${utilService.toActualPrice(order.totalPrice)}</TableCell>
                                    <TableCell ><span className={`capitalize ${order.status}`}>{order.status}</span></TableCell>
                                    <TableCell align='center'><button className='dashboard-btn-turquoise' onClick={()=> handelStatus(order, 'approved') }>Approve</button><button className='dashboard-btn-pink' onClick={()=> handelStatus(order, 'rejected')}>Reject</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    )
}








