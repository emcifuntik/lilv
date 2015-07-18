[33mcommit 9510932eb503e61620faa32d7b29dea1c7eccee9[m
Author: scropions <scropions121@mail.ru>
Date:   Sat Jul 18 15:20:32 2015 +0300

    Проверка слияния

[1mdiff --git a/fractions.js b/fractions.js[m
[1mindex 419876b..2022366 100644[m
[1m--- a/fractions.js[m
[1m+++ b/fractions.js[m
[36m@@ -1,6 +1,6 @@[m
 "use strict";[m
 let Fraction = module.exports;[m
[31m-let fName =  {  [m
[32m+[m[32mlet fName =  {[m
   0:"None",[m
   1:"Health",[m
   2:"FireMan",[m
[36m@@ -14,12 +14,13 @@[m [mlet fDiscription = {[m
   2:"/fire [playerid], /cuff [playerid]",[m
   3:"/cuff [playerid]",[m
   4:"/tazer [playerid], /cuff [playerid]",[m
[31m-  5:"/portable"[m
[32m+[m[32m  5:"/portable",[m
[32m+[m[32m  6:"/test"[m
 };[m
[32m+[m
 Fraction.GetNameFraction = (fId) => {[m
   return fName[fId];[m
 };[m
 Fraction.GetDiscriptionFraction = (fId) => {[m
   return fDiscription[fId];[m
 };[m
[31m-[m
