<?php

//might want a passphrase as part of the upload process to prevent spamming.

foreach($_FILES as $x){
	if($x["size"]!=0){
		if(!move_uploaded_file($x["tmp_name"],"files/" . $x["name"]))
			echo "Failed to Upload: " . $x["name"];
	}
}

?>