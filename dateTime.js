setInterval(clock, 1000);

function clock() {
  const dateTime = new Date();

  document.getElementById('dateTime').innerHTML = dateTime.toLocaleString();

}




