const NGit = require("nodegit");
const path = require("path");
class Git {
  constructor(source_repo, target_repo) {
    this.source_repo = source_repo;
    this.target_repo = target_repo;
  }
  clone(repo_url, repo_path) {
    return new Promise((resolve, reject) => {
      try {
        console.log("CLONE START");
        repo_path = path.join("/tmp", repo_path);
        console.log(`Repo Path = ${repo_path}`);
        NGit.Clone(repo_url, repo_path)
          .then(repo => {
            console.log("CLONE END");
            resolve(repo);
          })
          .catch(err => {
            console.log("CLONE END");
            reject(err);
          });
      } catch (error) {
        console.log(error);
        console.log("CLONE END");
        reject(error);
      }
    });
  }
  add_remote(repo, remote_name, remote_url) {
    return new Promise((resolve, reject) => {
      try {
        const remote = NGit.Remote.create(repo, remote_name, remote_url);
        console.log("REMOTE ADDED");
        resolve(remote);
      } catch (err) {
        console.log(err);
        console.log("REMOTE ADDED ERROR");
        reject(err);
      }
    });
  }
  push(remote) {
    return new Promise((resolve, reject) => {
      try {
        remote
          .push(["refs/heads/master:refs/heads/master"], {
            callbacks: {
              credentials: function(...args) {
                console.log(args);
                console.log("Credentails calling");
                return NGit.Cred.sshKeyNew(
                  "git",
                  "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDgzRFTHZHVw6OzftbWKM+MZIAQ1aErdfpGUG1mdIhTojbVGgaoVCI6USW3WkM/XADyDbMbOheok9rphWJ0peQG+8bzArtIcpXw3iAFommHl1D9GuIfwpB3Gl2fvsb7axnrMKEkVm3zvHg5iRJhk3DGef5bTqXLybWx1sGqEnyymb+XpI9b7t/libfyu7RXEJLn2YE8i7nvfrQSrb1E51Cn6RaQ/rdjM74o3DZAmunhrPfYgABeW69l8whMdaRWrj8FNisaHMBoci2NAR22nWPxKSovfYHQixfBjp9vlfJ+1CTjWMAm+K8RruLKPbtn+ysTSnmkV+5sl7Le5lczL4hwH26awFnTydWGUSR9xVAdSNN1vQwvqyWVw4Iur28KR9WDyYo+uced35O64kBq3E14tPd4nrg1yuFyyHiUbLaePW28G7D+qIC6KrJvWnrS2wlUJbUqCsj8XRAUikelRwedV+hREJ7kwkrsnQLGYb2Fsjk3d4p20tCXlZ7tU/2maeSX4TQFFviA68J3Kh5ScXbuKfaQhG8C/Q6wTB4USUXiyRA2EnzhA8WFZixIo90U/EfwOujbbu69Y1D6AL40X2Ae+Va66Iau5ZmpZ47BjHa0cAueBQ01TiXv/d+ZFxhQGbUyY8t2V+wKlM5jZABnxJv/1odxtzRA6aiMvBhBUE5SGQ== vinaymavi@gmail.com                  ",
                  "-----BEGIN OPENSSH PRIVATE KEY-----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-----END OPENSSH PRIVATE KEY-----",
                  "vinaymavi"
                );
              }
            }
          })
          .then(number => {
            console.log("Number", number);
            resolve(number);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  commit() {}
  push_to_app() {
    return new Promise((resolve, reject) => {
      try {
        console.log("PUSH APP START");
        this.clone(this.source_repo, "source")
          .then(repo => {
            return this.add_remote(repo, "destination", this.target_repo);
          })
          .then(remote => {
            return this.push(remote);
          })
          .then(number => {
            console.log("PUSH APP END");
            console.log(`pushed successfully hash = ${number}`);
            resolve({ msg: "pushed" });
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
