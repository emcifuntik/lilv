CREATE TABLE `factions` (
  `faction_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `faction_name` varchar(32) NOT NULL DEFAULT 'undefined',
  `faction_leader` int(8) NOT NULL DEFAULT '0',
  `faction_money` int(16) NOT NULL DEFAULT '0',
  PRIMARY KEY (`faction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
