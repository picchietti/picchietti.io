<?php

class email{
	private $to, $subject;
	private $header = "Content-Type: text/html; charset=iso-8859-1 From: JonPicchietti.com <no-reply@jonpicchietti.com>\n";
	private $start = '<html><body style="background-color:#eee;margin:0;padding:20px 0;"><div style="background-color:#fff;width:70%;margin:0 auto;padding:20px;border-radius:4px;">';
	private $end = '</div></body></html>';

	function __construct($to, $subject){
		$this->setTo($to);
		$this->setSubject($subject);
	}

	function setTo($people){
		$this->to = htmlspecialchars($people);
	}

	function setSubject($subject){
		$this->subject = htmlspecialchars($subject);
	}

	function send($msg){
		if($this->to=="" || $this->subject=="" || $msg=="")
			http_response_code(400);
			
		// $msg=htmlspecialchars($msg);

		mail($this->to,$this->subject, $this->start.$msg.$this->end,$this->header);

	}

}

?>