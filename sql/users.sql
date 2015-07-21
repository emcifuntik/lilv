CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(32) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `user_steam` varchar(64) DEFAULT NULL,
  `user_pos_x` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_pos_y` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_pos_z` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_rot_x` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_rot_y` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_rot_z` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_admin` int(8) NOT NULL DEFAULT '0',
  `user_level` int(8) NOT NULL DEFAULT '1',
  `user_respect` int(8) NOT NULL DEFAULT '0',
  `user_health` float(8,4) NOT NULL DEFAULT '100.0000',
  `user_armor` float(8,4) NOT NULL DEFAULT '0.0000',
  `user_bank` int(16) unsigned NOT NULL DEFAULT '0',
  `user_cash` int(16) unsigned NOT NULL DEFAULT '0',
  `user_stamina` int(8) NOT NULL DEFAULT '0',
  `user_strength` int(8) NOT NULL DEFAULT '0',
  `user_lung_capacity` int(8) NOT NULL DEFAULT '0',
  `user_wheelie_ability` int(8) NOT NULL DEFAULT '0',
  `user_flying_ability` int(8) NOT NULL DEFAULT '0',
  `user_shooting_ability` int(8) NOT NULL DEFAULT '0',
  `user_stealth_ability` int(8) NOT NULL DEFAULT '0',
  `user_faction` int(8) NOT NULL DEFAULT '0',
  `user_rank` int(8) NOT NULL DEFAULT '0',
  `user_model` bigint(16) NOT NULL DEFAULT '0',
  `user_last_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_ip` varchar(32) NOT NULL DEFAULT '0.0.0.0',
  `user_banned` bigint(32) NOT NULL DEFAULT '0',
  `user_muted` bigint(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;