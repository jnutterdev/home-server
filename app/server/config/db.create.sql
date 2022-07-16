
CREATE DATABASE IF NOT EXISTS homeserver;

CREATE TABLE IF NOT EXISTS `users` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    username varchar(50) NOT NULL,
    active BOOLEAN DEFAULT true
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  