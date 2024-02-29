use jwt_simple::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct AdditionalData {
    user_id: i32,
}

const KEY: &str = "secret";

pub fn generate_jwt(user_id: i32) -> String {
    let key = HS256Key::from_bytes(KEY.as_bytes());

    let additional_data = AdditionalData { user_id };

    let claims = Claims::with_custom_claims(additional_data, Duration::from_days(1));

    let token = key.authenticate(claims).unwrap();

    token
}
