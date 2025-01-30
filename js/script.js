//Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
//ketika menutravel di klik
document.querySelector("#menu-travel").onclick = () => {
  navbarNav.classList.toggle("active");
};

//klik diluar sidebar untuk menghilangkan nav
const menutravel = document.querySelector("#menu-travel");

document.addEventListener("click", function (e) {
  if (!menutravel.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
