CREATE TABLE `Companies` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50)
);

CREATE TABLE `Users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(256) NOT NULL,
  `companyid` INT,
  `status` VARCHAR(50)
);

CREATE TABLE `Teams` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50)
);

CREATE TABLE `Projects` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50)
);

CREATE TABLE `TeamUsers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `teamid` INT NOT NULL,
  `userid` INT NOT NULL
);

CREATE TABLE `Tasks` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `projectid` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50),
  `start_time` DATETIME,
  `end_time` DATETIME
);

CREATE TABLE `TaskAssignments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `taskid` INT NOT NULL,
  `teamid` INT NOT NULL
);

CREATE TABLE `TeamProjects` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `teamid` INT NOT NULL,
  `projectid` INT NOT NULL
);

CREATE TABLE `Managers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `companyid` INT NOT NULL,
  `status` VARCHAR(50)
);

CREATE TABLE `TaskHistory` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `taskid` INT NOT NULL,
  `userid` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME
);

ALTER TABLE `Users` ADD FOREIGN KEY (`companyid`) REFERENCES `Companies` (`id`);

ALTER TABLE `TeamUsers` ADD FOREIGN KEY (`teamid`) REFERENCES `Teams` (`id`);

ALTER TABLE `TeamUsers` ADD FOREIGN KEY (`userid`) REFERENCES `Users` (`id`);

ALTER TABLE `Tasks` ADD FOREIGN KEY (`projectid`) REFERENCES `Projects` (`id`);

ALTER TABLE `TaskAssignments` ADD FOREIGN KEY (`taskid`) REFERENCES `Tasks` (`id`);

ALTER TABLE `TaskAssignments` ADD FOREIGN KEY (`teamid`) REFERENCES `Teams` (`id`);

ALTER TABLE `TeamProjects` ADD FOREIGN KEY (`teamid`) REFERENCES `Teams` (`id`);

ALTER TABLE `TeamProjects` ADD FOREIGN KEY (`projectid`) REFERENCES `Projects` (`id`);

ALTER TABLE `Managers` ADD FOREIGN KEY (`userid`) REFERENCES `Users` (`id`);

ALTER TABLE `Managers` ADD FOREIGN KEY (`companyid`) REFERENCES `Companies` (`id`);

ALTER TABLE `TaskHistory` ADD FOREIGN KEY (`taskid`) REFERENCES `Tasks` (`id`);

ALTER TABLE `TaskHistory` ADD FOREIGN KEY (`userid`) REFERENCES `Users` (`id`);
