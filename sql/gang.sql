CREATE TABLE `gangs` (
  `gangs_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `gangs_name` varchar(32) NOT NULL DEFAULT 'undefined',
  `gangs_leader` int(8) NOT NULL DEFAULT '0',
  `gangs_money` int(16) NOT NULL DEFAULT '0',
  `gangs_materials` int(16) NOT NULL DEFAULT '0',
  `gangs_car` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`faction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
