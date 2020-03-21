const data = require("./newMedicaments.json")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const r = require("request")
const cheerio = require("cheerio")
const cheerio1 = require("cheerio")
const express = require('express')
var url1 = "https://lekopttorg.ru/catalog/?q="
var url2 = "&s="
var domen = "https://lekopttorg.ru";

(function(){
// for(key in data)
// {
// 	url = url1+key+url2;
// 	console.log(url)
// 	r(url, function (error, response, body) {
// 				try{
// 	    		console.log("Ok")
// 	    		}
// 				catch(err){
// 				console.log("Error")
// 				}
// 			})
// }
url = url1+"Парацетамол"+url2;
r(encodeURI(url), function (error, response, body) {
		ch = cheerio.load(body)
		array = ch(".main-data>.name>.link")
		i = 0
		for(key in array)
		{
			src = array[key]["attribs"]["href"]

			r(domen + src, function(error, response1, body1)
			{
				ch1 = cheerio1.load(body1)
				array1 = ch1("[itemprop=price]")
				var price = array1["0"]["attribs"]["content"]

				// получаем item id 
				ch2 = cheerio1.load(body1)
				var id = ch2('div.combo-target-content')["1"].attribs.id.split("catalog_store_amount_div_detail_")[1]
				console.log(id)
				
				 
				// отправляем запрос для отображения аптек
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'https://lekopttorg.ru/ajax/catalog_stores.php', true)
				
				xhr.setRequestHeader('authority', 'lekopttorg.ru')
				xhr.setRequestHeader('method', 'POST')
				xhr.setRequestHeader('path', '/ajax/catalog_stores.php')
				xhr.setRequestHeader('scheme', 'https')
				xhr.setRequestHeader('accept', '*/*')
				xhr.setRequestHeader('accept-language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7')
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
				xhr.setRequestHeader('dnt', '1')
				xhr.setRequestHeader('sec-fetch-mode', 'cors')
				xhr.setRequestHeader('sec-fetch-site', 'same-origin')
				xhr.setRequestHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36')
				xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest')

				xhr.send(JSON.stringify({'ITEM_ID' : id,'STORE_POSTFIX' : 'detail'}))
				
				
				xhr.onload = function() {
				  console.log(`Загружено: ${xhr.status} ${xhr.response}`);
				};

				ch2 = cheerio1.load(body1)
				var location = ch2('div.combo-target-content')["1"].attribs.id
				console.log(location)
				console.log("-------------------------------------------------------------------------------")
			})
			break
			i++
			if(i==array.length) break
		}
})
}())