const MakingManufacturer = async (props) => {
    console.log('doing manu', props);
    let y = props.length;
    let i = 0;
    let array = [];
    while (i < y) {
        array.push(props[i].manufacturer);
        i++;
    }
    const uniqueManufacturers = Array.from(new Set(array));

    return uniqueManufacturers;
}

export default MakingManufacturer;