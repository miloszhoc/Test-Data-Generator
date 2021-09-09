var output_field=document.querySelector("textarea[name='output']");

var selected_option=document.querySelector('#select_section');

var div_additional_options=document.getElementById('additional_options');
var p_info=document.getElementById('info');
var input_num_len=document.getElementById('amount_of_chars');

selected_option.addEventListener("change", function() {
	div_additional_options.style.display='none';
	choose_option(selected_option.value);
});


document.querySelector('#refresh').addEventListener("click", function(){
	choose_option(selected_option.value);
})


function choose_option(option){
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
		div_additional_options.style.display='block';
		input_num_len.style.display="block";
		p_info.style.display="none";

		output_field.value=get_text(input_num_len.value);
		break;
		case 'Char counter':
		div_additional_options.style.display='block';
		input_num_len.style.display="none";
		p_info.style.display="block";

		p_info.innerHTML = 'Length: ' + count_chars(output_field.value);
		break;
		case 'Encode Base64':
		div_additional_options.style.display='block';
		input_num_len.style.display="none";
		p_info.style.display="block";
		
		p_info.innerHTML = 'Encoded: ' + base64encode(output_field.value);
		break;
		case 'Decode Base64':
		div_additional_options.style.display='block';
		input_num_len.style.display="none";
		p_info.style.display="block";
		

		p_info.innerHTML = 'Decoded: ' + base64decode(output_field.value);
		break;
	}
	copy_text(output_field);
}


function copy_text(from_field){
	from_field.select();
	document.execCommand("copy");
}


function get_file_data(url, new_line='\n'){
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.overrideMimeType("text/plain");
	xmlHttp.send();
	if (new_line){
		return xmlHttp.responseText.split(new_line);	
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

function count_chars(string){
	return string.length;
}

function base64decode(string){
	return atob(string);
}


function base64encode(string){
	return btoa(string);
}