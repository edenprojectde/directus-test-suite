var jsonTools = require('./lib/JSONTools');
var fetch = require('node-fetch');
const config = require('./config.json');

var tests = [
  { data: require('./tests/create-collection.json'), result: 'No Result' },
  /* 
  
  Other Tests
  
  */
  { data: require('./tests/delete-collection.json'), result: 'No Result' }
];

// Running all the tests here!
function run(__index) {
  __index++;

  var obj = tests[__index];
  // All data in the query gets the strings replaced which are placed into the config.json in the root directory.
  obj.data.data = jsonTools.parseConfigIntoJSONObject(config, obj.data.data);
  // Same for the REST API Link
  var parsed_request_url = jsonTools.parseConfigIntoTemplateString(config, obj.data.path);

  // Logging the Method and URL after Parse here
  console.log(obj.data.method + ' ' + parsed_request_url);

  fetch(parsed_request_url, {
    method: obj.data.method,
    body: JSON.stringify(obj.data.data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((result) => result.json())
    .then((json) => {
      console.log('\n  ' + JSON.stringify(json));
      console.log('  As expected? ' + (JSON.stringify(json)==JSON.stringify(obj.data.expected)) + '\n');
      run(__index);
    })
    .catch((err) => {
      console.log('\n' + '  Response was empty(probably, todo: more error handling)');
      console.log('  As expected? ' + (null==obj.data.expected) + '\n');
    });
}
run(-1); //Starting with -1, the first part of the function will always be increased at the start. So the first index is 0, not -1.
