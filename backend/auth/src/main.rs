use actix_web::{get, App, HttpResponse, HttpServer, Responder};

mod auth;
mod helpers;
mod db;
mod models;
mod schema;
mod users;

#[get("/")]
async fn welcome() -> impl Responder {
    let response_message = "Welcome to pastegrin auth API!";

        let available_endpoints = vec![
        "POST /auth/signup",
        "POST /auth/signin",
        "GET /auth/me",
    ];

    let response = format!("{}\n\nAvailable endpoints:\n{}", response_message, available_endpoints.join("\n"));

    HttpResponse::Ok().body(response)
} 

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(auth::auth_config)
            .configure(users::users_config)
            .service(welcome)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}