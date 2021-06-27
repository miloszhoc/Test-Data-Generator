var output_field=document.querySelector("textarea[name='output']");

var selected_option=document.querySelector('#select_section');

var additional_options=document.getElementById('additional_options');

selected_option.addEventListener("change", function() {
	choose_option(selected_option.value);
});


document.querySelector('#refresh').addEventListener("click", function(){
	choose_option(selected_option.value);
})


function choose_option(option){
	additional_options.style.display='none';
	switch (option){
		case 'Male full name':		
		output_field.value=random_male_full_name();
		break;
		case 'Female full name':
		output_field.value=random_female_full_name();
		break;
		case 'Email':
		output_field.value='@yopmail.com';
		output_field.value=random_email(output_field.value);
		break;
		case 'Phone':
		output_field.value=random_phone();
		break;
		case 'NIP':
		output_field.value=random_nip();
		break;
		case 'City':
		output_field.value=random_city();
		break;
		case 'Text':
		additional_options.style.display='block';

		if (!document.getElementById("amount_of_chars")){
			let tag = document.createElement("input");
			let element = document.getElementById("additional_options");
			element.appendChild(tag);

			let placeholder = document.createAttribute("placeholder");
			placeholder.value = "Length";
			tag.setAttributeNode(placeholder);

			let id = document.createAttribute("id");
			id.value = "amount_of_chars";
			tag.setAttributeNode(id);

			let type = document.createAttribute("type");
			type.value = "number";
			tag.setAttributeNode(type);


			let min = document.createAttribute("min");
			min.value = "1";
			tag.setAttributeNode(min);

			let max = document.createAttribute("max");
			max.value = "29659";
			tag.setAttributeNode(max);
		}
		output_field.value=get_text(document.getElementById("amount_of_chars").value);
		break;
	}
	copy_text(output_field);
}


function copy_text(from_field){
	from_field.select();
	document.execCommand("copy");
}


function get_file_data(url, split_lines='\r\n'){
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.overrideMimeType("text/plain");
	xmlHttp.send();
	if (split_lines){
		return xmlHttp.responseText.split(split_lines);	
	}
	else{
		return xmlHttp.responseText;
	}
}


function random_male_full_name(){
	const name_url = chrome.runtime.getURL('data/male_name.txt');
	const last_name_url = chrome.runtime.getURL('data/male_last_name.txt');
	
	let names = get_file_data(name_url);
	let last_names = get_file_data(last_name_url);
	
	return names[Math.floor(Math.random() * names.length)] + ' ' + last_names[Math.floor(Math.random() * last_names.length)]
}


function random_female_full_name(){
	const name_url = chrome.runtime.getURL('data/female_name.txt');
	const last_name_url = chrome.runtime.getURL('data/female_last_name.txt');

	let names = get_file_data(name_url);
	let last_names = get_file_data(last_name_url);
	
	return names[Math.floor(Math.random() * names.length)] + ' ' + last_names[Math.floor(Math.random() * last_names.length)]
}


function random_email(domain){
	const nicknames_url = chrome.runtime.getURL('data/nicknames.txt');
	let nicknames = get_file_data(nicknames_url);
	return nicknames[Math.floor(Math.random() * nicknames.length)] + '' + domain;
}


function random_phone(){
	return Math.floor(Math.random()*1000000000)+1;
}


function random_nip(){
	return Math.floor(Math.random()*10000000000)+1;
}

function random_city(){
	const cities_url = chrome.runtime.getURL('data/cities.txt');
	let cities = get_file_data(cities_url, '\n');
	return cities[Math.floor(Math.random() * cities.length)]
}

function get_text(char_number){
	const text_url = chrome.runtime.getURL('data/lorem_ipsum.txt');
	return get_file_data(text_url,'').slice(0,char_number);
}