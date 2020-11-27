import React from 'react';

const FindingMatch = async (fetchedData, availability) => {
    console.log('starting mapping', availability);
    console.log('data', fetchedData)
    let array = fetchedData;
    let availabilityarray = availability;
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let productavailability = availabilityarray[product.manufacturer];
        let id = product.id.toUpperCase();
        console.log('dataid', id);
        for (let y = 0; y < productavailability.length; y++) {
            let availabilityobject = productavailability[y];
            let availabilityId = availabilityobject.id;
            console.log('dataid', availabilityId);
            if (availabilityId === id) {
                product['datapayload'] = availabilityobject.DATAPAYLOAD;
                array[i] = product;
                console.log('done', availabilityobject.DATAPAYLOAD);
                break
            }
        }
    }
    console.log('done');
    return array;
}
export default FindingMatch;