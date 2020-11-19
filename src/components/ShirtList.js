import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import mtStyles from '../styles/mtStyles';

import DataTable from './DataTable';
import { TableCell, TableRow, Typography, Link } from '@material-ui/core';
import axios from 'axios';


const ShirtList = () => {
  const classes = mtStyles();
  const [jackets, setJackets] = useState([]);
  const [manu, setManu] = useState([]);
  const [isLoading, setLoading] = useState(false);


  const fetchJackets = async () => {
    setLoading(true);
    try {
        const response = await axios.get('https://bad-api-assignment.reaktor.com/availability/reps');
        const jacket = response.data.response;
            
        setJackets(jacket);
        setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJackets();
  }, []);

  const columns = [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'DATAPAYLOAD',
      accessor: 'DATAPAYLOAD'

    }
  ];

  const Slicer = (y) =>{
    let x = y.length;
    let first = y.slice(31, x);
    let l = first.length;
    let z = l - 31;
    let t = 0 - l;
    let second = first.slice(t, z);

    return second;
  }


  const mapTableBody = (data) => {
    return (
      data.map((jackets, index) => (
        <TableRow
          style={index % 2 ? { background: "#FBFBFB" } : { background: "white" }}
          key={index}>
          <TableCell>
            <Typography noWrap>{jackets.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{Slicer(jackets.DATAPAYLOAD)}</Typography>
          </TableCell>
        </TableRow>
      )
    ))
  };
  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns} 
        data={jackets}
        mapTableBody={mapTableBody} />
    </>
  );
}


export default ShirtList;