var http = require("http");
var url = require("url");
var re1 = /^\/(\d+)$/;
var re2 = /^\/([a-zA-Z]+)\s+(\d+),\s+(\d+)$/;
var month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("pathname:" + pathname);
    var date;
    var resultObj = {"unix":null,"natural":null};
    var result1 = re1.exec(pathname);
    if(result1){
        var sec = parseInt(result1[1]) * 1000;
        date = new Date(sec);
    }else{
        pathname = pathname.replace(/%20/g, " ");
        console.log("pathname:" + pathname);
        var result2 = re2.exec(pathname);
        console.log(result2);
        if(result2){
            var month_str = result2[1];
            month_str = month_str[0].toUpperCase() + month_str.substr(1).toLowerCase();
            console.log("month_str:"+month_str);
            var month = month_arr.indexOf(month_str);
            console.log("month:"+month);
            if(month!=-1){
                date = new Date(parseInt(result2[3]), month, parseInt(result2[2]));
            }
        }
    }
    if(date){
        resultObj.unix = Math.floor(date.getTime() / 1000);
        resultObj.natural = month_arr[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(JSON.stringify(resultObj));
    response.end();
}).listen(3000);
