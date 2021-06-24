var output_field=document.querySelector("textarea[name='output']");

var selected_option=document.querySelector('#select_section');

selected_option.addEventListener("change", function() {
	choose_option(selected_option.value);
});


function choose_option(option){
	switch (option){
		case 'Name':
		output_field.value=random_name();
		break;
		case 'Last Name':
		output_field.value='LastName';
		break;
		case 'Email':
		output_field.value='Email';
		break;
		case 'Phone':
		output_field.value='Phone';
		break;
		case 'NIP':
		output_field.value='NIP';
		break;
		case 'Text':
		output_field.value='Tekst';
		break;
	}
	copy_text(output_field);
}

function copy_text(from_field){
	from_field.select();
	document.execCommand("copy");
}


function random_name(){
	let names=['Andrzej', 'Anna', 'Jan', 'Karolina']
	return names[Math.floor(Math.random() * names.length)]
}


function random_last_name(){
	
}


function random_email(){
	
}


function random_phone(){
	
}


function random_nip(){
	
}


function random_text(){
	
}