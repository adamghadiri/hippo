import moment from "moment";

function secondsToHm(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  return dDisplay + hDisplay + mDisplay;
}

const formatTime = ts => {
  const deltaSeconds = Math.floor(moment().valueOf() / 1000) - ts;
  if (deltaSeconds < 60) {
    return `just now`;
  } else if (deltaSeconds < 24 * 3600 * 30) {
    return `${secondsToHm(deltaSeconds)}ago`;
  }
  return moment.unix(ts).format("HH:mm:ss YYYY/MM/DD");
};

export { formatTime };
