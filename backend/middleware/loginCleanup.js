const sanitizeHTML = require("sanitize-html");

async function loginCleanup(req,res,next){
  if(typeof req.body.name != "string") req.body.name = ""
  if(req.body.email != undefined && typeof req.body.email != "string") req.body.email = ""
  if(typeof req.body.password != "string") req.body.password = "" 
  
  req.cleanData={
    name: sanitizeHTML(req.body.name.trim(),{allowedTags: [],allowedAttributes: []}),
    password: sanitizeHTML(req.body.password.trim(),{allowedTags: [],allowedAttributes: []})
  }
  if(req.body.email != undefined)
    req.cleanData.email = sanitizeHTML(req.body.email.trim(),{allowedTags: [],allowedAttributes: []})
  next()  
}

module.exports = loginCleanup;