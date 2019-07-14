const git = require("isomorphic-git");
const fs = require("fs");
const rimraf = require("rimraf");

git.plugins.set("fs", fs);
const path = require("path");
class Git {
  constructor(
    source_repo,
    target_repo,
    repo_path,
    access_token_source,
    access_token_dest
  ) {
    this.source_repo = source_repo;
    this.target_repo = target_repo;
    this.repo_path = path.join("/tmp", repo_path);
    this.access_token_source = access_token_source;
    this.access_token_dest = access_token_dest;
    console.log("REPO PATH = ", this.repo_path);
  }
  init() {
    console.log("INIT");
    return git.init({ dir: this.repo_path });
  }
  removedotgit() {
    console.log("REMOVE DOT GIT");
    return rimraf.sync(path.join(this.repo_path, ".git"));
  }
  cleanup() {
    console.log("CLENAUP");
    return rimraf.sync(this.repo_path);
  }
  clone(repo_url) {
    console.log("CLONING START");
    return git.clone({
      dir: this.repo_path,
      url: repo_url
    });
  }
  add_remote(remote_name, remote_url) {
    console.log("ADD REMOTE START");
    return git.addRemote({
      dir: this.repo_path,
      remote: remote_name,
      url: remote_url
    });
  }
  push(ref, remoteRef, remote, token) {
    console.log("PUSH");
    return git.push({
      dir: this.repo_path,
      ref,
      remoteRef,
      remote,
      token,
      force: true
    });
  }
  add() {
    console.log("ADD");
    return git.add({
      dir: this.repo_path,
      filepath: "."
    });
  }
  commit() {
    console.log("COMMIT");
    return git.commit({
      dir: this.repo_path,
      message: "Initail commit",
      author: {
        name: "Mr. Test",
        email: "mrtest@example.com"
      }
    });
  }
  push_to_app() {
    return new Promise((resolve, reject) => {
      try {
        console.log("PUSH APP START");
        this.clone(this.source_repo)
          .then(() => {
            this.removedotgit();
            return this.init();
          })
          .then(() => {
            return this.add();
          })
          .then(() => {
            return this.commit();
          })
          .then(() => {
            return this.add_remote("destination", this.target_repo);
          })
          .then(() => {
            return this.push(
              "refs/heads/master",
              "refs/heads/master",
              "destination",
              this.access_token_dest
            );
          })
          .then(resp => {
            console.log("PUSH APP END");
            console.log(resp);
            resolve({ msg: "pushed" });
          })
          .then(() => {
            return this.cleanup();
          })
          .catch(err => {
            console.log(err);
            console.log("PUSH APP ERROR");
            reject(err);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

module.exports = Git;
