<?php




// move to private folder so it wont be executable by users.


// redirects cause the favicon to be file.png when the favicon is still possible to get.





require("/home/sysadminjon/private/picchietti.io/database.php");


function rel2abs($rel, $base){
	/* already absolute. */
	if(strpos($rel,'://')) return $rel;

	/* starts with a hash or query. */
	if ($rel[0]=='#' || $rel[0]=='?') return $base.$rel;

	/* parse base URL and convert to local variables:
	  	$scheme, $host, $path, $port, $user, $pass, $query, $fragment */
	$parsed_base = parse_url($base);
	extract($parsed_base);

	/* no protocol. */
	if(substr($rel,0,2)=="//") return $scheme.':'.$rel;

	/* add domain */
	if($base[0]=='/') return $scheme.'://'.$host.$rel;

	$split_path = explode('/', $path);
	$split_rel = explode('/', $rel);

	while($split_rel[0] == '..' || $split_rel[0] == '.'){
		if($split_rel[0] == '..'){
			array_shift($split_rel);
			array_pop($split_path);
		}
		else{
			array_shift($split_rel);
			break;
		}
	}

	$partial = $host . join($split_path, '/') . '/' . join($split_rel, '/');
	$partial = preg_replace('/\/\//', '/', $partial);

	return $scheme . '://' . $partial;

}

function store_favicon($icon, $old_icon){
	$new_content = @file_get_contents($icon);
	$old_content = @file_get_contents('icons/'.$old_icon);

	if($new_content === $old_content)
		return $old_icon;

	if($new_content != "" && $new_content !== false){
		switch($http_response_header[8]){
			case "Content-Type: image/x-icon": $ext = ".ico";	break;
			case "Content-Type: image/png": $ext = ".png";		break;
			case "Content-Type: image/gif": $ext = ".gif";		break;
			case "Content-Type: image/svg+xml": $ext = ".svg";	break;
			case "Content-Type: image/jpeg": $ext = ".jpg";	break;
			default: $ext = ".ico";
		}
		
		$temp_name = tempnam("icons",'');
		chmod($temp_name, 0644);
		$new_name = $temp_name.$ext;
		rename($temp_name, $new_name);

		file_put_contents($new_name, $new_content);

		$base = pathinfo($new_name);
		return $base["basename"];
	}
	else
		return "file.png";
}




# retrieve the bookmarks to validate
$found = $db->query("SELECT url, icon FROM bookmarks WHERE folder='Bookmark Bar' ORDER BY id asc");

while($bookmark = $found->fetch_assoc()){
	$url = $bookmark["url"];
	$icon = '';
	$old_icon = $bookmark["icon"];
	$base = "file.png";

	// echo "\n\nusing url: {$url}\n";

	//check for pdf
	$extension = pathinfo($url, PATHINFO_EXTENSION);
	if ($extension == "pdf"){
		$db->query("UPDATE bookmarks SET icon = 'pdf.png' WHERE url = '{$url}' LIMIT 1");
		continue;
	}

	$dom = new DOMDocument();
	$loaded = @$dom->loadHTMLFile($url);
	
	if($loaded !== false){ // if html access isnt forbidden

		$head = $dom->getElementsByTagName('head')->item(0);
		if($head != null){ // if <head> is found

			$links = $head->getElementsByTagName('link');
			foreach($links as $ele) {
				if(!$ele->hasAttribute('rel'))
					continue;

				$rel = preg_split('/\s+/', $ele->getAttribute('rel'));

				if(in_array('icon', $rel))
					$icon = $ele->getAttribute('href');
			}
			
			if($icon != ''){ //found favicon link
				$absolute = rel2abs($icon, $url);
				$icon = trim($absolute);
			}
			else{ //try searching the root directory.
				$parsed = parse_url($url);
				$icon = $parsed["scheme"]."://".$parsed["host"]."/favicon.ico";
			}

			// echo "icon found {$icon}\n";

			$base = store_favicon($icon, $old_icon);

			// echo "base = {$base}\n";

			if($base != $old_icon && !($base == 'file.png' && $old_icon != 'file.png') && file_exists('icons/'.$old_icon) && $old_icon != 'file.png'){
				// echo "deleting old icon {$old_icon}\n";
				unlink('icons/'.$old_icon);
			}
		}
	}

	if($base != $old_icon && !($base == 'file.png' && $old_icon != 'file.png'))
		$db->query("UPDATE bookmarks SET icon = '{$base}' WHERE url = '{$url}' LIMIT 1");
}

	
$db->close();
?>

