import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';


const AccessoryList = () => {
  const [accessories, setAccessories] = useState([]);
  const [manu, setManu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [avail , setAvail] = useState({});
  const [finaccessories, setFinaccessories] = useState([]);

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


  const fetchAccessories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bad-api-assignment.reaktor.com/products/accessories');
      const accessory = response.data;
      let accessoryarray = []
      for (let i = 0; i < 100; i++){
        accessoryarray.push(accessory[i])
      }
      console.log('accessory', accessoryarray);
      setFinaccessories(accessoryarray);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const findingMatch = async () => {
    console.log('starting mapping', avail);
    let accessoriesarray = finaccessories;
    let avail2 = avail;
    for(let i=0; i<accessoriesarray.length; i++){
      let accessory = accessoriesarray[i];
      let availabi = avail2[accessory.manufacturer];
      let id = accessory.id.toUpperCase();
      console.log('dataid', id);
      for(let y=0; y< availabi.length; y++){
        let datapayload = availabi[y];
        let datapayloadId = datapayload.id;
        console.log('dataid', datapayloadId);
        if (datapayloadId === id){
            accessory['datapayload'] = datapayload.DATAPAYLOAD;
          accessoriesarray[i] = accessory;
          console.log('done', datapayload.DATAPAYLOAD);
          break
        }
      }
    }
    console.log('done');
    setAccessories(accessoriesarray);
    setLoading(false);
  }

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() =>{
    makingManu(finaccessories);
  }, [finaccessories]);

  useEffect(() => {
    gettingAvail();
  }, [manu]);

  useEffect(() => {
    findingMatch();
  }, [avail]);

  useEffect(() => {
    console.log('final', accessories);
  }, [accessories]);

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
      data.map((accessories, index) => (
        <TableRow
          style={index % 2 ? { background: "#FBFBFB" } : { background: "white" }}
          key={index}>
          <TableCell>
            <Typography noWrap>{accessories.name}</Typography>
          </TableCell>
          <TableCell>
              <Typography noWrap>{accessories.color}</Typography>
          </TableCell>
          <TableCell style={{ maxWidth: 300 }}>
            <Typography noWrap>{accessories.price} €</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{accessories.manufacturer}</Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap>{Slicer(accessories.datapayload)}</Typography>
          </TableCell>
        </TableRow>
      )
    ))
  };
  return (
    <>
      <DataTable
        isLoading={isLoading}
        data={accessories}
        mapTableBody={mapTableBody} />
    </>
  );
}


export default AccessoryList;