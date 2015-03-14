// OOP wrapper around setInterval. 
// Once timer started - invokes callback() each interval milliseconds.
Timer = function(interval, callback) {
    this.interval = interval;
    this.intervalHandle = null;
    this.callback = callback;
}
Timer.prototype.start = function() {
    this.intervalHandle = setInterval(this.callback.bind(this), this.interval);
}
Timer.prototype.stop = function() {
    if (this.intervalHandle) clearInterval(this.intervalHandle);
}

// Turns HTML element into stop-watch widget.
// You may have arbitrtry number of stopwatches at the page
TimerWidget = function(container){
    this.counter = 0;
    this.timerElement = container.getElementsByClassName('timer')[0];
    this.roundsElement = container.getElementsByClassName('rounds')[0];
    this.startElement = container.getElementsByClassName('start')[0];
    this.roundElement = container.getElementsByClassName('round')[0];
    this.stopElement = container.getElementsByClassName('stop')[0];
    this.timer = new Timer(1000, this.tick.bind(this));
    this.timerElement.innerHTML = '00:00';
    this.bindEvents();
}
TimerWidget.prototype.tick = function() {
    this.counter++;
    var seconds = this.counter % 60;
    var minutes = Math.floor(this.counter / 60);
    var secondsStr = seconds < 10 ? '0'+seconds : seconds; 
    var minutesStr = minutes < 10 ? '0'+minutes : minutes;
    this.timerElement.innerHTML = minutesStr + ':' + secondsStr;
}
TimerWidget.prototype.bindEvents = function() {
    var self = this;
    this.startElement.addEventListener("click", function(e){
        e.preventDefault();   
        self.resetTimer();
        self.clearCheckpoints();
        self.timer.start();
    }, false);
    this.roundElement.addEventListener("click", function(e){
        e.preventDefault();
        var checkpointElement = document.createElement('div');
        checkpointElement.setAttribute('class', 'checkpoint');
        checkpointElement.innerHTML = self.timerElement.innerHTML;
        self.roundsElement.appendChild(checkpointElement);
    }, false);
    this.stopElement.addEventListener("click", function(e){
        e.preventDefault();
        self.timer.stop();
    }, false);
};
TimerWidget.prototype.resetTimer = function() {
    this.timer.stop();
    this.counter = 0;
    this.timerElement.innerHTML = '00:00';
}
TimerWidget.prototype.clearCheckpoints = function() {
    var checkpoints = this.roundsElement.getElementsByClassName('checkpoint');
    var checkpoint;
    while(checkpoint = checkpoints.item(0)) {
        this.roundsElement.removeChild(checkpoint);
    }
}