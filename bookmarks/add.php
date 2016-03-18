<?php
require("cred.php");

/*

Does $_POST decode_url() by default? Why am I using htmlspecialchars_decode instead of url_decode?

Have a problem entering websites without www. or an equivalent.
Definitely have problem with websites without http://
Have a problem with relative urls still.

file_get_contents sometimes gets 403 forbidden by some servers.

Problems:

http://tools.ietf.org/html/rfc6455	//file_get_contents 403 forbidden
http://www.w3.org/TR/html5/media-elements.html#mediaevents	//file_get_contents 403 forbidden

*/


require("/home/sysadminjon/private/picchietti.io/database.php");

$url = $db->real_escape_string($_POST['url']);
$folder =  htmlspecialchars_decode($db->real_escape_string($_POST['folder']));

// CHECK TO SEE IF URL AND FOLDER ARE ALREADY A ROW IN THE DATABASE.


function rel2abs($rel, $base){	
	/* return if already absolute URL */
	if (parse_url($rel, PHP_URL_SCHEME) != '') return $rel;

	/* if it starts with a query or anchor */
	if ($rel[0]=='#' || $rel[0]=='?') return $base.$rel;

	/* parse base URL and convert to local variables:
	 $scheme, $host, $path */
	extract(parse_url($base));
	
	// //cdn.static.website.com/blah
	if(substr($rel,0,2)=="//")
		return $scheme.':'.$rel;

	/* remove non-directory element from path */
	$path = preg_replace('#/[^/]*$#', '', $path);

	/* destroy path if relative url points to root */
	if ($rel[0] == '/') $path = '';

	/* dirty absolute URL */
	$abs = "$host$path/$rel";

	/* replace '//' or '/./' or '/foo/../' with '/' */
	$re = array('#(/\.?/)#', '#/(?!\.\.)[^/]+/\.\./#');
	for($n=1; $n>0; $abs=preg_replace($re, '/', $abs, -1, $n)) {}

	/* absolute URL is ready! */
	return $scheme.'://'.$abs;
}

function store_favicon($icon){
	$content=@file_get_contents($icon);

	if($content!="" && $content!==false){
		switch($http_response_header[8]){
			case "Content-Type: image/x-icon": $ext=".ico";		break;
			case "Content-Type: image/png": $ext=".png";		break;
			case "Content-Type: image/gif": $ext=".gif";		break;
			case "Content-Type: image/svg+xml": $ext=".svg";	break;
			case "Content-Type: image/jpeg": $ext=".jpg";		break;
			default: $ext=".ico";
		}
		
		$name=tempnam("icons",'');
		chmod($name, 0644);
		$new=$name.$ext;
		rename($name,$new);

		file_put_contents($new,$content);

		$base=pathinfo($new);
		return $base["basename"];
	}
	else
		return "file.png";
}


//check for pdf
$extension = pathinfo($url, PATHINFO_EXTENSION);
$pdf = $extension == "pdf";

$title = "No title found.";
$base = "file.png";

if(!$pdf){
	$html=@file_get_contents($url);
	
	if($html!=null){ // if html access isnt forbidden
		$dom=new DOMDocument;
		@$dom->loadHTML($html);
		
		$head=$dom->getElementsByTagName('head')->item(0);
		if($head!=null){ // if <head> is found
			$title_tag=trim($head->getElementsByTagName('title')->item(0)->nodeValue);
			
			if($title_tag!="")
				$title=$title_tag;

			$links=$head->getElementsByTagName('link');
			foreach($links as $ele) {
				if(!$ele->hasAttribute('rel'))
					continue;

				$rel=preg_split('/\s+/', $ele->getAttribute('rel'));

				if(in_array('icon', $rel))
					$icon = $ele->getAttribute('href');
			}
			
			if($icon!=""){ //found favicon link
				$icon=trim(rel2abs($icon, $url));
			}
			else{ //try searching the root directory.
				$parsed=parse_url($url);
				$icon=$parsed["scheme"]."://".$parsed["host"]."/favicon.ico";
			}

			$base=store_favicon($icon);
		}
	}
}
else{ //is a pdf
	$base="pdf.png";
}


//if the last character is a / then remove it
$url = ($url[strlen($url)-1]=="/")?substr_replace($url,'',strlen($url)-1,1):$url;
$hash = md5($url);

$insert = $db->query("INSERT INTO bookmarks (folder,url_hash,url,title,icon) VALUES ('{$folder}','{$hash}','{$url}','{$db->real_escape_string($title)}','{$base}')");

$all = array($folder,$url,$title,$base);

if($insert)
	echo json_encode($all);

	
$db->close();
?>
