"use strict";
let Fraction = module.exports;
let fName =  {  
  0:"None",
  1:"Health",
  2:"FireMan",
  3:"Ministry",
  4:"Police",
  5:"Hitman Agency"
};
let fDiscription = {
  0:"None",
  1:"/health [playerid], /cuff [playerid]",
  2:"/fire [playerid], /cuff [playerid]",
  3:"/cuff [playerid]",
  4:"/tazer [playerid], /cuff [playerid]",
  5:"/portable"
};
Fraction.GetNameFraction = (fId) => {
  return fName[fId];
};
Fraction.GetDiscriptionFraction = (fId) => {
  return fDiscription[fId];
};

