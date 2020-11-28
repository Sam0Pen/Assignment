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
export default Slicer;