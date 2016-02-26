var Calendar={
	isLeapYear:function(year){
		return ( (year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0) );
	},

	getDaysInMonth:function(month,year){
		return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}
};
