import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';


const JacketList = () => {
  const [jackets, setJackets] = useState([]);
  const [manu, setManu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [avail , setAvail] = useState({});
  const [finjackets, setFinjack] = useState([]);

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


  const fetchJackets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bad-api-assignment.reaktor.com/products/jackets');
      const jacket = response.data;
      let jackarray = []
      for (let i = 0; i < 100; i++){
        jackarray.push(jacket[i])
      }
      console.log('jacket', jackarray);
      setFinjack(jackarray);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const findingMatch = async () => {
    console.log('starting mapping', avail);
    let jacketarray = finjackets;
    let avail2 = avail;
    for(let i=0; i<jacketarray.length; i++){
      let jacket = jacketarray[i];
      let availabi = avail2[jacket.manufacturer];
      let id = jacket.id.toUpperCase();
      console.log('dataid', id);
      for(let y=0; y< availabi.length; y++){
        let datapayload = availabi[y];
        let datapayloadId = datapayload.id;
        console.log('dataid', datapayloadId);
        if (datapayloadId === id){
          jacket['datapayload'] = datapayload.DATAPAYLOAD;
          jacketarray[i] = jacket;
          console.log('done', datapayload.DATAPAYLOAD);
          break
        }
      }
    }
    console.log('done');
    setJackets(jacketarray);
    setLoading(false);
  }

  useEffect(() => {
    fetchJackets();
  }, []);

  useEffect(() =>{
    makingManu(finjackets);
  }, [finjackets]);

  useEffect(() => {
    gettingAvail();
  }, [manu]);

  useEffect(() => {
    findingMatch();
  }, [avail]);

  useEffect(() => {
    console.log('final', jackets);
  }, [jackets]);

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