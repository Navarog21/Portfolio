function getRandomNumber(min, max)
{
  const number = Math.round(Math.random() * (max - min) + min);
  return number;
}

function getRandomBoolean()
{
  let boolean;
  let digit = getRandomNumber(0, 1);
  if (digit == 0) boolean = false;
  else boolean = true;
  return boolean;
}
