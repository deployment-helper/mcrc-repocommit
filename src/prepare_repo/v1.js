const fs = require("fs");
const path = require("path");
class PrepareRepo {
  constructor(repo_path, meta_data_file_name, context) {
    this.repo_path = repo_path;
    this.meta_data_file_name = meta_data_file_name;
    this.context = context;
  }
  file_replace(file_name, str, newstr) {
    return new Promise((resolve, reject) => {
      const file_path = path.join(this.repo_path, file_name);
      try {
        //   TODO: is dir validation
        if (fs.existsSync(file_path)) {
          const data_str = fs.readFileSync(file_path).toString();
          const new_data_str = data_str.replace(str, newstr);
          fs.writeFileSync(file_path, new_data_str);
          console.log(`${file_name} prepared successfully.`);
          resolve(`${file_name} prepared successfully.`);
        } else {
          console.log(`${file_name} does not exist`);
          resolve(`${file_name} does not exist`);
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  prepare() {
    return new Promise((resolve, reject) => {
      const meta_data_file_path = path.join(
        this.repo_path,
        this.meta_data_file_name
      );
      try {
        if (fs.existsSync(meta_data_file_path)) {
          const data_str = fs.readFileSync(meta_data_file_path).toString();
          const data_json = JSON.parse(data_str);
          if (data_json.repo_prepratoin !== undefined) {
            let promise_arr = [];
            data_json.repo_prepratoin.forEach(item => {
              promise_arr.push(
                this.file_replace(
                  item.file_path,
                  item.str,
                  item.newstr.startsWith("$")
                    ? this.context[item.newstr.substr(1)]
                    : item.newstr
                )
              );
            });
            Promise.all(promise_arr)
              .then(values => {
                console.log(values);
                resolve(values);
              })
              .catch(err => {
                console.error(err);
                reject(err);
              });
          } else {
            console.log(`No prepration required`);
            resolve(`No prepration required`);
          }
        } else {
          console.log(
            `Metadata file ${this.meta_data_file_name} does not exist.`
          );
          resolve(`Metadata file ${this.meta_data_file_name} does not exist.`);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

module.exports = PrepareRepo;
