CREATE TABLE IF NOT EXISTS `service` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  image_url varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `category` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  service_id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255),
  image_url varchar(255),
  FOREIGN KEY (service_id) REFERENCES service(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `product` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  category_id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255),
  web_url varchar(255),
  example_url varchar(255),
  FOREIGN KEY (category_id) REFERENCES category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `service` (`id`, `title`, `description`, `image_url`) VALUES (1, 'AI', 'AI', NULL), (2, 'robotics', 'robotics', NULL);

INSERT INTO `category` (`id`, `service_id`, `title`, `description`, `image_url`) VALUES
(1, '1', 'computer vision', 'computer vision', NULL),
(2, '1', 'NLP', 'NLP', NULL),
(3, '1', 'face recognition', 'face recognition', NULL)

INSERT INTO `product` (`id`, `category_id`, `title`, `description`, `web_url`) VALUES (1, '1', 'kid colloring', 'kid colloring', 'http://85.133.185.78:8181/');
