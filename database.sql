CREATE DATABASE to_do_list;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(200),
    completed VARCHAR DEFAULT 'No.'
);

