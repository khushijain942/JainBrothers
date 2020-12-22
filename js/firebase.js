function contactbtn(){
	console.log("hello");
	var database = firebase.database();
	var token, message, count=0;
	token=document.getElementById('exampleFormControlInput1').value;
	console.log(token);
	message=document.getElementById('exampleFormControlTextarea1').value;
	/*firebase.database().ref().child('token');*/
	//read data
	if(token.trim()=="" || token.length!=10 || 
	token.charAt[0]==0 || (parseInt(token)).toString().length!=token.length)
		alert("please enter a valid token id!");
	else if(message.trim()=="") alert("message box can't be empty!");
	else
	{
	database.ref('/tokens/'+token).once('value').then(function(snapshot) {
		if(snapshot.val()!=null)
		{
			database.ref('/tokens/'+token+'/message/').once('value').then(function(snapshot) {
				//var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
				if(snapshot.val()==null)
				{
					database.ref().child('/tokens/'+token+'/message').push().key;
					database.ref().child('/tokens/'+token+'/mcount').push().key;
					database.ref('/tokens/'+token+'/message/').set("--1-- "+message);
					database.ref('/tokens/'+token+'/mcount/').set(1);
					console.log("snap doesnt exist");
				}
				else if(snapshot.val()!=null)
				{
					console.log("in2");
					var oldMessage;
					database.ref('/tokens/' + token+'/mcount/').once('value').then(function(snapshot) {
						count=snapshot.val();
						database.ref('/tokens/'+token+'/mcount').set(count+1);
					});
					database.ref('/tokens/' + token+'/message/').once('value').then(function(snapshot) {
						oldMessage=snapshot.val();
						database.ref('/tokens/'+token+'/message').set(oldMessage+" --"+(count+1).toString()+"-- "+message);
					});
					console.log("snap exist");
				}
			});
		}
		else alert("No such token id found!\n Please recheck");
	});
	alert('query uploaded!\nWe\'ll respond to you soon within 24hrs.\nKeep checking your registered mail id for further updates');
	}
}

function registerbtn(){
	var database = firebase.database();
	var name,mob,email;
	var valid=true;
	name=document.getElementsByClassName('namee')[0].value;
	mob=document.getElementsByClassName('mobb')[0].value;
	email=document.getElementById('exampleInputEmail1').value;
	/*firebase.database().ref().child('token');*/
//validity check
if(name.trim()=="" || name.length>100){
	valid=false;
	alert("please enter a valid name!");
}
else if(mob.trim()=="" || mob.length!=10 || mob.charAt[0]==0 || (parseInt(mob)).toString().length!=mob.length){
	valid=false;
	alert("please enter a valid mobile number!");
}
else if(email.trim()=="" || email.length>100){
	valid=false;
	alert("please enter a valid email!");
}
if(valid)
{
	for(var i=0;i<name.length;i++)
	{
		if(name.toLowerCase().charAt(i)==name.toUpperCase().charAt(i) && name.charAt(i)!=' ')
		{
			console.log((name.toLowerCase()).charAt(i));
			console.log(name.toUpperCase().charAt(i));
			console.log(name.charAt(i));
			valid=false;
			alert("please enter a valid name!");
			break;
		}
	}
	console.log(valid);
	if(valid)
	{
		var count=0;
		for(var i=0;i<email.length;i++)
		{
			if(email.charAt(i)!=email.toLowerCase().charAt(i))
			{
				valid=false;
				//alert
				break;
				console.log("here");
			}
			if(email.charAt(i)=='@' && email.charAt(i-1)!=undefined)
			count++;
			if(count==1 && email.charAt(i)=='.' && email.charAt(i-1)!=undefined &&
			email.charAt(i-1)!='@')
			count++;
		}
		if(count!=2) 
		{
			valid=false;
			console.log("its here");
			//alert
		}
		if(!valid)
		alert("please enter a valid email!");
	}
}
if(valid)
{
	firebase.database().ref('tokens/'+mob+"/").set({
		name: name,
		mob: mob,
		email: email
	});
	alert("successfully registered with token id "+mob+" !!");
}
}