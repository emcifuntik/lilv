CREATE TABLE `businesses` (
  `business_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `business_name` varchar(64) NOT NULL DEFAULT 'No name',
  `business_price` int(16) NOT NULL DEFAULT '0',
  `business_owner` int(16) NOT NULL DEFAULT '0',
  `business_money` int(16) NOT NULL DEFAULT '100000',
  `business_materials` int(16) NOT NULL DEFAULT '1000',
  `business_last_heist` bigint(32) NOT NULL DEFAULT '0',
  `business_materail_price` int(16) NOT NULL DEFAULT '100',
  PRIMARY KEY (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;