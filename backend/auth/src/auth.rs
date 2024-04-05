use actix_web::{post, web, HttpRequest, HttpResponse, Responder, cookie::Cookie, cookie::time::Duration};
use crate::db;
use serde::Deserialize;
use std::collections::HashMap;
use bcrypt::{DEFAULT_COST, hash, verify};
use jwt_simple::prelude::*;
use crate::helpers;

#[derive(Deserialize)]
struct UserRequest {
    email: String,
    password: String,
}

#[post("/signup")]
async fn signup(info: web::Json<UserRequest>) -> impl Responder {
    let (email, password) = (&info.email, &info.password);

    let conn = &mut db::establish_connection();

    let user = db::get_user_by_email(conn, email);

    if user.is_some() {
        return HttpResponse::Conflict().body("User already exists");
    }

    let hashed_password = hash(password, DEFAULT_COST).expect("Failed to hash password");

    let user = db::create_user(conn, email, &hashed_password);

    HttpResponse::Ok().body("User created")
}

#[post("/signin")]
async fn signin(req: HttpRequest, info: web::Json<UserRequest>) -> impl Responder {
    let (email, password) = (&info.email, &info.password);

    if let Some(token) = req.cookie("token") {
        return HttpResponse::Ok().body("User already signed in");
    }

    let conn = &mut db::establish_connection();

    let user = db::get_user_by_email(conn, email);

    if user.is_none() {
        return HttpResponse::NotFound().body("User not found");
    }

    let user = user.unwrap();

    let is_valid_password = verify(password, &user.password).expect("Failed to verify password");

    if !is_valid_password {
        return HttpResponse::Unauthorized().body("Invalid password");
    }

    let token = helpers::generate_jwt(user.id);

    let cookie = Cookie::build("token", token)
        .http_only(true)
        .max_age(Duration::days(1))
        .finish();

    HttpResponse::Ok()
        .cookie(cookie)
        .body("User signed in")
}

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg
    .service(signin)
    .service(signup);
}
