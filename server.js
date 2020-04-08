const data = require("./TradeNameMedicaments.json")
const chemistry = require("./ChemistryNameMedicaments.json")
const fs = require('fs')
const r = require("request")
const express = require('express')
const app = express()
const port = 3000

request1 = "http://localhost:3000/"
var quer

app.listen(port,() => console.log(`Example app listening on port ${port}!`))

app.use(function(request, respons, next){
	console.log("Conect")
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
		case "get_chemistryName" :
			respons.send(GetChemistryName(query.name))
			break
		case "get_generics" :
			respons.send(GetGenerics(query.chemistryName))
			break
		case "get_generics_with_condition":
			respons.send(GetGenericsWithCondiyion(query.chemistryName, query.condition))
			break
	}
	
})
	
function GetNames(word){
	var str = {}

	for(key in data)
	{
		if(key.startsWith(word[0].toUpperCase() + word.substr(1).toLowerCase()))
			str[key] = {}
	}
	
	return  JSON.stringify(str, null, 2)
}

function GetCondition(name) {
	name = name.replace(/[_]/g," ")	
	var prep = data[name]
	var str = {}

	for(var i in prep)
	{
		if(prep[i].FormRelease != null){
			str[prep[i].FormRelease] = {}
		}
	}

	return JSON.stringify(str, null, 2)
}

function GetDrug(name,condition) 
{
	var array = []
	name = name.replace(/[_]/g," ")
	condition = condition.replace(/[_]/g," ")

	var prep = data[name]

	for(var i in prep)
	{
		if(prep[i].FormRelease === condition+'\n')
		{
			array.push(JSON.stringify(prep[i], null, 2))
		}
	} 

	return JSON.stringify({array}, null, 2)
}

function GetChemistryName(name)
{
	name = name.replace(/[_]/g," ")
	var d = {}
	d[data[name][0].ChemistryName] = {}
	return JSON.stringify(d, null, 2)
}

function GetGenerics(chemistryName)
{
	var req = {}
	for(var prep in chemistry[chemistryName])
	{
		try
		{
			var file = require("./Parser/Info/"+[chemistry[chemistryName][prep].TradeName]+".json")
			req[chemistry[chemistryName][prep].TradeName] = file
		}
		catch(e)
		{
			req[chemistry[chemistryName][prep].TradeName] = {}
		}
	}
	
	return JSON.stringify(req, null, 2)
}


function GetGenericsWithCondiyion(chemistryName, condition)
{
	var req = {}
	for(var prep in chemistry[chemistryName])
	{
		if (chemistry[chemistryName][prep].FormRelease == condition+ "\n")
		{
			req[chemistry[chemistryName][prep].TradeName] = {}
		}
	}
	return JSON.stringify(req, null, 2)
}


