"use strict";

let Colors = module.exports;

Colors = {
    All : {
        Aero: new RGB(124, 185, 232),
        Almond: new RGB(239, 222, 205),
        Amazon: new RGB(59, 122, 87),
        Amber: new RGB(255, 191, 0),
        Aqua: new RGB(0, 255, 255),
        Auburn: new RGB(165, 42, 42),
        Azure: new RGB(0, 127, 255),
        Bazaar: new RGB(152, 119, 123),
        Beaver: new RGB(159, 129, 112),
        Beige: new RGB(245, 245, 220),
        Bisque: new RGB(255, 228, 196),
        Bistre: new RGB(61, 43, 31),
        Black: new RGB(0, 0, 0),
        Blond: new RGB(250, 240, 190),
        Blue: new RGB(0, 0, 255),
        Blush: new RGB(222, 93, 131),
        Bole: new RGB(121, 68, 59),
        Bone: new RGB(227, 218, 201),
        Brass: new RGB(181, 166, 66),
        Bronze: new RGB(205, 127, 50),
        Buff: new RGB(240, 220, 130),
        Cadet: new RGB(83, 104, 114),
        Camel: new RGB(193, 154, 107),
        Capri: new RGB(0, 191, 255),
        Ceil: new RGB(146, 161, 207),
        Cerise: new RGB(222, 49, 99),
        CG_Red: new RGB(224, 60, 49),
        Cherry: new RGB(222, 49, 99),
        Citron: new RGB(159, 169, 31),
        Claret: new RGB(127, 23, 52),
        Coffee: new RGB(111, 78, 55),
        Copper: new RGB(184, 115, 51),
        Coral: new RGB(255, 127, 80),
        Corn: new RGB(251, 236, 93),
        Cream: new RGB(255, 253, 208),
        Cyan: new RGB(0, 255, 255),
        Deer: new RGB(186, 135, 89),
        Denim: new RGB(21, 96, 189),
        Desert: new RGB(193, 154, 107),
        Desire: new RGB(234, 60, 83),
        Dirt: new RGB(155, 118, 83),
        Drab: new RGB(150, 113, 23),
        Ebony: new RGB(85, 93, 80),
        Ecru: new RGB(194, 178, 128),
        Fallow: new RGB(193, 154, 107),
        Fawn: new RGB(229, 170, 112),
        Flame: new RGB(226, 88, 34),
        Flax: new RGB(238, 220, 130),
        Flirt: new RGB(162, 0, 109),
        Folly: new RGB(255, 0, 79),
        Ginger: new RGB(176, 101, 0),
        Grape: new RGB(111, 45, 168),
        Gray: new RGB(128, 128, 128),
        Grullo: new RGB(169, 154, 134),
        Indigo: new RGB(75, 0, 130),
        Iris: new RGB(90, 79, 207),
        Ivory: new RGB(255, 255, 240),
        Jade: new RGB(0, 168, 107),
        Jasper: new RGB(215, 59, 62),
        Jet: new RGB(52, 52, 52),
        Keppel: new RGB(58, 176, 158),
        Kobe: new RGB(136, 45, 23),
        Kobi: new RGB(231, 159, 196),
        Lava: new RGB(207, 16, 32),
        Lemon: new RGB(255, 247, 0),
        Lilac: new RGB(200, 162, 200),
        Linen: new RGB(250, 240, 230),
        Lion: new RGB(193, 154, 107),
        Liver: new RGB(103, 76, 71),
        Livid: new RGB(102, 153, 204),
        Lumber: new RGB(255, 228, 205),
        Lust: new RGB(230, 32, 32),
        Maize: new RGB(251, 236, 93),
        Mantis: new RGB(116, 195, 101),
        Mauve: new RGB(224, 176, 255),
        Melon: new RGB(253, 188, 180),
        Ming: new RGB(54, 116, 125),
        Mint: new RGB(62, 180, 137),
        Navy: new RGB(0, 0, 128),
        Nyanza: new RGB(233, 255, 219),
        Ochre: new RGB(204, 119, 34),
        Olive: new RGB(128, 128, 0),
        Onyx: new RGB(53, 56, 57),
        Orchid: new RGB(218, 112, 214),
        Peach: new RGB(255, 229, 180),
        Peach: new RGB(255, 203, 164),
        Pear: new RGB(209, 226, 49),
        Pearl: new RGB(234, 224, 200),
        Peru: new RGB(205, 133, 63),
        Phlox: new RGB(223, 0, 255),
        Pink: new RGB(255, 192, 203),
        Plum: new RGB(142, 69, 133),
        Prune: new RGB(112, 28, 28),
        Puce: new RGB(204, 136, 153),
        Quartz: new RGB(81, 72, 79),
        Rajah: new RGB(251, 171, 96),
        Red: new RGB(255, 0, 0),
        Rhythm: new RGB(119, 118, 150),
        Rose: new RGB(255, 0, 127),
        Ruber: new RGB(206, 70, 118),
        Ruby: new RGB(224, 17, 95),
        Ruddy: new RGB(255, 0, 40),
        Rufous: new RGB(168, 28, 7),
        Russet: new RGB(128, 70, 27),
        Rust: new RGB(183, 65, 14),
        Sage: new RGB(188, 184, 138),
        Salmon: new RGB(250, 128, 114),
        Sand: new RGB(194, 178, 128),
        Sepia: new RGB(112, 66, 20),
        Shadow: new RGB(138, 121, 93),
        Sienna: new RGB(136, 45, 23),
        Silver: new RGB(192, 192, 192),
        Smoke: new RGB(115, 130, 118),
        Snow: new RGB(255, 250, 250),
        Soap: new RGB(206, 200, 239),
        Stizza: new RGB(153, 0, 0),
        Straw: new RGB(228, 217, 111),
        Sunray: new RGB(227, 171, 87),
        Sunset: new RGB(250, 214, 165),
        Tan: new RGB(210, 180, 140),
        Taupe: new RGB(72, 60, 50),
        Teal: new RGB(0, 128, 128),
        Tenne: new RGB(205, 87, 0),
        Tomato: new RGB(255, 99, 71),
        Topaz: new RGB(255, 200, 124),
        Tulip: new RGB(255, 135, 141),
        Tuscan: new RGB(250, 214, 165),
        UA_Red: new RGB(217, 0, 76),
        Ube: new RGB(136, 120, 195),
        Umber: new RGB(99, 81, 71),
        Violet: new RGB(143, 0, 255),
        Volt: new RGB(206, 255, 0),
        Wenge: new RGB(100, 84, 82),
        Wheat: new RGB(245, 222, 179),
        White: new RGB(255, 255, 255),
        Wine: new RGB(114, 47, 55),
        Xanadu: new RGB(115, 134, 120),
        Yellow: new RGB(255, 255, 0),
        Zaffre: new RGB(0, 20, 168),
        Zomp: new RGB(57, 167, 142)
    }
};

Colors.Admin = Colors.All.Rufous;
Colors.Broadcast = Colors.All.Lust;
Colors.Notice = Colors.All.Silver;
Colors.Error = Colors.All.Red;
Colors.Warning = Colors.All.Amber;
Colors.Propose = Colors.All.Aero;
Colors.Success = Colors.All.Amazon;
Colors.Fail = Colors.All.Auburn;
Colors.Info = Colors.All.Indigo;
Colors.Welcome = Colors.All.Ceil;
