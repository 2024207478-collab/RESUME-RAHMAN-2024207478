/* =====================================================================
   script.js  |  the small program that makes things MOVE or REACT on the website
   Author: Abdul Rahman bin Mohd Yusuf (IMD318 individual project)

   What it does, in order:
     1. Shows a clock at the top and a greeting on the Home page
     2. Makes the A+ and A- buttons change the size of the writing
     3. Shows a "add photo" box when a photo file is not added yet
     4. Uses the real logo if I added it, otherwise a simple badge
     5. Makes the search box on the Site Map page work
     6. Lets you click a note on the Experience page to show its photo
   Lines that start with // explain each step in simple words.
   ===================================================================== */
(function () {
  "use strict";
  // CLOCK: shows the time at the top and updates it every second (also writes the greeting on the Home page)
  var clock = document.getElementById("clock");
  function tick() {
    var d = new Date();
    if (clock) clock.textContent = d.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    var g = document.getElementById("greet");
    if (g) {
      var h = d.getHours();
      g.textContent = (h < 12 ? "a good morning" : h < 18 ? "a good afternoon" : "a good evening") +
        ", " + d.toLocaleDateString("en-MY", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
  }
  tick(); setInterval(tick, 1000);
  // TEXT SIZE BUTTONS: A+ makes the writing bigger and A- makes it smaller. The size is kept when you go to another page
  var size = parseInt(sessionStorage.getItem("fs") || "16", 10);
  function apply() { document.documentElement.style.fontSize = size + "px"; sessionStorage.setItem("fs", size); }
  apply();
  document.getElementById("bigger").onclick = function () { size = Math.min(24, size + 2); apply(); };
  document.getElementById("smaller").onclick = function () { size = Math.max(12, size - 2); apply(); };
  // MISSING PHOTO: if a photo is not in the images folder yet, show a box that tells which file to add (no broken picture)
  document.querySelectorAll("img[data-ph]").forEach(function (img) {
    img.onerror = function () {
      var d = document.createElement("div");
      d.className = "ph"; d.style.width = img.width + "px"; d.style.height = img.height + "px"; d.style.maxWidth = "100%";
      d.textContent = "Add photo: images/" + img.getAttribute("src").split("/").pop();
      img.replaceWith(d);
    };
    if (img.complete && img.naturalWidth === 0) img.onerror();
  });
  // LOGOS: use the real logo picture (.png) if I added it, otherwise show the simple badge (.svg)
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.onerror = function () { img.onerror = null; img.src = img.getAttribute("data-fallback"); };
    if (img.complete && img.naturalWidth === 0) img.onerror();
  });
  // SEARCH BOX on the Site Map page: hides the pages that do not match the word typed
  var q = document.getElementById("q");
  if (q) q.oninput = function () {
    var v = q.value.toLowerCase();
    document.querySelectorAll("#links li").forEach(function (li) { li.style.display = li.textContent.toLowerCase().indexOf(v) > -1 ? "" : "none"; });
  };
})();
/* NOTES ON THE EXPERIENCE PAGE: click a note (or press Enter) to show its photo, click again to hide it */
document.querySelectorAll(".exp-row .sticky").forEach(function (note) {
  function toggle() { var open = note.parentElement.classList.toggle("open"); note.setAttribute("aria-expanded", open); }
  note.addEventListener("click", toggle);
  note.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
});
