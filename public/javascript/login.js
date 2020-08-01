const { response } = require("express");

let loginWithFacebook = _ => _



function fbSDKLoaded() {
    //ready to use fb object

    FB.getLoginStatus(response => {
        if (response.status == "not_authorized") {
            loginWithFacebook = _ => {
                FB.login(response => {
                    console.log(response)
                })
            }

        }
    })
}