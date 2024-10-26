import EventEmitter from 'events';

const evnts = new EventEmitter();

evnts.on('elt', (data) => {
    // console.log(data);
});

evnts.on('al', (data) => {
    console.log(data);
});

export default evnts;