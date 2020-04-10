const fs  = require('fs');
const http = require('http');
const server = http.createServer( function (request, response) {
    if (request.url === '/') {
        response.writeHead(200, {'content-type': "text/html"})
        response.end(`
            <form method="post" action="/message">
                <input type='text' name='message' placeholder='Message' />
                <button type="submit">Submit</button>
            </form>
        `)
    }
    else if (request.method == 'POST' && request.url === '/message') {
        var messageText = ""; 
        request.on('data', function (data) {
            var messageFromForm = data.toString()
            var msg = messageText += messageFromForm 
            
            fs.writeFile('./message.txt', msg, function () {
                console.log('Done!!')
            })
        });
        request.on('end', function () {
            response.end('Done writing the file')
        } )
    }
});
server.listen(8080, '127.0.0.1', () => console.log('Server started on port 8080'))