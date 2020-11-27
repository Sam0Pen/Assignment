import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { TableCell, TableRow, Typography } from '@material-ui/core';

import FetchingData from './FetchingData';
import MakingManufacturer from './MakingManufacturer';
import FetchingAvailability from './FetchingAvailability';
import FindingMatch from './FindingMatch';


const JacketList = () => {

  const [jackets, setJackets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [manufactors, setManufactors] = useState([]);
  const [availability, setAvailability] = useState({});
  const [fetchedData, setFetchedData] = useState([]);


  useEffect( async () => {
    setLoading(true);
    let product = await FetchingData('jackets');
    setFetchedData(product)
  }, []);

  useEffect( async () => {
    console.log('fetched 1', fetchedData);
    let manufacturers = await MakingManufacturer(fetchedData);
    setManufactors(manufacturers);
  }, [fetchedData])

  useEffect( async () => {
    console.log('fetched 2', manufactors);
    let availabilityArray = await FetchingAvailability(manufactors);
    setAvailability(availabilityArray);
  }, [manufactors])

  useEffect( async () => {
    console.log('fetched 3', availability);
    let mergedData = await FindingMatch(fetchedData, availability);
    setJackets(mergedData);
  }, [availability])

  useEffect(() => {
    if(jackets != '') (
      setLoading(false)
    )
    console.log('final', jackets);
}, [jackets]);


  const Slicer = (y) => {
    if (y === undefined) {
      return '';
    }
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
            <Typography noWrap>{jackets.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{jackets.color}</Typography>
          </TableCell>
          <TableCell style={{ maxWidth: 300 }}>
            <Typography noWrap>{jackets.price} €</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{jackets.manufacturer}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{Slicer(jackets.datapayload)}</Typography>
          </TableCell>
        </TableRow>
      )
      ))
  };
  return (
    <>
      <DataTable
        isLoading={isLoading}
        data={jackets}
        mapTableBody={mapTableBody} />
    </>
  );
}


export default JacketList;