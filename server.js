const data = require("./TradeNameMedicaments.json")
const chemistry = require("./ChemistryNameMedicaments.json")
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
	var str = ''

	for(key in data)
	{
		if(key.startsWith(word[0].toUpperCase() + word.substr(1).toLowerCase()))
			str += key+"\n"
	}
	
	return  str.substring(0, str.length - 1)
}

function GetCondition(name) {
	console.log(name)
	name = name.replace(/[_]/g," ")	
	var prep = data[name]
	var str = ''

	for(var i in prep)
	{
		if(prep[i].FormRelease != null){
			str+=prep[i].FormRelease 
		}
	}

	return str.substring(0, str.length - 1)
}

function GetDrug(name,condition) 
{
	var qrt = ""
	name = name.replace(/[_]/g," ")
	condition = condition.replace(/[_]/g," ")

	var prep = data[name]

	for(var i in prep)
	{
		if(prep[i].FormRelease === condition+'\n')
		{
			qrt+= JSON.stringify(prep[i])
		}
	} 

	return qrt
}

function GetChemistryName(name){
	
	name = name.replace(/[_]/g," ")
	console.log(data[name])
	return data[name][0].ChemistryName
}

function GetGenerics(chemistryName){
	var req = ""
	for(var prep in chemistry[chemistryName])
	{
		req+=chemistry[chemistryName][prep].TradeName+","
	}
	// for(var prep in data){
	// 	for(var i in data[prep]){
	// 		if(data[prep][i].ChemistryName == chemistryName){
	// 			req+=data[prep][i].TradeName+","
	// 			break
	// 		}
	// 	}		
	// }
	return req.substring(0, req.length - 1)

}


function GetGenericsWithCondiyion(chemistryName, condition){
	// var array = []
 	
	// for(var prep in data){
	// 	for(var i in data[prep]){
	// 		if(data[prep][i].ChemistryName == chemistryName){
	// 			if(data[prep][i].FormRelease  == condition + "\n"){
	// 				array.push(data[prep][i])
	// 			}
	// 		}
	// 	}		
	// }
	// console.log(array)
	// return JSON.stringify(array)

	var req = ""
	console.log(condition)
	for(var prep in chemistry[chemistryName])
	{
		if (chemistry[chemistryName][prep].FormRelease == condition+ "\n")
		{
			req+=chemistry[chemistryName][prep].TradeName+","
		}
	}
	// for(var prep in data){
	// 	for(var i in data[prep]){
	// 		if(data[prep][i].ChemistryName == chemistryName){
	// 			req+=data[prep][i].TradeName+","
	// 			break
	// 		}
	// 	}		
	// }
	return req.substring(0, req.length - 1)
}


