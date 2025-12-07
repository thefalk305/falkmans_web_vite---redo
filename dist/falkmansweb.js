//C2Kstudios MAIN JAVASCRIPT FILE
//copyright 2013 CLINT ROBERTSON
//WWW.C2KSTUDIOS.COM
////////////////////////////////////////////////////////////////////////////////

document.createElement("article");
document.createElement("aside");
document.createElement("canvas");
document.createElement("details");
document.createElement("figcaption");
document.createElement("figure");
document.createElement("footer");
document.createElement("header");
document.createElement("nav");
document.createElement("section");
document.createElement("summary");
document.createElement("video");

// function dispDate(dateVal) {
// DaystoAdd=dateVal
// TodaysDate = new Date();
// TodaysDay = new Array('Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday');
// TodaysMonth = new Array('January', 'February', 'March','April', 'May','June', 'July', 'August', 'September','October', 'November', 'December');
// DaysinMonth = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');
// function LeapYearTest (Year) {
// if (((Year % 400)==0) || (((Year % 100)!=0) && (Year % 4)==0)) {
// return true;
// }
// else {
// return false;
// }
// }
// CurrentYear = TodaysDate.getYear();
// if (CurrentYear < 2000)
// CurrentYear = CurrentYear + 1900;
// currentMonth = TodaysDate.getMonth();
// DayOffset = TodaysDate.getDay();
// currentDay = TodaysDate.getDate();
// month = TodaysMonth[currentMonth];
// if (month == 'February') {
// if (((CurrentYear % 4)==0) && ((CurrentYear % 100)!=0) || ((CurrentYear % 400)==0)) {
// DaysinMonth[1] = 29;
// }
// else {
// DaysinMonth[1] = 28;
// }
// }
// days = DaysinMonth[currentMonth];
// currentDay += DaystoAdd;
// if (currentDay > days) {
// if (currentMonth == 11) {
// currentMonth = 0;
// month = TodaysMonth[currentMonth];
// CurrentYear = CurrentYear + 1
// }
// else {
// month =
// TodaysMonth[currentMonth+1];
// }
// currentDay = currentDay - days;
// }
// DayOffset += DaystoAdd;
// function offsettheDate (offsetCurrentDay) {
// if (offsetCurrentDay > 6) {
// offsetCurrentDay -= 6;
// DayOffset = TodaysDay[offsetCurrentDay-1];
// offsettheDate(offsetCurrentDay-1);
// }
// else {
// DayOffset = TodaysDay[offsetCurrentDay];
// return true;
// }
// }
// offsettheDate(DayOffset);TheDate  = DayOffset + ', ';
// TheDate += month + ' ';
// TheDate += currentDay + ', ';
// if (CurrentYear<100) CurrentYear="19" + CurrentYear;
// TheDate += CurrentYear;
// document.write(' '+TheDate);
// }

function spawnpopup(url, name, options, h, w, x, y, scaleType)
{
var windowOptions;
if (scaleType == 'percent')
{
w = (w * screen.availWidth) / 100;
h = (h * screen.availHeight) / 100;
}
if (x == 'center')
{
x = (screen.availWidth - w) / 2;
}
if (y == 'center')
{
y = (screen.availHeight - h) / 2;
}
windowOptions = options + ',width=' + w + ',height=' + h + ',left=' + x + ',top=' + y;
newWindow = window.open(url, name, windowOptions);
if (newWindow) {newWindow.focus()};
}

function closeWindow() {
window.open('','_parent','');
window.close();
}

function preloadImgs() {
 var d=document,a=arguments; if(!d.imgs) d.imgs=new Array();
 for(var i=0; i<a.length; i++) { d.imgs[i]=new Image; d.imgs[i].src=a[i]; }
}

function getObjectByID(id,o) {
 var c,el,els,f,m,n; if(!o)o=document; if(o.getElementById) el=o.getElementById(id);
 else if(o.layers) c=o.layers; else if(o.all) el=o.all[id]; if(el) return el;
 if(o.id==id || o.name==id) return o; if(o.childNodes) c=o.childNodes; if(c)
 for(n=0; n<c.length; n++) { el=getObjectByID(id,c[n]); if(el) return el; }
 f=o.forms; if(f) for(n=0; n<f.length; n++) { els=f[n].elements;
 for(m=0; m<els.length; m++){ el=getObjectByID(id,els[n]); if(el) return el; } }
 return null;
}

function swapImg() {
 var doc=document,args=arguments,elm,n; doc.$imgSwaps=new Array(); for(n=2; n<args.length;
 n+=2) { elm=getObjectByID(args[n]); if(elm) { doc.$imgSwaps[doc.$imgSwaps.length]=elm;
 elm.$src=elm.src; elm.src=args[n+1]; } }
}

function swapImgRestore() {
 var doc=document,i; if(doc.$imgSwaps) { for(i=0;i<doc.$imgSwaps.length;i++) {
  var elm=doc.$imgSwaps[i]; if(elm) { elm.src=elm.$src; elm.$src=null; } } 
  doc.$imgSwaps=null; }
}
