const latestYear = 2020;

const galleryWidth = document.getElementById("gallery-container").offsetWidth;
const fontHeight = document.getElementById("y2018-h").offsetHeight;
const largeFontHeight = document.getElementById("y2020-h").offsetHeight;
const curYearWidth = galleryWidth * 0.65 - fontHeight * 3;

const getYearPosition = (year, curYear) => {
  const marginLeft = (galleryWidth * (1 - 0.65)) / 2;
  yearIndex = year - 2017;
  return year <= curYear
    ? yearIndex * fontHeight + marginLeft
    : galleryWidth * 0.65 - (latestYear - year + 1) * fontHeight + marginLeft;
};

const formatYears = (year) => {
  const yearIndex = year - 2017;
  const years = document.querySelectorAll(".year-container");
  years.forEach((y, i) => {
    y.style.transition = `left 0.3s ease-in-out`;
    y.style.left = `${getYearPosition(2017 + i, year)}`;

    if (i === yearIndex) {
      y.style.width = curYearWidth;
      y.classList.add("selected-year-container");
      document.querySelectorAll(`.dots-container.y${year}`)[0].style.left = `${
        (curYearWidth - largeFontHeight) / 2 + largeFontHeight
      }px`;
    } else {
      y.style.width = fontHeight;
      y.classList.remove("selected-year-container");
    }
  });
};

const colorDot = (year, dot) => {
  document
    .querySelectorAll(".year-dot")
    .forEach((d) => d.classList.remove("selected-year-dot"));
  if (document.querySelectorAll(`.dots-container.y${year}`)[0].children.length > 0){
    document.getElementById(`y${year}-${dot}`).classList.add("selected-year-dot");
  }
};

const selectImage = (year, dot) => {
  document.querySelectorAll(".gallery-image").forEach(i => i.classList.remove("selected-image"))
  document.getElementById(`y${year}-p${dot}`).classList.add("selected-image")
}

const fadeText = (obj, newText) => {
  if (newText === obj.innerText) return;
  obj.classList.add('fade-out-text');
  setTimeout(() => {
    obj.innerText = newText;
    obj.classList.remove('fade-out-text');
  }, 250)
}

const selectYearDot = (year, dot) => {
  formatYears(year);
  colorDot(year, dot);
  selectImage(year, dot)
  fadeText(document.getElementById("description-header"), descriptions[`y${year}-p${dot}`].header)
  fadeText(document.getElementById("description-body"), descriptions[`y${year}-p${dot}`].body)
};



const descriptions = {
  "y2017-p1": {
    header: 'UWC ISAK JAPAN', 
    body: 'Graduated from UWC ISAK Japan with an International Baccalaureate Diploma.'
  },
  "y2017-p2": {
    header: 'VANDERBILT UNIVERSITY', 
    body: 'Enrolled in Vanderbilt Univerity and flew to Nashville, Tennessee.'
  },
  "y2018-p1": {
    header: 'ALUMNI ASSOCIATION', 
    body: 'Served as the Class of 2017 Representative in UWC ISAK Japan\'s Alumni Association'
  },
  "y2019-p1": {
    header: 'RUBINOV LAB', 
    body: 'Worked as a research assistant in a Neuroscience lab. Focused on using generative adversarial networks (GANs) to generate fMRI data.'
  },
  "y2019-p2": {
    header: 'ALLIANCE BERNSTEIN', 
    body: 'Worked as a software developer intern and developed an internal web app using Angular and .NET Core.'
  },
  
  "y2020-p1": {
    header: 'VANDERBILT UNIVERSITY', 
    body: 'Graduated from Vanderbilt University one year ahead of schedule as a double-major in Computer Science and Applied Math.'
  },
}








// Initial State
selectYearDot(2020, 1)