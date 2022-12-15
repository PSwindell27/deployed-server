DROP TABLE IF EXISTS movie();

CREATE TABLE movie(
    id SERIAL,
    title TEXT,
    year INTEGER,
    genre TEXT, 
    star TEXT
);

INSERT INTO movie (title, year, genre, star) VALUES ('Gladiator', 2000, 'Action', 'Russell Crow');
INSERT INTO movie (title, year, genre, star) VALUES ('Troy', 2004, 'Action', 'Brad Pitt');
INSERT INTO movie (title, year, genre, star) VALUES ('Equilibrium', 2002, 'Action', 'Christian Bale');
INSERT INTO movie (title, year, genre, star) VALUES ('Shooter', 2007, 'Action', 'Mark Wahklberg');


