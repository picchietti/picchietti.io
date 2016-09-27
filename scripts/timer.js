// it is running the server/

var Timer = function(when, box){
	var self = this;

	if(typeof Date.parse(when) != 'number')
		throw "Invalid datetime provided.";

	// return a new date with the timezone matching when.
	this.now = function(){
		var n = new Date();
		n.setTime( n.getTime() - ( (n.getTimezoneOffset() - this.when.getTimezoneOffset()) * 60000) );
		return n;
	}

	this.when = when = new Date(when);
	this.box = $(box);

	var now = this.now();

	if(when <= now)
		this.dir = "up";
	else
		this.dir = "down";

	var wy, cy, wm, cm;
	var days=0, months=0;

	cy = now.getFullYear();
	cm = now.getMonth();
	wy = when.getFullYear();
	wm = when.getMonth();

	while(wm != cm || wy != cy){
		months++;
	
		if(this.dir == 'up'){
			days += Calendar.getDaysInMonth(wm, wy);
			wy = (wm == 11) ? ++wy : wy;
			wm = (wm + 1) % 12;
		}
		else{
			days += Calendar.getDaysInMonth(cm, cy);
			cy = (cm == 11) ? ++cy : cy;
			cm = (cm + 1) % 12;
		}
	}

	this.month_ms = days / months * 86400000;

	this.update = function(){
		var now,year,month,day,hour,minute,second,remainder;

		year=month=day=hour=minute=second=0;

		now = self.now();

		if(self.dir == 'up')
			remainder = now - self.when;
		else if(self.dir == 'down')
			remainder = self.when - now;

		var text = "";

		var year_ms = self.month_ms * 12;
		if(remainder >= year_ms){
			year = remainder / year_ms | 0;
			remainder %= year_ms;
			text += year+' year'+((year==1)?' ':'s ');
		}

		if(remainder >= self.month_ms){
			month = remainder / self.month_ms | 0;
			remainder %= self.month_ms;
			text += month+' month'+((month==1)?' ':'s ');
		}

		if(remainder >= 86400000){
			day = remainder / 86400000 | 0;
			remainder %= 86400000;
			text += day+' day'+((day==1)?' ':'s ');
		}

		if(remainder >= 3600000){
			hour = remainder / 3600000 | 0;
			remainder %= 3600000;
			text += hour+' hour'+((hour==1)?' ':'s ');
		}

		if(remainder >= 60000){
			minute = remainder / 60000 | 0;
			remainder %= 60000;
			text += minute+' minute'+((minute==1)?' ':'s ');
		}

		if(remainder >= 1000)
			second = remainder / 1000 | 0;

		text += second+' second'+((second==1)?'':'s');

		self.box.innerHTML = text;
	}

	this.update();
	setInterval(this.update, 1000);
}
