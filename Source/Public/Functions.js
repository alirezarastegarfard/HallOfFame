import React from "react";

// this section is for all functions we use repeatedly

export async function FetchDataFromAPI(ServiceName: String, Parameter, onResponse) {


    try {

        let response = await fetch("http://managers.ir/HalfOfFame/" + ServiceName + '.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 7000,
            body: Parameter
        });

        let Data = await response.json();

        onResponse(Data);

    } catch (error) {
        console.log(error);

        // if (error == "TypeError: Network request failed")
        //   showAlert("خطا در ارتباط با سرور" , () => FetchDataFromAPI(ServiceName , Parameter , onResponse));
    }

}
