/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        /*this.receivedEvent('deviceready');*/

        $("#btnRegister").click(register);
        $("#btnLogin").click(login);
        $("#btnGetImage").click(getImage);
        if ((location.pathname + location.search).substr(1) === "home.html") {
            allImages();
        }
        if ((location.pathname + location.search).substr(1) === "myPhotos.html") {
            myPhotos();
        }

    }//,

    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
     var parentElement = document.getElementById(id);
     var listeningElement = parentElement.querySelector('.listening');
     var receivedElement = parentElement.querySelector('.received');
     
     listeningElement.setAttribute('style', 'display:none;');
     receivedElement.setAttribute('style', 'display:block;');
     
     console.log('Received Event: ' + id);
     }*/
};

app.initialize();


var url = "https://sgemp-p07.000webhostapp.com/";

function register() {
    console.log($("#inputUsernameRegister").val() + " " + $("#inputEmailRegister").val() + " " + $("#inputPasswordRegister").val());

    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practica07/php/register.php",
        data: {
            username: $("#inputUsernameRegister").val(),
            email: $("#inputEmailRegister").val(),
            password: $("#inputPasswordRegister").val()
        },
        success: function (response) {
            console.log(response);
            if (response === 'ok') {
                window.location.replace("index.html");
            }
        }
    });

}

function login() {
    console.log($("#inputEmailLogin").val() + " " + $("#inputPasswordLogin").val());

    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: url + "practica07/php/login.php",
        xhrFields: {
            withCredentials: true
        },
        data: {
            email: $("#inputEmailLogin").val(),
            password: $("#inputPasswordLogin").val()
        },
        success: function (response) {
            console.log(response);
            if (response === 'ok') {
                window.location.replace("home.html");
            }
        }
    });
}

function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );

}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, url + "practica07/php/uploadPhoto.php", win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode.toString() + "\n");
    console.log("Response = " + r.response.toString() + "\n");
    console.log("Sent = " + r.bytesSent.toString() + "\n");
    alert("Code Slayer!!!");
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

function allImages() {
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practica07/php/allPhotos.php",
        success: function (response) {
            console.log(response);
            $("#allPhotos").html(response);
        }
    });
}

function myPhotos() {
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practica07/php/myPhotos.php",
        success: function (response) {
            console.log(response);
            $("#myPhotos").html(response);
        }
    });
}

function deletePhoto(data){
   $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practica07/php/deletePhoto.php",
        data: {
            id_photo: data
        },
        success: function (response) {
            console.log(response);
            if(response === "ok"){
                $("#"+data).remove();
            }
        }
    });
}


function votePhoto(id, vote){
  console.log("id:"+id + " vote:"+vote);
}