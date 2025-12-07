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

