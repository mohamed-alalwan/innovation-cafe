const fs = require('fs');
// Load variables from .env into process.env
require('dotenv').config();

const credentials = {
  type: 'service_account',
  project_id: 'innovation-cafe-b0fe2',
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
};

fs.writeFileSync(
  'google-api-credentials.json',
  JSON.stringify(credentials, null, 2)
);