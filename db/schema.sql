drop database if exists homeworkdb;

CREATE DATABASE homeworkdb;

USE homeworkdb;

CREATE TABLE department (
    id int not null auto_increment,
    name varchar(30) not null,
    primary key (id)
);

CREATE TABLE role (
    id int not null auto_increment,
    title VARCHAR(30) NOT NULL,
    salary decimal NOT NULL,
    department_id INT NOT NULL,
    primary key (id),
    INDEX department_reference (department_id),
    CONSTRAINT a_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id int not null auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    INDEX manager_reference (manager_id),
    CONSTRAINT a_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
    SET
        NULL,
        primary key (id),
        INDEX role_reference (role_id),
        CONSTRAINT a_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);