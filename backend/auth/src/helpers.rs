use jwt_simple::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AdditionalData {
    pub user_id: i32,
}

const KEY: &str = "secret";

pub fn generate_jwt(user_id: i32) -> String {
    let key = HS256Key::from_bytes(KEY.as_bytes());

    let additional_data = AdditionalData { user_id };

    let claims = Claims::with_custom_claims(additional_data, Duration::from_days(1));

    let token = key.authenticate(claims).unwrap();

    token
}

pub fn verify_jwt(token: &str) -> Result<AdditionalData, Box<dyn std::error::Error>> {
    let verifier = HS256Key::from_bytes(KEY.as_bytes());

    let claims = verifier.verify_token::<AdditionalData>(token, None)?;

    Ok(claims.custom)
}
