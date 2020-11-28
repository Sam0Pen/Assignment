import axios from 'axios';

const FetchingAvailability = async (props) => {
    console.log('manu', props);
    let manufactors = props;
    try {
        let i = 0;
            let y = manufactors.length;
            let manufacturerArrays = {};
            while (i < y) {
                const response2 = await axios.get('https://bad-api-assignment.reaktor.com/availability/' + manufactors[i]);
                manufacturerArrays[manufactors[i]] = response2.data.response;
                i++;
            }
        console.log(manufacturerArrays);
        return manufacturerArrays;
    } catch (err) {
        console.log(err);
        return;
    }

}
export default FetchingAvailability