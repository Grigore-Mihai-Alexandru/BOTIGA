const sanitize = require("sanitize-html");

function cleanup(req,res,next){
    if(typeof req.body.name!="string") req.cleanData.name = ""
    if(typeof req.body.description!="string") req.cleanData.description = ""
    if(typeof req.body.price!="string") req.cleanData.price = ""
    
    req.cleanData = {
        name:sanitize(req.body.name.trim(), {allowedAttributes:[],allowedTags:[]}),
        description:sanitize(req.body.description.trim(), {allowedAttributes:[],allowedTags:[]}),
        price:sanitize(req.body.price.trim(), {allowedAttributes:[],allowedTags:[]}),
    }
    next()
}

module.exports = {
    cleanup
}