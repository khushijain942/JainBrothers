function order(val){
    var value=val.toString();
    console.log(value);
    var name="",price="",i=0;
    while(value.charAt(i)!='R'){
        name=name+value.charAt(i).toString();
        i++;
    }
    console.log(name);
    while(i<value.length){
    price=price+value.charAt(i).toString();
    i++;
    }
    console.log(price);
    //window.open('file://ContactUs.html', "_self");
   var s="fabric name: "+name+"\n"+"cost: "+price+"\nHey, i would like to order it.";
   window.location.href='ContactUs.html?info='+encodeURIComponent(s);

}
window.onload=function(){
    console.log("hey");
    console.log(window.location.href.substring((window.location.href).lastIndexOf('/')+1,window.location.href.length-1));
    if(window.location.href.substring((window.location.href).lastIndexOf('/')+1,window.location.href.length-1)!=("ContactUs.htm"))
    {
        var s=window.location.href.substring((window.location.href).lastIndexOf('=')+1,window.location.href.length-1);
        s=decodeURIComponent(s)+".";
        document.getElementById("exampleFormControlTextarea1").value=s;
        console.log(document.getElementById("exampleFormControlTextarea1").value);
    }
}