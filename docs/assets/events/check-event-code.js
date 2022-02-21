
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  return hashHex;
}

// echo -n 'yes' | shasum -a 256

async function checkCODE() {
  let code = document.getElementById("event_code").value;
  //let code = event_code;
  //code = CODE.toLocaleLowerCase();

  console.log("Received this event_code : " + code);

  const digestHex = await digestMessage(code);
  console.log(digestHex);

  if (digestHex == "dd0c75954dbb3307b05cfa472129fe14deb49099d7f6d5cd0869f98d26e4cdf2") {
    //document.getElementById("checkCODE").innerHTML = "You got it right!";
    console.log("You got the right event code");
    location = "https://antoniofeijao.com/events/painball25/";
    //alert(' " ' + CODE + ' " is CORRECT. Well Done!');
    //location.href = "./02kjdht.html";
    //document.getElementById("NEXT").style.visibility = "visible";
  } else if (code == "no") {
    //document.getElementById("checkCODE").innerHTML = "Ohhh no...";
    console.log("Don't know that event code..");
    //alert(' " ' + CODE + ' " is INCORRECT. Not so well done!');
    //location.href = "./02kjdht.html";
    //document.getElementById("NEXT").style.visibility = "hidden";
  } else {
    //document.getElementById("checkCODE").innerHTML = '"' + CODE + '" is NOT correct.';
    //document.getElementById("NEXT").style.visibility = "hidden";
    //alert('"' + CODE + '" is NOT correct.');
    console.log("Ohh ohh, end of if-then-else... nothing here ");
    return false;
  }
}


// from: https://stackoverflow.com/a/40031979/9014097
//function buf2hex(buffer) { // buffer is an ArrayBuffer
//    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
//}

	
// from https://stackoverflow.com/a/11562550/9014097
//function buf2Base64(buffer) {
//    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
//}

	
// from https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
//async function digest_this(event_code) {

  //  inputBytes = new TextEncoder().encode(event_code);

    //const hashBytes = await window.crypto.subtle.digest('SHA-256', inputBytes);

    // console.log("This is raw hashBytes :" + hashBytes);
    // console.log("This is the JSON.stringify of hashBytes :" + JSON.stringify(hashBytes) );

    //console.log(JSON.stringify({ hash: buf2hex(hashBytes) }));     // output sample {"hash":"d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"};
    //console.log(JSON.stringify({ hash: buf2Base64(hashBytes) }));  // output sample {"hash":"16j7swfXgJRpypq8sAguT41WUeRtPNt2LQLQvzfJ5ZI="};

    //digest_result = JSON.stringify(buf2hex(hashBytes));
    //console.log("digest_result is : " + digest_result );

    //pass1 = "be777e1c1380a74447b462723b7002240abd5f2714187f240c63699ba9810ee5";
    //pass2 = "be777e1c1380a74447b462723b7002240abd5f2714187f240c63699ba9810ee5";

//    if ( digest_result == pass1 ) {
  //      console.log("Hello from digest_result " + digest_result );
    //    console.log("Hello from pass1 " + pass1 );
        // location = "https://antoniofeijao.com/"
//    }
  //  else {
    //  console.log("wrong code...");
      ///"alert("Not sure about that event code...")
//    }

    //alert("Ready to move on?");
	//console.log("Ready to move on...");


//}


//function check_my_password(event_code) {
  //  digest_result = digest_this(event_code)
//    console.log("digest_result in the function is : " + digest_result )
//}


