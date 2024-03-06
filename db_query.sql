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


CREATE TABLE IF NOT EXISTS `article` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(2550),
  author varchar(255),
  source_url varchar(255),
  image_url varchar(255),
  show_flag TINYINT NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `service` (`id`, `title`, `description`, `image_url`) VALUES (1, 'AI', 'AI', NULL), (2, 'robotics', 'robotics', NULL);

INSERT INTO `category` (`id`, `service_id`, `title`, `description`, `image_url`) VALUES
(1, '1', 'computer vision', 'computer vision', NULL),
(2, '1', 'NLP', 'NLP', NULL),
(3, '1', 'face recognition', 'face recognition', NULL)

INSERT INTO `product` (`id`, `category_id`, `title`, `description`, `web_url`) VALUES (1, '1', 'kid colloring', 'kid colloring', 'http://85.133.185.78:8181/');

INSERT INTO `article` (`id`, `title`, `description`, `author`, `source_url`, `image_url`, `show_flag`) VALUES (NULL, 'Fast COVID-19 versus H1N1 screening using optimized parallel inception', 'COVID-19 and swine-origin influenza A (H1N1) are both pandemics that sparked significant concern worldwide. Since these two diseases have common symptoms, a fast COVID-19 versus H1N1 screening helps better manage patients at healthcare facilities. We present a novel deep model, called Optimized Parallel Inception, for fast screening of COVID-19.', 'Alireza Tavakolian et al.', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9119711/', 'images/gr11_lrg.jpg', '1');
INSERT INTO `article` (`id`, `title`, `description`, `author`, `source_url`, `image_url`, `show_flag`) VALUES (NULL, 'Source code for optimized parallel inception: A fast COVID-19 screening software', 'COVID-19 and swine-origin influenza A (H1N1) are both pandemics that sparked significant concern worldwide. These two viruses have the same symptoms and occur at a collision timeline. Optimized Parallel Inception (OPI) presents a new strategy to screen the COVID-19 from H1N1 with use of only symptoms.', 'Alireza Tavakolian et al.', 'https://www.sciencedirect.com/science/article/pii/S2665963822000616', 'images/pic3.png', '1');
INSERT INTO `article` (`id`, `title`, `description`, `author`, `source_url`, `image_url`, `show_flag`) VALUES (NULL, 'Hospital Readmission and Length of Stay Prediction Using an Optimized Hybrid Deep Model', 'Hospital readmission and length-of-stay predictions provide information on how to manage hospital bed capacity and the number of required staff, especially during pandemics. We present a hybrid deep model called the Genetic Algorithm-Optimized Convolutional Neural Network (GAOCNN).', 'Alireza Tavakolian et al.', 'https://www.mdpi.com/1999-5903/15/9/304', 'images/pic2.png', '1');
