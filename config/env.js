function envFactory() {
  const env = {
    NODE_ENV: process.env.NODE_ENV
  };

  process.argv.forEach((val, index) => {
    if (val.match(/^\-\-dev$/gi)) {
      env.NODE_ENV = "development";
    } else if (val.match(/^\-\-prod$/gi)) {
      env.NODE_ENV = "production";
    } else {
      env.NODE_ENV = "development";
    }
  });
  env.isEnvDevelopment = env.NODE_ENV === "development";
  env.isEnvProduction = env.NODE_ENV === "production";

  const envStringified = {
    "process.env": Object.keys(env).reduce((v, key) => {
      v[key] = JSON.stringify(env[key]);
      return v;
    }, {})
  };

  env.stringify = envStringified;

  return env;
}

module.exports = envFactory();
