use actix_web::{post, web, HttpResponse, Responder};
use crate::db;
use serde::Deserialize;

#[derive(Deserialize)]
struct SigninRequest {
    email: String,
    password: String,
}

#[post("/signin")]
async fn signin(info: web::Json<SigninRequest>) -> impl Responder {
    let (email, password) = (&info.email, &info.password);

    let conn = &mut db::establish_connection();

    let user = db::get_user_by_email(conn, email);

    HttpResponse::Ok().finish()
}

pub fn auth_config(cfg: &mut web::ServiceConfig) {
    cfg.service(signin);
}
