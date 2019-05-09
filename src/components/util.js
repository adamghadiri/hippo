import moment from "moment";

function secondsToHm(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  return hDisplay + mDisplay;
}

const formatTime = ts => {
  const deltaSeconds = Math.floor(moment().valueOf() / 1000) - ts;
  return deltaSeconds < 24 * 3600
    ? `${secondsToHm(deltaSeconds)} ago`
    : moment.unix(ts).format("HH:mm:ss YYYY/MM/DD");
};

export { formatTime };
