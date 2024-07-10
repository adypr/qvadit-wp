import animationPiano from "./animationPiano.js";

const piano = document.getElementById('piano');

const wpExcerpt = 10;

export function generateKeys(sheets) {
  if (!piano) {
    console.log('Nothing piano');
    return;
  } 

  const initialKeys = ['white', 'black', 'white'];

  // Creating the first two keys
  initialKeys.forEach((keyColor, index) => {
      const key = document.createElement('li');
      key.classList.add('key', 'sheets__item');
      key.classList.add(keyColor);

      if (keyColor === 'white') {
          const link = document.createElement('a');
          link.classList.add('sheets__link');
          const title = document.createElement('h3');
          const excerpt = document.createElement('span');
          link.appendChild(title);
          link.appendChild(excerpt);
          key.appendChild(link);
      
          if (index === 2) {
          title.textContent = sheets[index - 1].title ;
          excerpt.textContent = changeExcerpt(sheets[index].excerpt, wpExcerpt);
          link.href = sheets[index - 1].link;
          } 
          else {
          title.textContent = sheets[index].title;
          excerpt.textContent = changeExcerpt(sheets[index].excerpt, wpExcerpt);
          link.href = sheets[index].link;
          } 
      }

      piano.appendChild(key);
  });

  // Create the rest of the keys, if there are sheets to display
  if (sheets.length > 2) {
      let points = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
      let pointsIndex = 0;
      let songIndex = 2;

      while (songIndex < sheets.length) {
          const key = document.createElement('li');
          key.classList.add('key', 'sheets__item');
          key.classList.add(points[pointsIndex % points.length]);

          if (points[pointsIndex % points.length] === 'white') {
              const link = document.createElement('a');
              link.classList.add('sheets__link');
              const title = document.createElement('h3');
              const excerpt = document.createElement('span');
              link.appendChild(title);
              link.appendChild(excerpt);
              key.appendChild(link);
              title.textContent = sheets[songIndex].title;
              excerpt.textContent = changeExcerpt(sheets[songIndex].excerpt, wpExcerpt);
              link.href = sheets[songIndex].link;
              songIndex++;
          }

          piano.appendChild(key);
          pointsIndex++;
      }
  }
}

const changeExcerpt = (input, maxLength) => {
  let noTags = input.replace(/<\/?p>/g, '');

  let decodedString = decodeEntities(noTags);

  let noSpecialChars = decodedString.replace(/[^\w\s\[\]]/g, '');

  let truncatedString = noSpecialChars.slice(0, maxLength);

  if (truncatedString.length < noSpecialChars.length) {
      truncatedString += '...';
  }

  return truncatedString;
}

function decodeEntities(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

animationPiano(piano);