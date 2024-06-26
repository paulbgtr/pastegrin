use crate::models::*;
use crate::schema::users;
use crate::schema::users::dsl::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_user_by_id(conn: &mut PgConnection, _id: i32) -> Option<User> {
    let result = users
        .filter(id.eq(_id))
        .select(User::as_select())
        .load(conn)
        .expect("Error loading user");

    result.into_iter().next()
}

pub fn get_user_by_email(conn: &mut PgConnection, _email: &str) -> Option<User> {
    let result = users
        .filter(email.eq(_email))
        .select(User::as_select())
        .load(conn)
        .expect("Error loading user");

    result.into_iter().next()
}

pub fn create_user(conn: &mut PgConnection, _email: &str, _password: &str) -> User {
    let new_user = NewUser {
        email: _email,
        password: _password,
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .get_result(conn)
        .expect("Error saving new user")
}

pub fn update_user_email(conn: &mut PgConnection, _id: i32, _email: &str) -> User {
    diesel::update(users.find(_id))
        .set(email.eq(_email))
        .get_result(conn)
        .expect("Error updating user")
}

pub fn update_user_password(conn: &mut PgConnection, _id: i32, _password: &str) -> User {
    diesel::update(users.find(_id))
        .set(password.eq(_password))
        .get_result(conn)
        .expect("Error updating user")
}

pub fn delete_user(conn: &mut PgConnection, _id: i32) {
    diesel::delete(users.find(_id))
        .execute(conn)
        .expect("Error deleting user");
}
