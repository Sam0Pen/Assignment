import React, { useState, useEffect } from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';

import FetchingData from '../datafetching/FetchingData';
import MakingManufacturer from '../datahandling/MakingManufacturer';
import FetchingAvailability from '../datafetching/FetchingAvailability';
import FindingMatch from '../datahandling/FindingMatch';
import DataTable from '../DataTable';
import Slicer from '../AvailabilitySlicer';


const JacketList = () => {

  const [jackets, setJackets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [manufactors, setManufactors] = useState([]);
  const [availability, setAvailability] = useState({});
  const [fetchedData, setFetchedData] = useState([]);


  useEffect(async () => {
    setLoading(true);
    let product = await FetchingData('jackets');
    setFetchedData(product)
  }, []);

  useEffect(async () => {
    console.log('fetched 1', fetchedData);
    let manufacturers = await MakingManufacturer(fetchedData);
    setManufactors(manufacturers);
  }, [fetchedData])

  useEffect(async () => {
    console.log('fetched 2', manufactors);
    let availabilityArray = await FetchingAvailability(manufactors);
    setAvailability(availabilityArray);
  }, [manufactors])

  useEffect(async () => {
    console.log('fetched 3', availability);
    let mergedData = await FindingMatch(fetchedData, availability);
    setJackets(mergedData);
  }, [availability])

  useEffect(() => {
    if (jackets != '') (
      setLoading(false)
    )
    console.log('final', jackets);
  }, [jackets]);

  const mapTableBody = (data) => {
    return (
      data.map((product, index) => (
        <TableRow
          style={index % 2 ? { background: "#FBFBFB" } : { background: "white" }}
          key={index}>
          <TableCell>
            <Typography noWrap>{product.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{product.color}</Typography>
          </TableCell>
          <TableCell style={{ maxWidth: 300 }}>
            <Typography noWrap>{product.price} €</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{product.manufacturer}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{Slicer(product.datapayload)}</Typography>
          </TableCell>
        </TableRow>
      )
      ))
  }
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