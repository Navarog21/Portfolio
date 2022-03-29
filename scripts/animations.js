import {getRandomNumber} from './base.js';

let index = 124;

function scaleCube(cubes)
{
  cubes.forEach((cube) =>
  {
    if (cube.grow === false)
    {
      cube.scale.subScalar(0.019);
      if (cube.scale.x <= 0.1)
      {
        cube.grow = true;
      }
    }
    if (cube.grow === true)
    {
      cube.scale.addScalar(0.009);
      if (cube.scale.x >= 0.9)
      {
        cube.grow = false;
      }
    }
  });
}

function randomAnimation(coordonates)
{
  let randomNumber = getRandomNumber(0, coordonates.length-1);
  let clone = coordonates[randomNumber];
  coordonates.splice(randomNumber, 1);
  return clone;
}

function rightToLeftAnimation(coordonates)
{
  let clone = coordonates[index];
  index--;
  return clone;
}

function oddAndEvenAnimation(coordonates)
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

function vortexAnimation()
{
  let cubeBehind = CUBES_ARRAY.filter(cube => cube.position.z == -5 && cube.position.y == -5)
}

export {rightToLeftAnimation, oddAndEvenAnimation, randomAnimation, scaleCube};
let ANIMATIONS_LIST = [rightToLeftAnimation, oddAndEvenAnimation, randomAnimation];
