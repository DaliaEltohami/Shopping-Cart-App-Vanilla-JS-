let langbtn = document.querySelector(".lang");
let ar = document.getElementById("ar");
let en = document.getElementById("en");
let lang = localStorage.getItem('lang');
if(lang){
  document.documentElement.setAttribute('dir',lang)
}

document.addEventListener("click", handlelangDropdown);
ar.addEventListener("click", () => handleLang("rtl"));
en.addEventListener("click", () => handleLang("ltr"));

function handleLang(dir) {
  document.documentElement.setAttribute("dir", dir);
  localStorage.setItem("lang", dir);
}

function handlelangDropdown(e) {
  const withinBoundaries = e.composedPath().includes(langbtn);
  if (withinBoundaries) {
      if (langbtn.firstElementChild.style.display == "block") {
        langbtn.firstElementChild.style.display  = "none";
      } else {
        langbtn.firstElementChild.style.display = "block";
      }
  } else {
    langbtn.firstElementChild.style.display = "none";
  }
}