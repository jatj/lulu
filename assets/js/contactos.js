$(document).ready(function(){
    function SerializeForm(form) {
        var arr = $(form).serializeArray();
        var data = {};
        for (var i in arr) {
            data[arr[i].name] = arr[i].value;
        }
        return data;
    }

    function Logout(){
        $("#cerrarSesion").click(function(){
            swal({
                title: "¿Estás seguro?",
                text: "Cerrarás la sesión actual",
                buttons: {
                    confirm: true,
                    cancel: true
                },
                icon: "info"
            }).then(function (res) {
                if(res == true){
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                        window.location.href = "index.html";
                    }).catch(function (error) {
                        // An error happened.
                        swal({
                            title: "Error",
                            text: "Lo sentimos, ocurrió un problema, intentalo mas tarde.",
                            buttons: {
                                confirm: true,
                            },
                            icon: "error"
                        });
                    });
                }
            });
        });
    }

    function CheckLogin(){
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log(user);
                // ...
            } else {
                // User is signed out.
                window.location.href = "login.html";
            }
        });
    }

    function ShowContactos(){
        // Initialize Cloud Firestore through Firebase
        var db = firebase.firestore();
        db.collection("contactos").get().then(function (querySnapshot) {
            var html = "";
            var count = 0;
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                count++;
                var data = doc.data();
                html += `
                    <tr>
                        <th scope="row">${count}</th>
                        <td>${data.email}</td>
                        <td>${data.tel}</td>
                        <td>${data.comment}</td>
                    </tr>
                `;
                if (count == querySnapshot.size) {
                    $("#contactos tbody").html(html);
                }
            });
        });
    }

    CheckLogin();
    ShowContactos();
    setTimeout(() => {
        Logout();
        $("#preloader").fadeOut();
        $(".wrapper").css("display", "block");
        $(".wrapper").css("opacity", "1");
    }, 1750);
});