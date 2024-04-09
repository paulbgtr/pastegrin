use actix_web::{HttpResponse, delete, web, Responder};
use crate::db;

#[delete("/users/{id}")]
async fn delete(path: web::Path<i32>) -> impl Responder {
    let id = path.into_inner();

    let conn = &mut db::establish_connection();

    db::delete_user(conn, id);

    HttpResponse::Ok().body("User deleted")
}

pub fn users_config(cfg: &mut web::ServiceConfig) {
    cfg.service(delete);
}
