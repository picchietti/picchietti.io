var express = require('express');
var crypto = require('crypto');
var http = require('http');
var https = require('https');
var url_lib = require('url');
var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var router = express.Router();
var db = require('/usr/src/app/picchietti.io/private/database.js');

const root_dir = '/usr/src/app/picchietti.io';

// Have a problem entering websites without www. or an equivalent.
// Definitely have problem with websites without http://
// Have a problem with relative urls still.
//
// file_get_contents sometimes gets 403 forbidden by some servers.
//
// Problems:
//
// http://tools.ietf.org/html/rfc6455	//file_get_contents 403 forbidden
// http://www.w3.org/TR/html5/media-elements.html#mediaevents	//file_get_contents 403 forbidden

router.post('/', function(req, res){
  var parsed_url, url, folder, ext, title, base;
  folder = decodeURIComponent(req.body.folder);
  url = decodeURIComponent(req.body.url);
  // if the last character is a / then remove it so hashes aren't different
  url = (url[url.length - 1] == "/") ? url.slice(0, -1) : url;
  url_hash = md5(url);
  parsed_url = url_lib.parse(url);
  ext = url.substring(url.lastIndexOf('.') + 1); // if no . then returns full url
  title = "No title found.";
  base = "file.png";

  if(ext == 'pdf')
    base = 'pdf.png';

  var html_response = function(incoming_message){
    var data = "";

    incoming_message.on('data', function(chunk){
      data += chunk;
    });
    incoming_message.on('end', function(){
      data = data.toString();
      process_html(data);
    });
  };

  function error_out(status){
    var status = status || 500;
    res.status(status).end();
  }

  function process_html(html){
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    if(doc == undefined)
      return error_out(500);

    var head = doc.getElementsByTagName('head')[0];
    if(head == undefined)
      return error_out(500);

    var title_tag = head.getElementsByTagName('title')[0];
    if(title_tag != undefined)
      title = title_tag.textContent.trim();

    var links = head.getElementsByTagName('link');
    // search for <link> tags with a favicon
    for(var i=0, y=links.length; i<y; i++){
      var ele = links[i];
      if(!ele.hasAttribute('rel'))
        continue;

      // either 'icon' or 'shortcut icon' will become 'icon'
      var rel = ele.getAttribute('rel').slice(-4);
      if(rel == 'icon'){
        var icon = ele.getAttribute('href');
        break;
      }
    }

    if(icon != null && icon != ''){
      icon = url_lib.resolve(url, icon);
    }
    else{
      // default to searching the root directory
      var icon = parsed_url.protocol + "//" + parsed_url.host + "/favicon.ico";
    }

    store_favicon_disk(icon);
  }

  function store_favicon_disk(icon){
    var parsed_icon_pathname = url_lib.parse(icon).pathname;
    var icon_ext = parsed_icon_pathname.substring(parsed_icon_pathname.lastIndexOf('.'));
    var filename = url_hash + icon_ext;
    var path = root_dir + '/public/pages/bookmarks/icons/';
    var file = fs.createWriteStream(path + filename);

    file.on('open', function(){
      var request_done = function(response) {
        file.on('finish', function(){
          file.close();
          fs.chmodSync(path + filename, '0644');
          store_favicon_db(filename);
        });

        response.pipe(file);
      };

      var request, protocol = url_lib.parse(icon).protocol;
      if(protocol == 'http:')
        request = http.get(icon, request_done);
      else if(protocol == 'https:')
        request = https.get(icon, request_done);
      else
        return error_out(500);

      request.on('error', function(err){
        fs.unlink(path + filename);
        error_out(500);
      });
    });
  }

  function store_favicon_db(filename){
    db.getConnection(function(err, conn){
      conn.query("INSERT INTO bookmarks (folder, url_hash, url, title, icon) VALUES (?,?,?,?,?)", [folder, url_hash, url, title, filename], function(err, rows, fields){
        var all = [folder, url, title, filename];

        if(!err){
          conn.release();
          res.json(all);
        }
      });
    });
  }

  function md5(data) {
    return crypto.createHash("md5").update(data).digest("hex");
  }

  var request, protocol = parsed_url.protocol;
  if(protocol == 'http:')
    request = http.get(url, html_response);
  else if(protocol == 'https:')
    request = https.get(url, html_response);
  else
    return error_out(400);

  request.on('error', function(err){
    error_out(500);
  });



});

module.exports = router;
