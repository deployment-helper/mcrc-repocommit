const Git = require('./src/git');
const uuid1 = require('uuid/v1')
exports.helloWorld = (req, res) => {
    console.log(req.body);
    // TODO error hanalding required

    const git = new Git(req.body.source,req.body.destination,uuid1())
    git.push_to_app().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err)
    })
};
