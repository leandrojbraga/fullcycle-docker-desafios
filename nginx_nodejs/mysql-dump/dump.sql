use nodedb;

CREATE TABLE IF NOT EXISTS person (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);