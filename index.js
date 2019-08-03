require("dotenv").config();
const uuid1 = require("uuid/v1");
const Git = require("./src/git");
const path = require("path");
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

exports.mcrc_repo_first_commit = async (req, resp) => {
  console.log(req.body);
  // TODO error hanalding required
  const respJson = JSON.parse(JSON.stringify(message_format));
  const repo_path = path.join("/tmp", uuid1());
  const git = new Git(
    req.body.source_repo_url,
    req.body.destination_repo_url,
    repo_path,
    req.body.source_access_token,
    req.body.destination_access_token,
    req.body.context
  );
  try {
    const data = await git.push_to_app();
    respJson.body = createSuccessResp("First commit pushed", data)
    return resp.send(respJson);
  } catch (error) {
    respJson.body = createErrResp("Error", error);
    return resp.send(respJson);
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
