const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Gửi dữ liệu giả định (hoặc dữ liệu từ cơ sở dữ liệu) mỗi giây
  const interval = setInterval(() => {
    const fakeData = {
      options: [
        { _id: '1', contentOption: 'Option 1', votes: Math.floor(Math.random() * 100) },
        { _id: '2', contentOption: 'Option 2', votes: Math.floor(Math.random() * 100) }
      ]
    };
    ws.send(JSON.stringify(fakeData));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});
