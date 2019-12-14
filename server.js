const data = require("./newMedicaments.json")
const r = require("request")
const express = require('express')
const app = express()
const port = 3000

request1 = "http://localhost:3000/"
var quer

app.listen(port,() => console.log(`Example app listening on port ${port}!`))
app.use(function(request, respons, next){
	query = request.query
	type_request = query.type_request
	switch(type_request)
	{
		case "get_names" :
			respons.send(GetNames(query.words))
			break 
		case "get_condition" :
			respons.send(GetCondition(query.name))
			break
		case "get_drug" :
			respons.send(GetDrug(query.name, query.condition))
			break

	}
	
})
	
function GetNames(word){
	var str = ''

	for(key in data)
	{
		if(key.startsWith(word[0].toUpperCase() + word.substr(1).toLowerCase()))
			str += key+"\n"
	}
	
	return  str
}

function GetCondition(name) {

	name = name.replace(/[_]/g," ")	
	var prep = data[name]
	var str = ''

	for(var i in prep)
	{
		if(prep[i].FormRelease != null){
			str+=prep[i].FormRelease 
		}
	}

	return str
}

function GetDrug(name,condition) 
{
	name = name.replace(/[_]/g," ")
	condition = condition.replace(/[_]/g," ")



	var prep = data[name]

	for(var i in prep)
	{
		if(prep[i].FormRelease === condition+'\n')
		{
			return JSON.stringify(prep[i])
		}
	} 

	return "Error"
}