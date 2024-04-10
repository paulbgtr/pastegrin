use actix_web::{HttpResponse, put, delete, web, Responder};
use serde::Deserialize;
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
    email: String,
    new_password: String,
    old_password: String,
}

#[put("/users/{id}")]
async fn update(path: web::Path<i32>, info: web::Json<UserRequest>) -> impl Responder {
    let user_id = path.into_inner();    

    let user = db::get_user_by_id(&mut db::establish_connection(), user_id);

    if user.is_none() {
        return HttpResponse::NotFound().body("User not found");
    }

    let user = user.unwrap();

    if user.password != info.old_password {
        return HttpResponse::Unauthorized().body("Invalid password");
    }

    let (email, new_password) = (&info.email, &info.new_password);

    let conn = &mut db::establish_connection();

    db::update_user(conn, user_id, email, new_password);

    HttpResponse::Ok().body("User updated")
}

pub fn users_config(cfg: &mut web::ServiceConfig) {
    cfg
    .service(update)
    .service(delete);
}
