use std::future::{ready, Ready};
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error,
};
use futures_util::future::LocalBoxFuture;

pub struct CookieAuth;

impl<S, B> Transform<S, ServiceRequest> for CookieAuth
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = CookieAuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(CookieAuthMiddleware { service }))
    }
}

pub struct CookieAuthMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for CookieAuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);


    fn call(&self, req: ServiceRequest) -> Self::Future {
        println!("{:?}", req);

        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;

            println!("Hi mom");
            Ok(res)
        })
    }
}
