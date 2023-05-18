document.addEventListener("DOMContentLoaded", function() {
    const collapsibleHeaders = document.querySelectorAll(".collapsible-header");
  
    collapsibleHeaders.forEach(header => {
      header.addEventListener("click", function() {
        const activeHeaders = document.querySelectorAll(".collapsible-header.active");
        // activeHeaders.forEach(activeHeader => {
        //   if (activeHeader !== this) {
        //     activeHeader.classList.remove("active");
        //     activeHeader.nextElementSibling.style.display = "none";
        //   }});

        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
          content.style.marginLeft = "5px";
        }
      });
    });
  });
  