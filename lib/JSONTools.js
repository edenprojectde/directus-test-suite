var stringTools = require("./StringTools");

class JSONTools{
  constructor(){
  }

  parseConfigIntoTemplateString(configJson, string) {
    Object.keys(configJson).forEach(replacement => {
      string = stringTools.replaceAll(string, replacement,configJson[replacement]);
    });
    return string;
  }
  parseConfigIntoJSONObject(configJson, jsonObj) {
    //console.log(jsonObj);
    var string = JSON.stringify(jsonObj);
  
    Object.keys(configJson).forEach(replacement => {
      string = stringTools.replaceAll(string, replacement, configJson[replacement]);
    });
  
    return JSON.parse(string);
  }
}

var defJSONTools = new JSONTools();
module.exports = defJSONTools;