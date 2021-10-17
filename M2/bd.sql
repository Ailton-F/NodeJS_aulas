CREATE TABLE usuarios(
    nome varchar(30),
    email varchar(100),
    idade int
);


insert into usuarios values
  ('Ailton', 'ailtonxdz@gmail.com', 17),
  ('Bianca', 'biancabp@gmail.com', 16),
  ('Ysla', 'YslaDoGrau@gmail.com', 16),
  ('Marta', 'matinhachan123@gmail.com', 18)
;

delete from usuarios where nome = 'Bianca'

update usuarios set email = 'martinhachan@gmail.com' where nome = 'Marta';
