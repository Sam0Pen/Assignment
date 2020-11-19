import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import mtStyles from '../styles/mtStyles';

import DataTable from './DataTable';
import { TableCell, TableRow, Typography, Link, Button } from '@material-ui/core';
import axios from 'axios';


const JacketList = () => {
  const classes = mtStyles();
  const [jackets, setJackets] = useState([]);
  const [manu, setManu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [avail , setAvail] = useState([]);
  const [finjackets, setFinjack] = useState([]);

  const makingManu = (props) =>{
    console.log('doing manu');
    let y = props.length;
    let i = 0;
    let array = [];
    while (i < y){
      array.push(props[i].manufacturer);
      i++;
    }
    const uniqueManus = Array.from(new Set(array));
    
    setManu(uniqueManus);
  }
  const gettingAvail = async () => {
    console.log('manu', manu);
    setLoading(true);
    try {
      let i = 0;
      let y = manu.length;
      let array = []
      while (i < y) {
        const response2 = await axios.get('https://bad-api-assignment.reaktor.com/availability/' + manu[i]);
        let z = response2.data.response.length
        let x = 0;
        while (x < z) {
          array.push(response2.data.response[x]);
          x++;
        }
        i++;
      }
      console.log(array);
      setLoading(false);
      setAvail(array);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  }


  const fetchJackets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bad-api-assignment.reaktor.com/products/jackets');
      const jacket = response.data;
      console.log('jacket', jacket);
      await makingManu(jacket);
      console.log(manu);
      await gettingAvail();
      await setJackets(jacket);
      console.log(avail);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const findingMatch = () => {
    avail.map(data=>{
      setJackets({...jackets, [data.id]: data.DATAPAYLOAD});
    })

  }

  useEffect(() => {
    fetchJackets();
  }, []);

    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            Header: 'Manufacturer',
            accessor: 'manufacturer'
        },
        {
            Header: 'Availability',
            accessor: 'availability'
        }
    ];


  const mapTableBody = (data) => {
    return (
      data.map((jackets, index) => (
        <TableRow
          style={index % 2 ? { background: "#FBFBFB" } : { background: "white" }}
          key={index}>
          <TableCell>
            <Typography noWrap>{jackets.name}</Typography>
          </TableCell>
          <TableCell>
              <Typography noWrap>{jackets.color}</Typography>
          </TableCell>
          <TableCell style={{ maxWidth: 300 }}>
            <Typography noWrap>{jackets.price}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{jackets.manufacturer}</Typography>
          </TableCell>
        </TableRow>
      )
    ))
  };
  return (
    <>
    <div><Button onClick={()=> console.log(avail)}>console</Button></div>
      <DataTable
        isLoading={isLoading}
        columns={columns} 
        data={jackets}
        mapTableBody={mapTableBody} />
    </>
  );
}


export default JacketList;