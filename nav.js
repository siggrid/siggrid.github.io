var navButtons = Array.prototype.slice.call(
  document.querySelectorAll(".navigation__btn")
);
var navDropdowns = Array.prototype.slice.call(
  document.querySelectorAll(".navigation__btn + .dropdown-list")
);
var dropdownContainers = Array.prototype.slice.call(
  document.querySelectorAll(".navigation__item")
);

function openDropdown(button) {
  var navEl = button.nextElementSibling;

  if (navEl) {
    button.setAttribute("aria-expanded", "true");
    navEl.parentElement.classList.add("is-active");
  }
}

function closeDropdown(button) {
  var navEl = button.nextElementSibling;

  if (navEl) {
    button.setAttribute("aria-expanded", "false");
    navEl.parentElement.classList.remove("is-active");
  }
}

function closeAllDropdowns() {
  navButtons.forEach(function (button) {
    closeDropdown(button);
  });
}

function toggleButtonState(button) {
  var isExpanded = button.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    closeDropdown(button);
  } else {
    closeAllDropdowns();
    openDropdown(button);
  }
}

// event handlers
function handleButtonClick(event) {
  toggleButtonState(event.currentTarget);
}

function handleButtonKeyDown(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeDropdown(this);
  }
}

function handleNavKeyDown(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    button = this.previousElementSibling;
    closeDropdown(button);
    button.focus();
  }
}

function handleNavFocusOut(event) {
  var navContainsFocus = this.contains(event.relatedTarget);
  if (!navContainsFocus) {
    var button = this.querySelector(".navigation__btn");
    if (button) {
      closeDropdown(button);
    }
  }
}

// event listeners
navButtons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
  button.addEventListener("keydown", handleButtonKeyDown);
});

navDropdowns.forEach(function (navDropdown) {
  navDropdown.addEventListener("keydown", handleNavKeyDown);
});

dropdownContainers.forEach(function (dropdownContainer) {
  dropdownContainer.addEventListener("focusout", handleNavFocusOut);
});
