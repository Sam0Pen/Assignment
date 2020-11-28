import axios from 'axios';


const FetchingData = async (props) => {
    
        try {
            const response = await axios.get('https://bad-api-assignment.reaktor.com/products/' + props);
            const products = response.data;
            let productarray = []
            for (let i = 0; i < 100; i++) {
                productarray.push(products[i])
            }
            console.log('jacket', productarray);
            return productarray;
        } catch (err) {
            console.log(err);
        }
    
}

export default FetchingData;