# Local Domain

> **WARNING** This project is under heavy development and flux. Config and things will likely change as the full feature set is built!

Local Domain is a quick and easy way to manage common tasks, local servers, and basic proxies for local development.

The ideal solution is to be able to start your day, go to `my-app.localhost`, from there Local Domain handles starting your Webpack server, proxies the request, and even lets you see logs.
All of this without touching docker, nGinx, PM2, or other tools!

This project is heavily inspired by [Hotel](https://www.npmjs.com/package/hotel) and [Laravel Valet](https://laravel.com/docs/5.8/valet).

### Getting Started

Install `local-domain` by running:

```
npm install -g local-domain
```

Then start the Local Domain server with:

```
local-domain
```

That's it for now!

To change configuration go to `~/.local-domain/config.json` and edit the `subdomains` array.
Each subdomain has two configuration values:

* `subdomain` - This is the subdomain that you want to use for your app within the `.localhost` TLD, for example a value of `my-app` will match for requests to `my-app.localhost`
* `port` - This is the port where your local server is running

> Example Subdomain Config Object

```json
{
  "subdomain": "api.weather",
  "port": 8080
}
```

Visiting `http://api.weather.localhost` will be like making a request to `http://localhost:8080` but all the right host headers, etc will still act like `api.weather.localhost`!

## Future Features

* CLI Commands
* Process Mangement (Local Domain can manage your servers Node or otherwise without you needing to run them in a separate task)
* SSL Certificates and HTTPS support (using no frills Let's Encrypt)
* GUI and Logs!
* Support for hooking into existing tools (docker, PM2, etc)
