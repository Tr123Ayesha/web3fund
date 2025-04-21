import './dashboard.css';
import { useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import info from "../../assets/info-circle.svg";
import nftblue from "../../assets/nftCardBlue.svg";
import arrowDown from "../../assets/arrow-down.svg";
import Chart from 'react-apexcharts';
import moneyReceive from "../../assets/money-recive.svg";
import walletMoney from '../../assets/wallet-money.svg';
import moneyReceiveBlue from '../../assets/money-reciveBlue.svg';
import walletYellow from '../../assets/walletMoneyYellow.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Button} from '@mui/material';
import calendar from "../../assets/calendar-2.svg";
import { useState } from 'react';
import Tab from '../../assets/Tab.svg';
import sort from '../../assets/sort.svg';
const Dashboard = ()=>{
  const [anchorEl, setAnchorEl] = useState(null);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function createData(name, nft, value, transaction, date, status , profitDistribution ,Tab) {
    return { name, nft, value, transaction, date, status , profitDistribution,Tab};
}

  const rows = [
    createData(1, "S3-24 20K", "$23,000", "0x0.....03ba22", "02/03/2024", "Active" , "30 Days Left" , Tab),
    createData(2, "S4-24 20K", "$29,000", "0x0.....03ba22", "02/03/2024", "Active" , "60 Days Left", Tab),
    createData(3, "S5-24 50K", "$60,000", "0x0.....03ba22", "02/03/2024", "Active" , "30 Days Left" , Tab),
    createData(4, "S6-24 50K", "$55,000", "0x0.....03ba22", "02/03/2024", "Active" , "30 Days Left" , Tab),
  
  ];
  const barChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    colors: ['#00286B', '#0F68FF'],  // Bar colors
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
    // yaxis: { title: { text: '$ (thousands)' } },
    fill: { opacity: 1 },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',  // Customize font size
        fontFamily: 'Arial, sans-serif',  // Customize font family
      },
      y: {
        formatter: (val) => `$${val.toLocaleString('en-US')}`,  // Format tooltip for y-axis values, adding commas
      },
      theme: 'dark',  // Change background color to dark
      marker: {
        show: true,  // Show marker in tooltip
      },
      onDatasetHover: {
        highlightDataSeries: true,  // Highlight dataset when hovered
      },
    },
    fill: { opacity: 1 },
    grid: {
      borderColor: '#f1f1f1',
    },
    legend: {
      show: false,  // Disable the legend (color identification)
    }
  };

  // const barChartData = [
  //   {
  //     name: 'NFT Growth',
  //     data: [30, 40, 45, 50, 49, 60, 70, 91], // Example data
  //   },
  //   {
  //     name: 'Fund Growth',
  //     data: [23, 33, 35, 55, 42, 55, 80, 95], // Example data
  //   },
  // ];
  const lineChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
    },
    colors: ['#0F68FF', '#00286B'], // Two line colors
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
    // yaxis: { title: { text: '$ (thousands)' } },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',  // Customize font size
        fontFamily: 'Arial, sans-serif',  // Customize font family
      },
      y: {
        formatter: (val) => `$${val.toLocaleString('en-US')}`,  // Format tooltip for y-axis values, adding commas
      },
      theme: 'dark',  // Change background color to dark
      marker: {
        show: true,  // Show marker in tooltip
      },
      onDatasetHover: {
        highlightDataSeries: true,  // Highlight dataset when hovered
      },
    },
    fill: { opacity: 1 },
    grid: {
      borderColor: '#f1f1f1',
    },
    legend: {
      show: false,  // Disable the legend (color identification)
    }
  };

  


  useEffect(() => {
    // Fetch the data from your mock API
    axios.get('http://localhost:3001/lineChartData')
      .then(response => {
        const apiData = response.data; 
        console.log("apiData",apiData);

        // Map API data to chart-friendly format
        const lineData = apiData.map(item => ({
          name: item?.name,
          data: item?.data
        }));

        // Set the lineChartData state
        setLineChartData(lineData);
console.log(lineData);
        // If you want to use the same structure for bar chart, you can do similar mapping.
        // Example of mapping to bar chart format (you may need to adjust for your case)
        const barData = apiData.map(item => ({
          name: item.name,
          data: item.data
        }));
        setBarChartData(barData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    return(
      // <PersistentDrawerLeft>

      <div className='dashboard'>
        <div className='header'>
          <p className='Web3dashboard'>Web3Fund Beta Dashboard</p>
          <p className='web3dashboardPara'>Analyse and track your performance all in one place</p>
        </div>
        <div className='part2'>
          <div className='div1'>
            <p className='totalBalance'>Your Total Balance</p>
            <div className='calc'>
              <p className='cs180'>$180,400.00</p>
              <p className='percent'>+102%</p>
            </div>
            <p className='lastUpdated'>Last updated on 4 minutes ago</p>
            <div className='buttons'>
              <button className='claimProfit'>Claim Profits</button>
              <button className='buyNft'>Buy NFT</button>
            </div>
            <div className='infodiv'>
              <img src={info} alt='information Circle' />
              <p>Total balance from your NFTs</p>

            </div>

          </div>
          <div className='div2'>
            <div className='div2header'>
              <div className='webNftsdiv2'>
                <p className='mywebnft'>My Web3Fund NFTs</p>
                <p className='selectNft'>Select an NFT to view performance and analytics</p>
              </div>
              <button className='BUYnft'> + Buy Web3Fund NFT</button>
            </div>
            <div className='nftCards'>
              <img src={nftblue} alt='nftCard' />
              <img src={nftblue} alt='nftCard' />
              <img src={nftblue} alt='nftCard' />
              <img src={nftblue} alt='nftCard' />

            </div>
          </div>

        </div>
        <div className='graphs'>
          <div className='graph1'>
            <div className='graphHeader'>
              <div className='para'>
                <p className='graphpara1'>NFT Value Growth</p>
                <p className='graphpara2'>View the increase in Value of your NFTs</p>
              </div>
           
  <button className="dropdown-button">
    Yearly
   <img className='arrow' src={arrowDown} alt="arrow"/>
  </button>
            </div>
            <Chart options={barChartOptions} series={barChartData} type="bar" height="300" />
            <div className='Graphcalc'>
<div className='calc1'>
  <div className='imagediv'>
<img src={moneyReceive} alt='Money Receive'/>
</div>
<div className='graphsPara'>
<p className='graphparas1'>Invested</p>
<p className='graphparas2'>$90,000.00</p>
</div>
</div>
<div className='calc1'>
  <div className='imagediv'>
<img src={walletMoney} alt='Money Receive'/>
</div>
<div className='graphsPara'>
<p className='graphparas1'>Live Holdings</p>
<p className='graphparas2'>$180,400.00</p>
</div>
</div>
  </div>
          </div>
          <div className='graph2'>
          <div className='graphHeader'>
              <div className='para'>
                <p className='graphpara1'>Global Web3Fund Growth</p>
                <p className='graphpara2'>Total Fund Growth</p>
              </div>
           
  <button className="dropdown-button">
    Yearly
   <img className='arrow' src={arrowDown} alt="arrow"/>
  </button>
            </div>
            
  <Chart options={lineChartOptions} series={lineChartData} type="line" height="300" />
  <div className='Graphcalc'>
<div className='calc1'>
  <div className='imagediv'>
<img src={moneyReceiveBlue} alt='Money Receive'/>
</div>
<div className='graphsPara'>
<p className='graphparas1'>Deposits</p>
<p className='graphparas2'>$180,400.00</p>
</div>
</div>
<div className='calc1'>
  <div className='imagediv'>
<img src={walletYellow} alt='Money Receive'/>
</div>
<div className='graphsPara'>
<p className='graphparas1'>Total AUM</p>
<p className='graphparas2'>$220,400.00</p>
</div>
</div>
  </div>
          </div>

        </div>
        <div className='Table'>
        <div className='tableHeader'> 
                <p className='referalHistory'>Web3Fund NFT History </p>
                <div className='table-buttons'>
                <Button
  aria-controls="simple-menu"
  aria-haspopup="true"
  onClick={handleClick}
  variant="outlined"
  sx={{
width:'100%',
    display:'flex',
    justifyContent:"space-between",
    gap:"8px",
    fontFamily:"Montserrat",
    // padding: '15px 20px',
    borderRadius: '12px',
    color: '#6B7280',
    fontWeight:"500",
    fontSize:"14px",
    borderColor: '#F0F1F3',
   
  }}
>
  <img style={{width:"20px", height:"20px"}}src={sort} alt="sort"  />
  Filter
 
</Button>
                <Button
                
  aria-controls="simple-menu"
  aria-haspopup="true"
  onClick={handleClick}
  variant="outlined"
  sx={{
    width:'100%',
    display:'flex',
    justifyContent:"space-between",
    gap:"8px",
    fontFamily:"Montserrat",
    // padding: '15px 20px',
    borderRadius: '12px',
    color: '#6B7280',
    fontWeight:"500",
    fontSize:"14px",
    borderColor: '#F0F1F3',
   
  }}
>
  <img style={{width:"20px", height:"20px"}}src={calendar} alt="Calendar"  />
  This Week
  <img style={{width:"12px" , height:"12px"}} src={arrowDown} alt="Arrow Down" />
</Button>
</div>
</div>
        <TableContainer component={Paper} sx={{ boxShadow: 'none'}}>
           
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#F0F1F3" , color:"#667085"}}>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">NFT </TableCell>
            <TableCell align="center">Live Value</TableCell>
            <TableCell align="center">Transaction #</TableCell>
            <TableCell align="center">Date Invested</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Profits Distribution</TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" >
                {row.name}
              </TableCell>
              <TableCell align="center">{row.nft}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
              <TableCell align="center">{row.transaction}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center"><div className='Status'>{row.status}</div></TableCell>
              <TableCell align="center">{row.profitDistribution}</TableCell>
              <TableCell>
        <img src={row.Tab} alt={row.nft} width="24" height="24" />
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <div className='footer'>
            <div className='para'><p>Showing 4 items per page</p></div>
            <div>
            <Pagination count={4} defaultPage={4} variant="outlined" shape="rounded" />
            </div>

        </div>
        </div>
       
      </div>
      // </PersistentDrawerLeft>

    );
}
export default Dashboard;