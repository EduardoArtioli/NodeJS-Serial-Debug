var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('COM6', {
  baudRate: 19200
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

// SERIAL ( data ): 
//                     <data[0]> (split) <data[1]>  (delimiter)
// [0]: 1234\n    ->      [0]       :       1234        \n
// [1]: 154\n     ->      [0]       :       154         \n
// [2]: 0\n       ->      [0]       :       0           \n
// [3]: 3200\n    ->      [0]       :       3200        \n
// [4]: 102\n     ->      [0]       :       102         \n

parser.on('data', function(data){
  var split = /\s*:\s*/;
  var data2 = data.split(split);
  switch (data2[0]) {
    case '[0]':
      console.log(data2[1]);
      io.emit('data0',data2[1]);
      break;
    case '[1]':
      console.log(data2[1]);
      io.emit('data1',data2[1]);
      break;
    case '[2]':
      console.log(data2[1]);
      io.emit('data2',data2[1]);
      break;
    case '[3]':
      console.log(data2[1]);
      io.emit('data3',data2[1]);
      break;  
    case '[4]':
      console.log(data2[1]);
      io.emit('data4',data2[1]);
      break;
    default:
      break;
  }
});

app.use(express.static(__dirname + '/node_modules'));
app.use("/javas", express.static('./javas/'));

app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});

httpServer.listen(8000,'192.168.20.103');




