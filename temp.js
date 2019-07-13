const Git = require("./src/git");

const git = new Git(
  "https://github.com/vinaymavi/netlify-cms-authentication",
  "https://github.com/vinaymavi/mcrc-temp3.git",
  "source"
);
git
  .push_to_app()
  .then(data => {
   console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
