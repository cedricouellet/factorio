const defaultLanguage = "en";

/**
 * Sets the language
 * @param {String} lang The language to set
 */
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
}

/**
 * Gets the next language
 * @returns {String} The resulting string
 */
function getNextLanguage() {
  const lang = getLanguage();
  if (lang.toLowerCase() == "en") {
    return "fr";
  } else {
    return "en";
  }
}

/**
 * Gets the language
 * @returns {String} The resulting string
 */
function getLanguage() {
  const lang = localStorage.getItem("lang");
  if (!lang) {
    localStorage.setItem("lang", defaultLanguage);
  }

  return lang || defaultLanguage;
}

export { setLanguage, getLanguage, getNextLanguage, defaultLanguage };
export default { setLanguage, getLanguage, getNextLanguage, defaultLanguage };
