import './referrals.css';
import { useState } from 'react';
import * as React from 'react';
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
import arrowDown from "../../assets/arrow-down.svg";

const Referral = ()=>{
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
      
      const rows = [
        createData(1, "Adam", "test1234@test.com", "8EeLAqSd8x", "02/03/2024"),
        createData(2, "Mark", "test1234@test.com", "8EeLAqSd8x", "02/03/2024"),
        createData(3, "Hamilton", "test1234@test.com", "8EeLAqSd8x", "02/03/2024"),
        createData(4, "John", "test1234@test.com", "8EeLAqSd8x", "02/03/2024"),
      
      ];
    return(
        <div className="referral">
        <p className='RefralDetails'>Referral Details</p>
        <div className='form'>
            <div className='formreferal'>
                <p className='referalP'>Referral ID</p>
                <input className="referalId" 
                placeholder="5kwXxmEmLc"/>

            </div>
            <button className='share'>Share</button>

        </div>
        <div className='Table'>
        <div className='tableHeader'> 
                <p className='referalHistory'>Referral ID History </p>
                <Button
  aria-controls="simple-menu"
  aria-haspopup="true"
  onClick={handleClick}
  variant="outlined"
  className='WeekCalendar'
  sx={{
    display:'flex',
    justifyContent:"space-between",
    gap:"8px",
    fontFamily:"Montserrat",
    padding: '15px 20px',
    borderRadius: '12px',
    color: '#6B7280',
    fontWeight:"500",
    borderColor: '#F0F1F3',
    marginRight:"0px",
  }}
>
  <img style={{width:"20px", height:"20px"}}src={calendar} alt="Calendar"  />
  This Week
  <img style={{width:"12px" , height:"12px"}} src={arrowDown} alt="Arrow Down" />
</Button>

                </div>
        <TableContainer component={Paper}  sx={{ boxShadow: 'none'}} >
           
      <Table sx={{ minWidth: 650 , borderRadius:0 , border:"none" }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#F0F1F3" , color:"#667085"}}>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Date</TableCell>
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
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </TableContainer>
    <div className='footer'>
            <div className='para'><p>Showing 4 items per page</p></div>
            <div>
            <Pagination count={4} variant="outlined" shape="rounded" />
            </div>
        </div>
        </div>
        
      </div>
    );
}
export default Referral;