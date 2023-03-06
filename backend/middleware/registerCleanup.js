const sanitizeHTML = require("sanitize-html");

async function registerCleanup(req,res,next){
  if(typeof req.body.name != "string" &&
    (req.body.email != undefined && typeof req.body.email != "string")
    && typeof req.body.password != "string"){
        res.send(false)
    }

  req.cleanData={
    name: sanitizeHTML(req.body.name.trim(),{allowedTags: [],allowedAttributes: []}),
    password: sanitizeHTML(req.body.password.trim(),{allowedTags: [],allowedAttributes: []}),
    email: sanitizeHTML(req.body.email.trim(),{allowedTags: [],allowedAttributes: []}),
  }
  next()
}

module.exports = registerCleanup;