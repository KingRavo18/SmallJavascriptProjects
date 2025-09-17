(() => {
    function digitalClock() {
        const date = new Date();
        let hours = date.getHours();
        const pm_am = hours <= 12 ? "AM" : "PM";
        hours = String(hours % 12 || 12);
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());

        document.getElementById("hours-display").textContent = hours.padStart(2, "0");
        document.getElementById("minutes-display").textContent = minutes.padStart(2, "0");
        document.getElementById("seconds-display").textContent = seconds.padStart(2, "0");
        document.getElementById("PmAm").textContent = pm_am;
    }
    digitalClock();
    setInterval(digitalClock, 1000);
})();