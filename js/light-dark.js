/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

/**
* Utility function to update the button with sun and moon icons and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
  const sunIconSrc = '/svgs/sun.svg';
  const moonIconSrc = '/svgs/moon.svg';

  // Get the existing img element inside the button
  const imgElement = buttonEl.querySelector('img');

  // Set the src attribute based on the current theme
  imgElement.src = isDark ? sunIconSrc : moonIconSrc;

  // Set the alt attribute based on the current theme
  const altText = isDark ? "A sun icon that changes this site from a dark to a light theme. " : "A moon icon that changes this site from a light to a dark theme.";
  imgElement.alt = altText;

  // Update aria-label
  const newAriaLabel = isDark ? "Switch to Light Theme" : "Switch to Dark Theme";
  buttonEl.setAttribute("aria-label", newAriaLabel);
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
* On page load:
*/

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });
  currentThemeSetting = newTheme;
});

// Show the toogle button only if JavaScript is enabled
document.getElementById('theme-toggle').style.display = 'block';