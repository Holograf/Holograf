CloudBalance is built using gulp.

First, install dependencies

```sh
npm install
bower install
```

Next, copy the credential files and certificate files (not supplied) to the **server/secrets** directory:

- jwt.secret
- drive.secret
- dropbox.secret

- cert.pem
- key.pem

Finally, build and run

```sh
gulp
```

Access the server locally through [https://localhost:8000](https://localhost:8000). The "https" part of this is very important, since everything is served over https!