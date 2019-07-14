require("dotenv").config();
const Git = require("./src/git");
const uuid1 = require("uuid/v1");

const GIT_HUB_ACCESS_TOKEN = process.env.GIT_HUB_ACCESS_TOKEN;
const message_format = {
  statusCode: 200,
  isBase64Encoded: false,
  body: {
    status: "",
    message: "",
    data: {},
    error: null
  }
};

exports.handler = async event => {
  console.log(event.body);
  // TODO error hanalding required
  const resp = JSON.parse(JSON.stringify(message_format));
  const git = new Git(
    event.body.source,
    event.body.destination,
    uuid1(),
    GIT_HUB_ACCESS_TOKEN,
    GIT_HUB_ACCESS_TOKEN
  );
  try {
    const data = await git.push_to_app();
    resp.body = JSON.stringify(createSuccessResp("First commit pushed", data));
    return resp;
  } catch (error) {
    resp.body = JSON.stringify(createErrResp("Error", error));
    return resp;
  }
};

function createSuccessResp(message, data) {
  let resp_body = {};
  (resp_body.status = "OK"), (resp_body.message = message);
  resp_body.data = data;
  return resp_body;
}

function createErrResp(message, err) {
  let resp_body = {};
  (resp_body.status = "FAIL"), (resp_body.message = message);
  resp_body.err = err;
  return resp_body;
}
