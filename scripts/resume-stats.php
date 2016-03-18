<?php

require_once '/home/sysadminjon/picchietti.io/libraries/google-api-php-client/autoload.php';

$client = new Google_Client();
$client->setApplicationName("Resume Stats");
$client->setAssertionCredentials(
	new Google_Auth_AssertionCredentials(
		'254898223634-b7e4u1nfu13sleen49q6a9ad6ds4i7ag@developer.gserviceaccount.com', // email you added to GA
		array('https://www.googleapis.com/auth/analytics.readonly'), // scope
		file_get_contents('/home/sysadminjon/private/Resume Stats-beeb46f49a84.p12')	// private key file
	)
);
$client->setClientId('254898223634-b7e4u1nfu13sleen49q6a9ad6ds4i7ag.apps.googleusercontent.com');

class Custom_Analytics_Queries extends Google_Service_Analytics {
	public function resumeStats($id,$start) {
		return $this->data_ga->get('ga:'.$id,$start,date('Y-m-d'),'ga:users,ga:pageviews');
	}
}

$service = new Custom_Analytics_Queries($client); 

// from msknighteducation.com
$users=3116;
$pageviews=7408;

function sum($results){
    global $users, $pageviews;
    $row=$results->getRows()[0];
    $users+=intval($row[0]);
    $pageviews+=intval($row[1]);
}

$alumni = $service->resumeStats('78421075','2013-10-30');
$me = $service->resumeStats('71729805','2013-04-26');
$dna = $service->resumeStats('82388800','2014-02-18');

sum($alumni);
sum($me);
sum($dna);

// build in a check to make sure that the new file contents are at least the same number as the last time.

file_put_contents("/home/sysadminjon/picchietti.io/data/users.txt",number_format($users, 0, '.', ','));
file_put_contents("/home/sysadminjon/picchietti.io/data/pageviews.txt",number_format($pageviews, 0, '.', ','));

?>