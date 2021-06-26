var output_field=document.querySelector("textarea[name='output']");

var selected_option=document.querySelector('#select_section');

selected_option.addEventListener("change", function() {
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
		output_field.value='Email';
		break;
		case 'Phone':
		output_field.value=random_phone();
		break;
		case 'NIP':
		output_field.value=random_nip();
		break;
		case 'Text':
		output_field.value=get_text(10);
		break;
	}
	copy_text(output_field);
}


function copy_text(from_field){
	from_field.select();
	document.execCommand("copy");
}


function get_file_data(url, split_lines=true){
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.overrideMimeType("text/plain");
	xmlHttp.send();
	if (split_lines){
		return xmlHttp.responseText.split('\r\n');	
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


function random_email(){
	
}


function random_phone(){
	return Math.floor(Math.random()*1000000000)+1;
}


function random_nip(){
	return Math.floor(Math.random()*10000000000)+1;
}


function get_text(char_number){
	const text_url = chrome.runtime.getURL('data/lorem_ipsum.txt');
	return get_file_data(text_url,false).slice(0,char_number);
}