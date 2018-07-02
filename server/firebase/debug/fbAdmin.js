var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = {
  "type": "service_account",
  "project_id": "planyourmoney-b36e6",
  "private_key_id": "0bffffcc9b776dfd2e0b7d7c6bfa4c77070fa5ec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+ZtIit1R6Sx5t\nTumg7GWAzb940gz/k55TgcVDWI73tlnXZM43gQY4L/yij4/vTPYaeTfpRaxwLLYt\nExhpBOI+hTrwq6hslIyvtvORlS3Oh1mm4cf3IoTrYBhXwD164NT6sJ4T1J2qXXeA\nGkcbkcoG6yNdAjpecMg/iTRjRD8yp3ISsn2th3fVWYxYhu9tq2hw/iHP6jk2t3zt\n+xpU78IWSYdNONy76A2dYj28EEilA6tPNImkU2l4pf7MX9nGPx7g5BRJ3u4QHQS4\ng7vEgHAHYYWJMiiOR6yNJeu18mQLzBga35+Vt88NWEU+YxzZDYf0AAoJu2UZyrwx\n79O6wverAgMBAAECggEACG+2NDXq/Hzd7RpNLXAGsqrV0YzTvkf0Vh85YNmzLVRQ\nmG54hAASXk9OAoaZlOZUPz8LaalzJwiWzS976jyo/lEul+GwlZhiwBm7TWzj5Iid\nwdBePlvdXNqF/u60gAB8n1ulCBw9x4HbB3uNQVz31npOYlLKHaDMq/gF22IiP2Rq\nmOen5qHT7jneWxfn+6KUVMSKw4PxFKjGa7qsxUbkN3dWE83NxfBAl2n3ATQBSKtN\nMSoEUWhGNJx+UDGxD5BSJhuYqI3oZQQ3OYz9fzGcD3V97EwbF3PjjbjdK8305dF4\nmvL2eMIFNjVl/e0AOtgM0DnquO5ywzsF0zLq9u7l2QKBgQD31li6Y3qk/6L8lM/P\nYt+nUtfW77tUEUQGYvtp1sFJqTFjPrtIRHVEe4LlYvjXkbGTrtnjfDds9KCZwL3t\nhInG3lgk56JUAqbZmAKVOzIsW4KGZQldKrTYm1M3uQ+Bj/Kb7rFtQvSGuV6p39gg\nHiGxGAwTf90N9Z1qGqQ8Noc4+QKBgQDErDPXkeT8FrCHt0qJGFZq0sFRYTcz924M\nhCw1vDs9SKaDqvCTtegyUjVK/ePPlOSFwU6pNHGI+nISiomVR5iZjEnlHVWZdPNv\nsQIQjcNYzxJJUQeoCCsyMR0xQxgKqQNtHnr5w6qOd81VUBXeV/PRi5cTt8yWrHm/\n+gyO552iwwKBgQCS7ZNapME/8oHo5jwxAbgAFZ/6P9O56iZ+9s2AGJ4skk7CPJ2B\nIXy4JdUbMsq92hUBrcZlE+4z/O79WAQBPPMFYCm3b0+QKKZMF89oM1jybSn7jQi5\nICloxOTYAzGLKRC2mxK66NfYyyqw4RDbMaHdwJjgMoyVywgQsEyvmdAe2QKBgCBk\nZF168AX9DrIrpCEUWxdZAvIOWvM6K2vwUP/AstkTICnLe7g4W7f+Bj0FuAG2ejT1\nc6k2tARli2g2XRazJhUUIA+WV0ThGD8rHjXvw17bLB3bNLGeNs8be71jWZBX6fKM\n9KAyc+LnJHCKsi9euQ+oOAfNW+rtGVhfLLZUu4fVAoGALvMBFnQBW4K9syRRKINT\nwLDbGGaSAsEERfJRdfGPo884K5w8hunyNQqtOfHndbrTbMj6ZyMNmt1E/WI6MeRw\nrG4RQ2gG/CJcOLsF06OfutKrnQb4LJxPYicsHgnjh2RtxH8i72QpM2vjguAENypT\nPAXQOTNpa4cQEBrYwjkqspk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ch127@planyourmoney-b36e6.iam.gserviceaccount.com",
  "client_id": "106976716839322563807",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ch127%40planyourmoney-b36e6.iam.gserviceaccount.com"
}
;

// Initialize the app with a service account, granting admin privileges
module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://planyourmoney-b36e6.firebaseio.com"
});