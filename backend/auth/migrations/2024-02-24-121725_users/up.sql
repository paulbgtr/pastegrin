create table users (
    id serial primary key,
    email text not null unique,
    password text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);