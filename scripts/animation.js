import {randomNumber} from './base.js';

function randomAnimation(coordonates)
{
  console.log(coordonates);
  let randomNumber = getRandomNumber(0, coordonates.length-1);
  console.log(randomNumber);
  let clone = coordonates[randomNumber];
  coordonates.splice(randomNumber, 1);
  return clone;
}

function rightToLeftAnimation(coordonates, i)
{
  console.log(i);
  let clone = coordonates[i];
  i--;
  return clone;
}

function oddAndEvenAnimation(coordonates, index)
{
  let clone;
  if (index % 2 == 0)
  {
    if (index == 0)
    {
      clone = coordonates[index];
      index = 1;
      return clone;
    }
    else
    {
      clone = coordonates[index];
      index-=2;
      return clone;
    }
  }

  if (index%2 != 0 && index != 0)
  {
    clone = coordonates[index];
    index += 2;
    return clone;
  }
}

let ANIMATIONS_LIST = [rightToLeftAnimation, oddAndEvenAnimation, randomAnimation];

export default ANIMATIONS_LIST;
