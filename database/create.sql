CREATE TABLE Morality (
	code	char(3) PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);
CREATE TABLE Attitude (
	code	char(3) PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);
CREATE TABLE Sense (
	code	char(3) PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);
CREATE TABLE Size_Category (
	code	char(3) PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);
CREATE TABLE Type_Category (
	code	char(3) PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);
CREATE TABLE Type_Tag (
	id	bigint PRIMARY KEY,
	name	varchar(100) NOT NULL,
	description varchar(2000)
);

CREATE TABLE Creature (
	id	bigserial PRIMARY KEY,
	frName	varchar(100) NOT NULL UNIQUE,
	enName	varchar(100) UNIQUE,
	caMin	integer,
	caMax 	integer,
	pvMin	integer,
	pvMax	integer,
	morality_code char(3) REFERENCES Morality(code),
	attitude_code char(3) REFERENCES Attitude(code),
	size_code char(3) REFERENCES Size_Category(code)
);

CREATE TABLE Creature_Types (
	creature_id bigint NOT NULL REFERENCES Creature(id),
	type_code char(3) NOT NULL REFERENCES Type_Category(code),
	PRIMARY KEY(creature_id, type_code)
);
CREATE TABLE Creature_Senses (
	creature_id bigint NOT NULL REFERENCES Creature(id),
	sense_code char(3) NOT NULL REFERENCES Sense(code),
	PRIMARY KEY(creature_id, sense_code)
);