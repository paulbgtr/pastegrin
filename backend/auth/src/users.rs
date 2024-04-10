use actix_web::{HttpResponse, put, delete, web, Responder};
use serde::Deserialize;
use bcrypt::{DEFAULT_COST, hash, verify};
use crate::db;

#[delete("/users/{id}")]
async fn delete(path: web::Path<i32>) -> impl Responder {
    let id = path.into_inner();

    let conn = &mut db::establish_connection();

    db::delete_user(conn, id);

    HttpResponse::Ok().body("User deleted")
}

#[derive(Deserialize)]
struct UserRequest {
    email: Option<String>,
    new_password: Option<String>,
    old_password: Option<String>,
}

#[put("/users/{id}")]
async fn update(path: web::Path<i32>, info: web::Json<UserRequest>) -> impl Responder {
    let (email, new_password, old_password) = (&info.email, &info.new_password, &info.old_password);

     if email.is_none() && new_password.is_none() {
        return HttpResponse::BadRequest().body("Email or new password must be provided");
     }

     if new_password.is_some() && old_password.is_none() {
        return HttpResponse::BadRequest().body("Old password must be provided");
     }

    let id = path.into_inner();

    let conn = &mut db::establish_connection();
    let user = db::get_user_by_id(conn, id);

    if user.is_none() {
        return HttpResponse::NotFound().body("User not found");
    }

    let user = user.unwrap();

    if email.is_some() {
        let email = email.as_ref().unwrap();
        let user = db::update_user_email(conn, id, email);
    }

    let old_password = old_password.as_ref().unwrap();
    let is_valid_password = verify(old_password, &user.password).expect("Failed to verify password");

    if !is_valid_password {
        return HttpResponse::Unauthorized().body("Invalid password");
    }

    let new_password = new_password.as_ref().unwrap();
    let hashed_password = hash(new_password, DEFAULT_COST).expect("Failed to hash password");

    let user = db::update_user_password(conn, id, &hashed_password);

    HttpResponse::Ok().body("User updated")
}

pub fn users_config(cfg: &mut web::ServiceConfig) {
    cfg
    .service(update)
    .service(delete);
}
