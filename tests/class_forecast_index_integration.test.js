const assert=require('assert');
const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const sw=fs.readFileSync(require('path').join(__dirname,'..','sw.js'),'utf8');

assert(html.includes('<script src="src/class_forecast.js"></script>'),'Class Forecast selector must load before application logic');
assert(html.includes('function renderClassForecast()'),'Class Forecast must be a normal navigable class view');
assert(html.includes('navMark("forecast", navViewLabel("forecast"))'),'Class Forecast must participate in navigation/session restoration');
assert(html.includes('<h3>1. Class Pulse</h3>'),'Class Pulse section missing');
assert(html.includes('<h3>2. Needs You Now</h3>'),'Needs You Now section missing');
assert(html.includes('<h3>3. Up Next</h3>'),'Up Next section missing');
assert(html.includes('<h3>4. Shop Position</h3>'),'Shop Position section missing');
assert(html.includes('Up Next is not a prediction that work will happen today.'),'non-predictive semantic notice missing');
assert(html.includes('Ready to Work is intentionally excluded.'),'action queue exclusion missing');
assert(sw.includes("'./src/class_forecast.js'"),'offline shell must include Class Forecast selector');
console.log('PASS Class Forecast v1 index integration contracts');
