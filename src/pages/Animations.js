function reveal1() {
    var reveals = document.querySelectorAll(".reveal1");
    for (var i = 0; i < reveals.length; i++) {
      var top = window.scrollY;
      if (top > 170) {
        reveals[i].classList.add("active");
      }
    }
  }

function reveal2() {
    var reveals = document.querySelectorAll(".reveal2");
    for (var i = 0; i < reveals.length; i++) {
      var top = window.scrollY;
      if (top > 570) {
        reveals[i].classList.add("active");
      }
    }
  }

function reveal3() {
    var reveals = document.querySelectorAll(".reveal3");
    for (var i = 0; i < reveals.length; i++) {
      var top = window.scrollY;
      if (top > 1250) {
        reveals[i].classList.add("active");
      }
    }
  }

function reveal4() {
    var reveals = document.querySelectorAll(".reveal4");
    for (var i = 0; i < reveals.length; i++) {
      var top = window.scrollY;
      if (top > 1830) {
        reveals[i].classList.add("active");
      }
    }
  }

window.addEventListener("scroll", reveal1);
window.addEventListener("scroll", reveal2);
window.addEventListener("scroll", reveal3);
window.addEventListener("scroll", reveal4);