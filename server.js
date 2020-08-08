

const http=require('http');
const fs=require('fs');
const url=require('url');
const server=http.createServer((request,response)=>{

console.log(request.url);
var parsed=url.parse(request.url,true);
var query=parsed.query;
var path=parsed.pathname;
//console.log(path);
//console.log(query);
// can Add external services here

var responseCode;
var responseType;
if(path.endsWith(".js"))
{
	responseCode=200;
	responseType={'Content-Type':'text/javascript'};
}
else
if(path.endsWith(".css"))
{
responseCode=200;
responseType={'Content-Type':'text/css'};
}
else
if(path.endsWith(".jpg"))
{
	responseCode=200
	responseType={'Content-Type':'image/jpg'};
}
else
if(path.endsWith(".png"))
{
	responseCode=200;
	responseType={'Content-Type':'image/png'};
}
else
{
	if(path.endsWith("/"))
	{
		path+="index.html";
	}
	else
	if(path.endsWith(".html")==false)
	{
		path+="/index.html";
	}
	responseCode=200;
	responseType={'Content-Type':'text/html'};
}


fs.readFile("."+path,(error,data)=>{

if(error)
{
response.writeHead(404);
response.write("Unable to Find File or Service for the Following Request");
return response.end();
}

response.writeHead(responseCode,responseType);
response.write(data);
return response.end();

});


});



server.on("clientError",(error,socket)=>{

if(error.code === 'ECONNRESET' || !socket.writable())
{
	return;
}

socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');

});

var port=7500
server.listen(port,(error,socket)=>{

	if(error){
		console.log("Something went Wrong,Cannot start server");
	    return;
	}
    
    console.log("Server is Listening at "+port);
})
