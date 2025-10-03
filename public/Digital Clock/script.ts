(() => {
    document.addEventListener("DOMContentLoaded", () => {
        digitalClock();
        setInterval(digitalClock, 1000);
    });

    function digitalClock(): void {
        const date = new Date();
        let hours = date.getHours();
        const pm_am = hours < 12 ? "AM" : "PM";
        hours = hours % 12 || 12;
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());

        (document.getElementById("hours-display") as HTMLElement).textContent = String(hours).padStart(2, "0");
        (document.getElementById("minutes-display") as HTMLElement).textContent = minutes.padStart(2, "0");
        (document.getElementById("seconds-display") as HTMLElement).textContent = seconds.padStart(2, "0");
        (document.getElementById("PmAm") as HTMLElement).textContent = pm_am;
    }
})();