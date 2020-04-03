const data = require("./TradeNameMedicaments.json");
const fs = require("fs");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const r = require("request");
const cheerio = require("cheerio");
const cheerio1 = require("cheerio");
const express = require('express');
var url1 = "https://lekopttorg.ru/catalog/?q=";
var url2 = "&s=";
var domen = "https://lekopttorg.ru";

(function()
{
	var dataLekOptTorg = {}
	for(key in data)
	{
		console.log(key)
		dataLekOptTorg[key] = []
		url = url1+key+url2;
		//url = url1+"Парацетамол"+url2;
		r(encodeURI(url), function (error, response, body) 
		{
			if(body != undefined)
			{
				var ch = cheerio.load(body);
				array = ch(".main-data>.name>.link")
				i = 0
				for(ar in array)
				{
						try
						{
							src = array[ar]["attribs"]["href"]
							console.log(domen + src)
						}
						catch
						{
							continue;
						}
						r(encodeURI(domen + src), function(error, response1, body1)
						{
							if(body1 != undefined)
							{
								var ch1 = cheerio1.load(body1)
								var array1 = ch1("[itemprop=price]")
								
								try
								{
									console.log(array1)
									var prices = array1["0"]["attribs"]["content"]
									dataLekOptTorg[key][ar] = {price: prices}
								}
								catch
								{
									console.log("prices error")
								}

								try
								{
									var srcImages = domen + ch1(".product-photo>img")["0"]["attribs"]["src"]
									dataLekOptTorg[key][ar] = {srcImage: srcImages }
								}
								catch
								{
									console.log("srcImage error")
								}

								try
								{
									// получаем item id 
									ch2 = cheerio1.load(body1)
									var id = ch2('div.combo-target-content')["1"].attribs.id.split("catalog_store_amount_div_detail_")[1]
								}
								catch
								{
									console.log("id error")
								}
								
								fs.writeFileSync("DataLekOptTorg.json", JSON.stringify(dataLekOptTorg, null, 2))
								console.log("write")
								console.log("-------------------------------------------------------------------------------")
							}
						})
					i++
					//if(i==array.length) {break}
				}
			}
		})
		break
	}

	

		
})()