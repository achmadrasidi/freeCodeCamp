const americanOnly = require("./american-only.js");
const ameToBritSpell = require("./american-to-british-spelling.js");
const ameToBritTitl = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const revDict = (obj) => Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [v]: k })));

const replaceAll = (before, after) => {
  const reg = new RegExp(Object.keys(after).join("|"), "gi");
  return before.replace(reg, (match) => after[match.toLowerCase()]);
};

const replaceWithHighlight = (before, after) => {
  const reg = new RegExp(Object.keys(after).join("|"), "gi");
  return before.replace(reg, (match) => {
    return `<span class="highlight">${after[match.toLowerCase()]}</span>`;
  });
};

const translate = (text, dict, titles, timeRegex, locale) => {
  const newText = text.toLowerCase();
  const searchMap = {};

  Object.entries(titles).map(([prop, val]) => {
    if (newText.includes(prop)) {
      searchMap[prop] = val.charAt(0).toUpperCase() + val.slice(1);
    }
  });

  const filterSpaces = Object.fromEntries(Object.entries(dict).filter(([prop, val]) => prop.includes(" ")));

  Object.entries(filterSpaces).map(([prop, val]) => {
    if (newText.includes(prop)) {
      return (searchMap[prop] = val);
    }
  });

  newText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).filter((w) => {
    if (dict[w]) return (searchMap[w] = dict[w]);
  });

  const searchTimes = newText.match(timeRegex);

  if (searchTimes) {
    searchTimes.map((v) => {
      if (locale === "British") {
        return (searchMap[v] = v.replace(":", "."));
      }
      return (searchMap[v] = v.replace(".", ":"));
    });
  }

  if (Object.keys(searchMap).length === 0) return null;

  const translate = replaceAll(text, searchMap);

  const translateWithHighlight = replaceWithHighlight(text, searchMap);

  return [translate, translateWithHighlight];
};

class Translator {
  translateAmerican(text) {
    const dict = { ...americanOnly, ...ameToBritSpell };
    const titles = ameToBritTitl;
    const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;
    const translated = translate(text, dict, titles, timeRegex, "British");

    if (!translated) {
      return text;
    }
    return translated[0];
  }

  translateAmericanHl(text) {
    const dict = { ...americanOnly, ...ameToBritSpell };
    const titles = ameToBritTitl;
    const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;
    const translated = translate(text, dict, titles, timeRegex, "British");

    if (!translated) {
      return text;
    }
    return translated[1];
  }

  translateBritish(text) {
    const dict = { ...britishOnly, ...revDict(ameToBritSpell) };
    const titles = revDict(ameToBritTitl);
    const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;
    const translated = translate(text, dict, titles, timeRegex, "American");

    if (!translated) {
      return text;
    }
    return translated[0];
  }

  translateBritishHl(text) {
    const dict = { ...britishOnly, ...revDict(ameToBritSpell) };
    const titles = revDict(ameToBritTitl);
    const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;
    const translated = translate(text, dict, titles, timeRegex, "American");

    if (!translated) {
      return text;
    }
    return translated[1];
  }
}

module.exports = Translator;
