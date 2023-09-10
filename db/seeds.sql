insert into department (name)
values ("Engineering"),
("Product Management"),
("Quality Assurance"),
("HR"),
("Sales"),
("Business Technology"),
("Finance"),
("Office of the CEO");

insert into roles (title, salary, department_id)
values ("CEO", 500000, 8),
("VP of Engineering", 400000, 1),
("VP Of Product Management", 400000, 2),
("Director of Quality Assurance", 300000, 3),
("VP of Talent", 250000, 4),
("VP of Sales", 250000, 5),
("CIO", 350000, 6),
("CFO", 400000, 7),
("Software Engineer", 200000, 1),
("Product Manager", 200000, 2);

insert into employee (first_name, last_name, role_id, manager_id)
values 
("Brad", "Pitt", 1, NULL),
("Angela", "Brown", 2, 1),
("David", "Smith", 3, 1),
("Ross", "Geller", 4, 1),
("Amy", "Wilson", 5, 1),
("Doug", "Robinson", 6, 1),
("Sherry", "Rhodes", 7, 1),
("Barbara", "Larson", 8, 1),
("Micheal", "Carson", 9, 2),
("Tiffany", "Robinson", 10, 3);
