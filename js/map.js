$(document).one('pageinit', function() {
	// Display contactsvar map = null;
	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(new google.maps.LatLng(49.574036, 34.5113945));
	});
	// Note: This example requires that you consent to location sharing when
	// prompted by your browser. If you see the error "The Geolocation service
	// failed.", it means you probably did not give permission for the browser to
	// locate you.
	function initMap() {
		var map = new google.maps.Map(document.getElementById('mymap'), {
			center: {
				lat: 49.574036,
				lng: 34.5113945
			},
			zoom: 6,
			styles: [{
				elementType: 'geometry',
				stylers: [{
					color: '#242f3e'
				}]
			}, {
				elementType: 'labels.text.stroke',
				stylers: [{
					color: '#242f3e'
				}]
			}, {
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#746855'
				}]
			}, {
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#d59563'
				}]
			}, {
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#d59563'
				}]
			}, {
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{
					color: '#263c3f'
				}]
			}, {
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#6b9a76'
				}]
			}, {
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{
					color: '#38414e'
				}]
			}, {
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#212a37'
				}]
			}, {
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#9ca5b3'
				}]
			}, {
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{
					color: '#746855'
				}]
			}, {
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#1f2835'
				}]
			}, {
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#f3d19c'
				}]
			}, {
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{
					color: '#2f3948'
				}]
			}, {
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#d59563'
				}]
			}, {
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{
					color: '#17263c'
				}]
			}, {
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#515c6d'
				}]
			}, {
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{
					color: '#17263c'
				}]
			}]
		});
		var infoWindow = new google.maps.InfoWindow({
			map: map
		});
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				infoWindow.setPosition(pos);
				infoWindow.setContent('The best sity!');
				map.setCenter(pos);
			}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	}
	showContacts();
	// Add Stats Handler
	$('#submitAdd').on('tap', addContact);
	// Edit Stats Handler
	$('#submitEdit').on('tap', editContact);
	// Delete Stats Handler
	$('#stats').on('tap', '#deleteLink', deleteContact);
	$('#stats').on('tap', '#moreLink', moreContact);
	// Set Current Stats Handler
	$('#stats').on('tap', '#editLink', setCurrent);
	// Clear Handler
	$('#clearContacts').on('tap', clearContacts);
	// Show all stats on homepage/
	function showContacts() {
		//if
		// get contacts string from localStorage
		var contacts = getContactsObject();
		// Check if empty
		if ((contacts != '' && contacts != null) && contacts != undefined) {
			for (var i = 0; i < contacts.length; i++) {
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong></strong>' + contacts[i]["name"] + ' <br><strong></strong>' + contacts[i]["phone"] + ' <div class="controls">' + '<a target="_blank" href="' + contacts[i]["url"] + '">Visit</a> | <a href="#home" id="moreLink" data-name="' + contacts[i]["name"] + '" data-phone="' + contacts[i]["phone"] + '" data-url="' + contacts[i]["url"] + '" data-info="' + contacts[i]["info"] + '">More</a> | <a href="#edit" id="editLink" data-name="' + contacts[i]["name"] + '" data-phone="' + contacts[i]["phone"] + '" data-url="' + contacts[i]["url"] + '" data-info="' + contacts[i]["info"] + '">Edit</a> | <a href="#" id="deleteLink" data-name="' + contacts[i]["name"] + '" data-phone="' + contacts[i]["phone"] + '" data-url="' + contacts[i]["url"] + '" data-info="' + contacts[i]["info"] + '" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
			}
			$('#home').bind('pageinit', function() {
				$('#stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no logged contacts</p>');
		}
	}
	/*function scrollMore(){
		$("a[href='#home']").click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});
	
}*/
	// More A contact
	function moreContact() {
		// Set stringified object to localStorage
		// Store data in localstorage 
		localStorage.setItem('currentPhone', $(this).data('phone'));
		localStorage.setItem('currentName', $(this).data('name'));
		localStorage.setItem('currentUrl', $(this).data('url'));
		localStorage.setItem('currentInfo', $(this).data('info'));
		//get current values
		currentPhone = localStorage.getItem('currentPhone');
		currentName = localStorage.getItem('currentName');
		currentUrl = localStorage.getItem('currentUrl');
		currentInfo = localStorage.getItem('currentInfo');
		var contacts = getContactsObject();
		if ((contacts != '' && contacts != null) && contacts != undefined) {
			// Loop through contacts
			for (var i = 0; i < contacts.length; i++) {
				if ((contacts[i].name == currentName && contacts[i].phone == currentPhone) && (contacts[i].url == currentUrl && contacts[i].info == currentInfo)) {
					$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong></strong>' + contacts[i]["name"] + ' <br><strong></strong>' + contacts[i]["phone"] + ' <br><strong></strong>' + contacts[i]["url"] + ' <br><strong></strong>' + contacts[i]["info"] + ' <div class="controls">' + '<a target="_blank" href="' + contacts[i]["url"] + '">Visit</a> | <a target="_self" href="index.html" id="backLink">Back</a> | <a href="#edit" id="editLink" data-name="' + contacts[i]["name"] + '" data-phone="' + contacts[i]["phone"] + '" data-url="' + contacts[i]["url"] + '" data-info="' + contacts[i]["info"] + '">Edit</a> | <a href="#" id="deleteLink" data-name="' + contacts[i]["name"] + '" data-phone="' + contacts[i]["phone"] + '" data-url="' + contacts[i]["url"] + '" data-info="' + contacts[i]["info"] + '" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
				} //if
			} //for
			$('#home').bind('pageinit', function() {
				$('#stats').listview('refresh');
			}); //func
			//scrollMore();
			$("a[href='#home']").click(function() {
				$("html, body").animate({
					scrollTop: $(document).height()
				}, "slow");
				return false;
			});
		} //if null
	} //fmain //scrolldown
	/*
	function validateForm() {
	var isValid = true;
	$('.form-field').each(function() {
	if ( $(this).val() === '' )
	isValid = false;
	});
	return isValid;
	}
	/*	
	function validateSignup(name, phone, url, info)
	{   
	    $.validator.addMethod(
	            "regex",
	            function(value, element, regexp) 
	            {
	                if (regexp.constructor != RegExp)
	                    regexp = new RegExp(regexp);
	                else if (regexp.global)
	                    regexp.lastIndex = 0;
	                return this.optional(element) || regexp.test(value);
	            },
	            "Please check your input."
	    );
	    $('.signupForm').validate(//????????????????????????????# to html either
	    {
	        onkeyup : false,
	        errorClass: "req_mess",
	        ignore: ":hidden",
	        validClass: "signup_valid_class",
	        errorClass: "signup_error_class",
	        rules:
	        {
	            name:
	            {
	                required: true,
	                //name: true,
	                regex: /^[a-zA-Z]+$/,
	            },
	           
	            phone:
	            {
	                required: true,
	                regex: /^[+-]{1}[0-9]{1,3}\-[0-9]{10}$/,
	            },
	            url:
	            {
	                required: true,
	                //url: true,
	                regex: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
	            },
	            info:
	            {
	                required: true,
	                //info: true,
	                regex: /^[a-zA-Z]+$/,
	            },
	        },
	        messages: 
	        {
	            name: 
	            {
	                required: 'You must enter a name',
	                regex: 'Please enter a valid name without spacial chars, ie, Name'
	            },
	       
	            phone: 
	            {
	                required: "Please enter your phone number",
	                regex: "e.g. +38-0000000000"    
	            },
	            url: 
	            {
	                required: 'You must enter a url',
	                regex: 'Please enter a valid url without spacial chars, ie, http://'
	            },
	            info: 
	            {
	                required: 'You must enter a info',
	                regex: 'Please enter a valid info without spacial chars, ie, Chars'
	            },
	        },
	        submitHandler: function (submitAdd, submitEdit)
	        {
	            return true;
	        }
	    });
	}
	*/
	/*
	function generateId(){
	
console.log(contact);
try{
   if(localStorage[contacts].length === 0){ return 1;
		}else{
 let contact_int = localStorage.length + 1;
    contact.id = contact_int;
    //console.log(contact.id);
 let itemExists = document.getElementById(contact.id);
    if(itemExists !== null) {
      itemExists.remove();
      }
    	    } catch (e) {
  if (e !==  contact.id) {
  alert('Error data');
 }
 }
 */
	// Add A contact
	function addContact() {
		//let contact = {
		//name: [],
		//phone: [],
		//url: [],
		//info: [],
		//id: []
		//}
		//generateId();
		let name;
		let phone;
		let url;
		let info;
		// Get form values
		name = $('#addName').val();
		phone = $('#addPhone').val();
		url = $('#addUrl').val();
		info = $('#addInfo').val();
		//let id = contact.id;
		if ((name != '' && name != null) && name != undefined) {
			// Create 'contact' object for passing into HTML5 local storage API
			//validateForm();
			//validateSignup(name, phone, url, info);
			var contact = {
				//id: id;
				name: name,
				phone: phone,
				url: url,
				info: info
			};
			var contacts = getContactsObject();
			// Add contact to contacts array
			contacts.push(contact);
			alert('contact Added');
			// Local storage values have to be strings
			// Set stringified object to localStorage
			localStorage.setItem('contacts', JSON.stringify(contacts));
			// Redirect to index page
			window.location.href = "index.html";
		} else {
			alert('Please, enter Name!');
		}
		return false;
	}
	// Edit A contact
	function editContact() {
		//get current values
		currentPhone = localStorage.getItem('currentPhone');
		currentName = localStorage.getItem('currentName');
		currentUrl = localStorage.getItem('currentUrl');
		currentInfo = localStorage.getItem('currentInfo');
		var contacts = getContactsObject();
		// Loop through contacts
		for (var i = 0; i < contacts.length; i++) {
			if ((contacts[i].name == currentName && contacts[i].phone == currentPhone) && (contacts[i].url == currentUrl && contacts[i].info == currentInfo)) {
				contacts.splice(i, 1);
			}
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
		// Get form values
		var name = $('#editName').val();
		var phone = $('#editPhone').val();
		let url = $('#editUrl').val();
		let info = $('#editInfo').val();
		// Create 'contact' object
		var update_contact = {
			name: name,
			phone: phone,
			url: url,
			info: info
		};
		// Add contact to contacts array
		contacts.push(update_contact);
		alert('contact Updated');
		// Set stringified object to localStorage
		localStorage.setItem('contacts', JSON.stringify(contacts));
		// Redirect
		window.location.href = "index.html";
		return false;
	}
	//function compareContacts(){}//*****************drop?????????????????/
	function clearContacts() {
		localStorage.removeItem('contacts');
		$('#stats').html('<p>You have no logged Contacts</p>');
	}
	// Delete A contact
	function deleteContact() {
		// Set stringified object to localStorage
		// Store data in localstorage 
		localStorage.setItem('currentPhone', $(this).data('phone'));
		localStorage.setItem('currentName', $(this).data('name'));
		localStorage.setItem('currentUrl', $(this).data('url'));
		localStorage.setItem('currentInfo', $(this).data('info'));
		//get current values
		currentPhone = localStorage.getItem('currentPhone');
		currentName = localStorage.getItem('currentName');
		currentUrl = localStorage.getItem('currentUrl');
		currentInfo = localStorage.getItem('currentInfo');
		var contacts = getContactsObject();
		// Loop through contacts
		for (var i = 0; i < contacts.length; i++) {
			if ((contacts[i].name == currentName && contacts[i].phone == currentPhone) && (contacts[i].url == currentUrl && contacts[i].info == currentInfo)) {
				contacts.splice(i, 1);
			}
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
		alert('contact Deleted');
		// Redirect
		window.location.href = "index.html";
		return false;
	}
	// Get the current contacts object
	function getContactsObject() {
		// Set contacts array
		var contacts = new Array();
		// Get current contacts from local storage; it will be returned as a default string
		var currentContacts = localStorage.getItem('contacts');
		// Check localStorage for data
		if (currentContacts != null) {
			// Set it to contacts
			var contacts = JSON.parse(currentContacts);
		}
		// Return contacts object; newest contact first by date
		return contacts.sort(function(a, b) {
			return new Date(b.date) - new Date(a.date)
		});
	}
	// Set the current clicked 
	function setCurrent() {
		// Set local Storage items
		localStorage.setItem('currentName', $(this).data('name'));
		localStorage.setItem('currentPhone', $(this).data('phone'));
		localStorage.setItem('currentUrl', $(this).data('url'));
		localStorage.setItem('currentInfo', $(this).data('info'));
		//set form value
		$('#editName').val(localStorage.getItem('currentName'));
		$('#editPhone').val(localStorage.getItem('currentPhone'));
		$('#editUrl').val(localStorage.getItem('currentUrl'));
		$('#editInfo').val(localStorage.getItem('currentInfo'));
	}
});