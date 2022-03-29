import {getRandomNumber} from './base.js';

const colorPallets =
[
  ["#488B49", "#4AAD52", "#1BCB2C", "#00790C"],
  ['#D72323', "orange", "#E0CA3C", "#000500", "#191102"],
  ['#0051A8', "#D9F0FF", "#284DF3", "#83C9F4", "#4879FF"],
  ['#00A83B', "#F0EC57", "#34190C"]
]

function getRandomColorPallet()
{
  return colorPallets[getRandomNumber(0,colorPallets.length-1)];
}

export {colorPallets, getRandomColorPallet}
