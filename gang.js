"use strict";
let Gang = module.exports;

let Names =  [
    "None",
    "Crips",
    "Bloods",
    "MS-13",
    "Pirus",
    "la eme",
    "Bikers"
];

let Commands = [
    "None",
    "/heal",
    "/fire",
    "",
    "/cuff",
    "/portable",
    "/license"
];
let Weapons = [
	[],
	[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
	[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
	[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
	[ //Police
        [],//Нулевой ранг
		[ //первый ранг
    		{weapon:0x678B81B1, ammo:1}, //дубинка
    		{weapon:0x3656C8C1, ammo:1} //шокер
		],
		[//второй
    		{weapon:0x5EF9FEC4, ammo:50} //combat pistol
		],
		[//третий
    		{weapon:0x1D073A89, ammo:30} //помповый дробовик
		],
		[ //четвёртый
    		{weapon:0x2BE6766B, ammo:100} //SMG
		],
		[ //пятый
    		{weapon:0xFDBC8A50, ammo:5}, //дымовая граната
    		{weapon:0xBFEFFF6D, ammo:90} //ak47
		],
		[ //шестой
    		{weapon:0xF44C59E3, ammo:1}, //парашют
    		{weapon:0x93E220BD, ammo:2}, //граната
    		{weapon:0xC0A3098D, ammo:20} //специальная винтовка
		],
		[ //седьмой
		    {weapon:0x24B17070, ammo:2}, //коктель молотова
            {weapon:0xA284510B, ammo:5} //гранатомёт
		],
		[ //восьмой
            {weapon:0xB1CA77B1, ammo:5} //рпг
		],
		[ //девятый
            {weapon:0xAB564B93, ammo:2} //с4
		],
		[
            {weapon:0x2C3731D9, ammo:2} //с4 липучка.
		],
		[ //десятый
            {weapon:0x05FC3C11, ammo:20} //снайперка
		],
		[ //одинадцатый
            {weapon:0x0C472FE2, ammo:10} //про снайперка
		]
	],
	[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
	[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
];

let homePositions = [
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0},
    {x:0.0,y:0.0,z:0.0}
];
var CashOut = [
        10,
        40,
        40,
        40,
        40,
        40,
        40
];
Gang.GetGangName = id => {
    return Names[id];
};

Gang.GetGangCommands = id => {
    return Commands[id];
};

Gang.Count = () => {
    return Names.length;
}

Gang.GetWeaponsByRank = (id, rank) => {
    let WeapsToGive = [];
    for(let i = 0; i <= rank; ++i) {
        for(let weap of Weapons[faction][i]) {
            WeapsToGive.push(weap);
        }
    }
    return WeapsToGive;
};
