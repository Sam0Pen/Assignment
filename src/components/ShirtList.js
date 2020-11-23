import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';


const ShirtList = () => {
  const [shirts, setShirts] = useState([]);
  const [manu, setManu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [avail , setAvail] = useState({});
  const [finshirts, setFinshirts] = useState([]);

  const makingManu = async (props) =>{
    console.log('doing manu', props);
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
      let manufactorerArrays = {};
      while (i < y) {
        const response2 = await axios.get('https://bad-api-assignment.reaktor.com/availability/' + manu[i]);
        manufactorerArrays[manu[i]]=response2.data.response; 
        i++;
      }
      console.log(manufactorerArrays);
      setAvail(manufactorerArrays);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  }


  const fetchShirts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bad-api-assignment.reaktor.com/products/shirts');
      const shirt = response.data;
      let shirtarray = []
      for (let i = 0; i < 100; i++){
        shirtarray.push(shirt[i])
      }
      console.log('shirt', shirtarray);
      setFinshirts(shirtarray);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const findingMatch = async () => {
    console.log('starting mapping', avail);
    let shirtarray = finshirts;
    let avail2 = avail;
    for(let i=0; i<shirtarray.length; i++){
      let shirt = shirtarray[i];
      let availabi = avail2[shirt.manufacturer];
      let id = shirt.id.toUpperCase();
      console.log('dataid', id);
      for(let y=0; y< availabi.length; y++){
        let datapayload = availabi[y];
        let datapayloadId = datapayload.id;
        console.log('dataid', datapayloadId);
        if (datapayloadId === id){
          shirt['datapayload'] = datapayload.DATAPAYLOAD;
          shirtarray[i] = shirt;
          console.log('done', datapayload.DATAPAYLOAD);
          break
        }
      }
    }
    console.log('done');
    setShirts(shirtarray);
    setLoading(false);
  }

  useEffect(() => {
    fetchShirts();
  }, []);

  useEffect(() =>{
    makingManu(finshirts);
  }, [finshirts]);

  useEffect(() => {
    gettingAvail();
  }, [manu]);

  useEffect(() => {
    findingMatch();
  }, [avail]);

  useEffect(() => {
    console.log('final', shirts);
  }, [shirts]);

  const Slicer = (y) =>{
    if(y === undefined){
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
      data.map((shirts, index) => (
        <TableRow
          style={index % 2 ? { background: "#FBFBFB" } : { background: "white" }}
          key={index}>
          <TableCell>
            <Typography noWrap>{shirts.name}</Typography>
          </TableCell>
          <TableCell>
              <Typography noWrap>{shirts.color}</Typography>
          </TableCell>
          <TableCell style={{ maxWidth: 300 }}>
            <Typography noWrap>{shirts.price} €</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{shirts.manufacturer}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{Slicer(shirts.datapayload)}</Typography>
          </TableCell>
        </TableRow>
      )
    ))
  };
  return (
    <>
      <DataTable
        isLoading={isLoading}
        data={shirts}
        mapTableBody={mapTableBody} />
    </>
  );
}


export default ShirtList;