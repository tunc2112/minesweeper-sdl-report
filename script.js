function getStyle(el, styleProp) {
  var y;

  if (el.currentStyle) {
    y = el.currentStyle[styleProp];
  } else if (window.getComputedStyle) {
    y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  }

  return y;
}

function toggle() {
  var el = this.expandable_content;
  var mark = this.expandable_marker;

  if (el.style.display === "block") {
    el.style.display = "none";
    mark.textContent = "[+]";
  } else {
    el.style.display = "block";
    mark.textContent = "[-]";
  }
}

function initExpandables() {
  var elements = document.querySelectorAll(".expandable");

  for (var i = 0, len = elements.length; i < len; i++) {
    var el = elements[i];
    var clickable = el.querySelector("span");
    var marker = clickable.querySelector(".marker");
    var content = el.querySelector(".content");
    var width = clickable.clientWidth - parseInt(getStyle(content, "padding-left")) - parseInt(getStyle(content, "padding-right"));
    content.style.width = width + "px";
    clickable.expandable_content = content;
    clickable.expandable_marker = marker;
    clickable.addEventListener("click", toggle);
  }
}

function toggleDisplay(id) {
  var elements = document.querySelectorAll("." + id);

  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].classList.toggle("d-none");
  }
}

function toggleAll() {
  var elements = document.querySelectorAll("input");

  // starting from 1 since 0 is the "toggle all" input
  for (var i = 1, len = elements.length; i < len; i++) {
    var el = elements[i];

    if (el.checked) {
      el.checked = false;
    } else {
      el.checked = true;
    }

    toggleDisplay(el.id);
  }
}
window.addEventListener("load", initExpandables);