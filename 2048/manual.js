document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("modal");
  var closeButton = document.getElementsByClassName("close")[0];
  var rulesButton = document.getElementById("rulesButton");
  var refreshButton = document.getElementById("refreshButton");
  var homeButton = document.getElementById("homeButton");
  var aboutButton = document.getElementById("aboutButton");
  var timerElement = document.getElementById("timer");
  var timerInterval;
  var startTime;

  rulesButton.onclick = function() {
    modal.style.display = "block";
  };

  closeButton.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  refreshButton.onclick = function() {
    location.reload();
  };

  homeButton.onclick = function() {
    window.location.href = "../index.html"; 
  };

  aboutButton.onclick = function() {
    window.location.href = "../about/2048.html";
  };

  function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    var now = new Date().getTime();
    var elapsed = now - startTime;
    
    var minutes = Math.floor(elapsed / 60000);
    var seconds = Math.floor((elapsed % 60000) / 1000);

    timerElement.textContent = 
      (minutes < 10 ? "0" : "") + minutes + ":" + 
      (seconds < 10 ? "0" : "") + seconds;
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  startTimer();
});