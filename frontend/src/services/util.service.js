import axios from "axios"

export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getDistanceFromLatLonInKm,
  randomDate,
  getMonthName,
  getShortDate,
  getRandomFloatInclusive,
  toActualPrice,
  updateDimensions,
  getMonthYear,
  getImg
}

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
function getRandomFloatInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.random() * (max - min + 1) + min;
  return num > max ? max : num; //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomIntInclusive(HOUR, WEEK);
  return Date.now() - pastTime;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
async function getImg() {
    try{
      const imgData = await axios.get('https://randomuser.me/api/?inc=picture')
      return imgData.data.results[0].picture.thumbnail
    } 
    catch(err){
      console.log(err)
    }
}


function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return Math.round(d);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function randomDate(start, end) {
  const startRandomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const endRandomDate = startRandomDate.getTime() + 5 * (1000 * 60 * 60 * 24);
  return `${startRandomDate.toLocaleDateString()}-${new Date(
    endRandomDate
  ).toLocaleDateString()}`;
}

function getMonthName(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[date.getMonth()];
}

function getFullMonthName(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getUTCMonth()];
}

function getShortDate(checkIn, checkOut) {
  const month = getMonthName(new Date(checkIn));
  const startDay = new Date(checkIn).getDate();
  const endDay = new Date(checkOut).getDate();
  return `${month} ${startDay} - ${endDay}`;
}

function toActualPrice(x) {
  
  return x.toLocaleString("us-EN",{minimumFractionDigits: 0});
}

function updateDimensions() {
  return window.innerWidth;
}

function getMonthYear(date) {
    const parsedDate = new Date(date)
  const month = getFullMonthName(parsedDate);
  const year = parsedDate.getUTCFullYear();
  return `${month} ${year}`;
}
