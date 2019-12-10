const data = require("./newMedicaments.json")
const r = require("request")
const express = require('express')
const app = express()
const port = 3000

request1 = "http://localhost:3000/"
var quer

app.listen(port,() => console.log(`Example app listening on port ${port}!`))
app.use(function(request, respons, next){
	quer = request.query
	type_request = quer.type_request
	switch(type_request)
	{
		case "get_names" :
			respons.send(GetNames(quer.words))
			break 
		case "get_condition" :
			respons.send(GetCondition(quer.name))
			break
	}
	
})
	
function GetNames(word){
	var str = ''

	for(key in data)
	{
		if(key.startsWith(word[0].toUpperCase() + word.substr(1).toLowerCase()))
			str += key+","
	}
	str = str.slice(0,str.length -1)
	
	return  str
}

function GetCondition(name) {
	
	var prep = data[name]

	console.log(prep)

	return prep
}
