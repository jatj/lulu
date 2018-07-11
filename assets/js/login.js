$(document).ready(function(){
    function SerializeForm(form) {
        var arr = $(form).serializeArray();
        var data = {};
        for (var i in arr) {
            data[arr[i].name] = arr[i].value;
        }
        return data;
    }

    function CheckLogin() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                window.location.href = "contactos.html";
                // ...
            } else {
                // User is signed out.
            }
        });
    }

    function Login(){
        $("#loginForm").submit(function(e){
            e.preventDefault();
            var jsonData = SerializeForm("#loginForm");
            firebase.auth().signInWithEmailAndPassword(jsonData.email, jsonData.password).then(function(){
                swal({
                    title: "Éxito",
                    text: "Has iniciado sesión",
                    buttons: {
                        confirm: true,
                    },
                    icon: "success"
                }).then(function(res){
                    window.location.href = "contactos.html";
                })
            }).catch(function (error) {
                console.log(error);
                switch (error.code) {
                    case "auth/user-not-found":
                        swal({
                            title: "Correo electrónico incorrecto",
                            text: "La dirección de correo electrónico no esta registrada.",
                            buttons: {
                                confirm: true,
                            },
                            icon: "error"
                        });
                        break;
                    case "auth/wrong-password":
                        swal({
                            title: "Contraseña incorrecta",
                            text: "La contraseña proporcionada es incorrecta.",
                            buttons: {
                                confirm: true,
                            },
                            icon: "error"
                        });
                        break;
                
                    default:
                        swal({
                            title: "Error",
                            text: "Lo sentimos, ocurrió un problema, intentalo mas tarde.",
                            buttons: {
                                confirm: true,
                            },
                            icon: "error"
                        });
                        break;
                }
            });
        });
    }
    CheckLogin();
    setTimeout(() => {
        Login();
        $("#preloader").fadeOut();
        $(".wrapper").css("display", "block");
        $(".wrapper").css("opacity", "1");
    }, 1750);
});