const http = require('http');
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({})

const configPath = path.join(process.env.HOME, '/.local-domain', 'config.json');
let config = {
  port: 80,
  subdomains: []
};

if (fs.existsSync(configPath)) {
  const configFileContents = fs.readFileSync(configPath, { encoding: 'utf8' });

  config = JSON.parse(configFileContents);
} else {
  console.log('Writing Local Domain config file');
  fs.writeFile(configPath, JSON.stringify(config, null, 2), { encoding: 'utf8' });
  console.log('Config file written to: "' + configPath + '"');
  console.log('Edit the config file and restart Local Domain to start development!');
}

const server = http.createServer((request, response) => {
  let domain = request.headers.host;
  let subdomain = domain.replace(/\.localhost/, '');

  let subdomainConfig = config.subdomains.filter(a => a.subdomain === subdomain)[0];

  proxy.web(request, response, {
    target: 'http://127.0.0.1:' + subdomainConfig.port
  }, (err) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({
      message: 'The Local Domain proxy timed out or threw another error',
      stackTrace: err
    }));
  });
});

server.listen(80, (err) => {
  if (err) {
    return console.log('Local Domain: Could not start');
  }

  console.log('Local Domain: Started');
});
