// Visual Frameworks Project 4
// Harry D Lee 4/12
// main.js

// Wait until the DON is ready.
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementById Function
		function $(x){
			var theElement = document.getElementById(x);
			return theElement;
	}
	
		 //Creating a select field element and option
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), // this is a array of all the from tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "age");
		for(var i=0, j=ageGroup.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = ageGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//find the value of selected checkbox button.
	function getSelectedcheckbox(){
		var checkbox = document.forms[0].genre;
		for(var i=0; i<checkbox.length; i++){
			if(checkbox[i].checked){
				genreValue = checkbox[i].value;
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('bookForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('bookForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		
		}
	}
	
	function storeData(key){
		//Set the id to the existing key so it will save over the date.
		//The key is the sme key to be passed along the from the editsubmit event handler
		// The validate function and the pass into the storData function.
		if(!key){
			var id 							= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		//Gather up all our form field values and store in an object
		//Object properties contain array with the form label and iput value.
		getSelectedcheckbox();
		var item						= {};
			item.lists					= ["Lists:", $('lists').value];
			item.author					= ["Author:", $('author').value];
			item.title					= ["Title:", $('title').value];
			item.date					= ["Date", $('date').value];
			item.genre					= ["Genre:", genreValue];
			item.age					= ["Age:", $('age').value];
			item.subject				= ["Subject:", $('subject').value];
			item.rate					= ["Rate", $('rate').value];
			item.comments				= ["Comments", $('comments').value];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Save");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Date from local storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage to a vaiue an back to an object using JSON.
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.age[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Creat our edit and delete buttons link for our item in local storage.
		}
	}
	
	//Get right image to the category.
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT date required for this to work is coming from our json.js.
		//Store the JSON OBJECT into our Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));	
		}
	}
	
	//Makeing item links.
	//Creat a edit and delete links for our stored items when displayed.
	function makeItemLinks(key, linksLi){
		//add edit singe item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Information";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add a line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Information";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Get the date from our item form in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the from
		toggleControls("off");
		
		//poplate the form fields with current localStorage values.
		$('lists').value = item.lists[1];
		$('author').value = item.author[1];
		$('title').value = item.title[1];
		$('date').value = item.date[1];
		var checkbox = document.forms(0).genre;
		for (var i=0; i<checkbox.length; i++){
			if(checkbox[i].value == "Fiction" && item.genre[1] == "Fiction"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i].value == "Nonfiction" && item.genre[1] == "Nonfiction"){
				checkbox[i].setAttribute("checked", "checked");
			}
		}
		
		$('age').value = item.age[1];
		$('subject').value = item.subject[1];
		$('rate').value = item.rate[1];
		$('comments').value = item.comments[1];
		
		//Remove the initial listener form in input save cotact button.
		save.removeEventListener("click", storeData);
		//change the submit button value to edit button.
		$('submit').value = "Edit Information";
		var editSubmit = $('submit');
		//save the keys value in this function as a property of the editSubmit event.
		//so we can use that valuewhen we save the date ed edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;	
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information was deleted!");
			window.location.reload();
		}else{
			alert("information was NOT deleted.");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//deffine the elements we want to check
		var getLists = $('lists');
		var getAuthor = $('author');
		var getTitle = $('title');
		var getAge = $('age');
		var getSubject = $('subject');
		
		//Reset error Messages
		errMsg.innerHTML = "";
		getLists.style.border = "1px solid black";
		getAuthor.style.border = "1px solid black";
		getTitle.style.border = "1px solid black";
		getAge.style.border = "1px solid black";
		getSubject.style.border = "1px solid black";
		
		//get error messages
		var messageAry = [];
		//group validation
		if(getLists.value === "--Choose A List--"){
			var listsError = "Please choose a list.";
			getLists.style.border = "1px solid red";
			messageAry.push(listsError);
		}
		
		// Author Name Validation
		if(getAuthor.value === ""){
			var authorError = "Please Enter A Author Name.";
			getAuthor.style.border = "1px solid red";
			messageAry.push(authorError);
		}
		
		// Title Validation
		if(getTitle.value === ""){
			var titleError = "Please Enter A Title.";
			getTitle.style.border = "1px solid red";
			messageAry.push(titleError);
		}
		
		//Age validation
		if(getAge.value === "--Select Age Group--"){
			var ageError = "Select A Age Group.";
			getAge.style.border = "1px solid red";
			messageAry.push(ageError);
		}
		
		//Subject Validation
		if(getSubject.value === ""){
			var subjectError = "Choose A Subject.";
			getSubject.style.border = "1px solid red";
			messageAry.push(subjectError);
		}
		
		//if there were errors display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//It all is ok save data! send the key value 
			storeData(this.key);
		}			
	}
	
	// variable defaults
	var ageGroup = ["--Select Age Group--", "0-2", "3-5", "6-8", "9-12", "Teen", "Adult" ],
		genreValue,
		errMsg = $('errors');
	;
	makeCats();
		
	//Sat Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click",  getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);

});