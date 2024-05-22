function addLeadingZero(number) {
return (number < 10 ? "0" : "") + number;
}
function setCountdown(endDate, elementIds) {
elementIds.forEach(function (elementId) {
var countdownElement = document.getElementById(elementId);

var countdownInterval = setInterval(function () {
var now = new Date().getTime();
var distance = endDate - now;

if (distance <= 0) {
clearInterval(countdownInterval);
countdownElement.innerHTML = "Usajili Umeanza";
} else {
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
days = addLeadingZero(days);
hours = addLeadingZero(hours);
minutes = addLeadingZero(minutes);
seconds = addLeadingZero(seconds);

countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}
}, 1000);
});
}
function setDaysLeft(endDate, elementIds) {
elementIds.forEach(function (elementId) {
var daysLeftElement = document.getElementById(elementId);

var daysLeftInterval = setInterval(function () {
var now = new Date().getTime();
var distance = endDate - now;

if (distance <= 0) {
clearInterval(daysLeftInterval);
daysLeftElement.innerHTML = "Inakusanya taarifa...";
} else {
var daysLeft = Math.ceil(distance / (1000 * 60 * 60 * 24));
daysLeft = addLeadingZero(daysLeft);
daysLeftElement.innerHTML = "Bado Siku " + daysLeft;
}
}, 1000);
});
}
function setMultipleCountdowns(datesAndIds) {
datesAndIds.forEach(function (dateAndIds) {
var targetDate = new Date(dateAndIds.date);
setCountdown(targetDate, dateAndIds.countdownIds);
setDaysLeft(targetDate, dateAndIds.daysLeftIds);
});
}

var datesAndIds = [
{
date: "2024-05-21T21:15:59",
countdownIds: ["countdown1", "countdown2"],
daysLeftIds: ["daysLeft1", "daysLeft2", "daysLeft3", "daysLeft4"]
},
{
date: "2024-06-15T12:00:00",
countdownIds: ["pubg1v1"],
daysLeftIds: ["pubgleft1v11", "pubgleft1v12"]
},

]; setMultipleCountdowns(datesAndIds);
document.addEventListener("DOMContentLoaded", () => {function checkOrientation() {if (window.innerHeight > window.innerWidth) {document.body.style.display = "block";document.querySelector(".landscape-message").style.display = "none";} else {document.body.style.display = "none";document.querySelector(".landscape-message").style.display = "flex";}}window.addEventListener("resize", checkOrientation);window.addEventListener("orientationchange", checkOrientation);checkOrientation();});
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
modal.style.display = "block";
}
span.onclick = function() {
modal.style.display = "none";
}
  window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}
