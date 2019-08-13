class StringTools{
  constructor(){
  }

  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  };
}

var defStrTools = new StringTools();
module.exports = defStrTools;