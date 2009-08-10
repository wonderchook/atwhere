var status_div;
var location_div;
var tip_div;
var loki;
var conference;
function amiatwhere(whereconference)
{
	conference = whereconference;
	status_div = document.getElementById('status');
    location_div = document.getElementById('location');
    tip_div = document.getElementById('tip');
	if (navigator.geolocation) {
	   navigator.geolocation.getCurrentPosition(browserSuccess, browserFailure);
	}
	 else {
	    useLoki(conference);
	}
} 
function browserSuccess(position)
{
 	var lat = position.coords.latitude;
	var lon = position.coords.longitude;	
	atWhere(conference,lat,lon,new Date());
	
}
function browserFailure()
{
	status_div.innerHTML = "Can't determine your location";
	tip_div.innerHTML = "Sorry hope you can make it anyway";
	
}
function useLoki(conference)
{
   
    loki = LokiAPI();
    loki.onSuccess = function(loc) {atWhere(conference,loc.latitude,loc.longitude,new Date());}
    loki.onFailure = function(error,msg) {handleErrors(error,msg)}
    loki.setKey('maploser.com');
    loki.requestLocation(true,loki.NO_STREET_ADDRESS_LOOKUP);
}

function handleErrors(error,msg) {
    switch(error) {
        case 1:
        case 1000:
        case 1001:
        tip_div.innerHTML = "You need to trust in the Loki plugin to find you.";
        break;
        case 2:
        case 3:
        loki.requestIPLocation(true,loki.NO_STREET_ADDRESS_LOOKUP);
        tip_div.innerHTML = "No wifi - going old school";
        break;
        default:
        tip_div.innerHTML = "Hrm... we had an error determing your #geonerd status. ("+msg+")";
    }	
}
function atWhere(conference,lat,lon,date) {
    if(lat <   conference["lat"]+conference["llspan"] 
    && lat > conference["lat"]-conference["llspan"] 
    && lon < conference["lon"]+conference["llspan"] 
    && lon > conference["lon"]-conference["llspan"]) {
        if(date <= conference["endDate"] && date >= conference["startDate"]) { 
            status_div.innerHTML = 'Yes';
            tip_div.innerHTML = "<a href='http://www.wherecamp5280.org/' title='WhereCamp5280'>what unsessions are you going to?</a>";

           
        } else {
            status_div.innerHTML = 'Not Yet, but soon!';
            tip_div.innerHTML = "You're obviously in the right place - <a href='http://www.wherecamp5280.org/' title='WhereCamp5280'>what unsessions are you going to propose?</a>";

        }
    } else {
        status_div.innerHTML = 'No';
        tip_div.innerHTML = "<a href='http://www.wherecamp5280.org/' title='WhereCamp5280'>but it's not too late</a>";
    }
    location_div.innerHTML = lat+", "+lon;
}
function test() {
    var testDate=new Date();
    testDate.setFullYear(2009,04,20);

    atWhere(whereConference,whereConference["lat"],whereConference["lon"],testDate);    
}

