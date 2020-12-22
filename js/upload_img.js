function submit(){
    var database = firebase.database();
    var token=document.getElementById('exampleFormControlInput1').value;
    var imagebox=document.getElementById("uploadImageBox");
    var url=document.getElementById("url").value;
    var i=url.lastIndexOf("/");
    url=url.substring(0,i+1)+"preview";

    if(token.trim()=="" || token.length!=10 || 
	token.charAt[0]==0 || (parseInt(token)).toString().length!=token.length)
		alert("please enter a valid token id!");
	else if(url.trim()=="" || url.indexOf("https://drive.google.com/")==null) alert("invalid url entered!");
	else
	{
	database.ref('/tokens/'+token).once('value').then(function(snapshot) {
		if(snapshot.val()!=null)
		{
			database.ref('/tokens/'+token+'/custom/').once('value').then(function(snapshot) {
				//var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
				if(snapshot.val()==null)
				{
					database.ref().child('/tokens/'+token+'/custom').push().key;
                    database.ref('/tokens/'+token+'/custom/').set(url);
                    imagebox.src=url;
                    alert('successfully uploaded custom print!!\nWe\'ll respond to you soon within 24hrs.\nKeep checking your registered mail id for further updates');
                }
                else if(snapshot.val()!=null)
                {
                database.ref('/tokens/' + token+'/custom/').once('value').then(function(snapshot) {
                    database.ref('/tokens/'+token+'/custom').set(url);
                    imagebox.src=url;
                    alert("successfully uploaded custom print!!");
                });
                }
            });
        }
        else alert("No such token id found!\n Please recheck");
    });
    }
}