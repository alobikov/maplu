import axios from "axios";
const form$ = document.querySelector("form");
const input$ = form$.querySelector("#address");
const yandexApiKey = "52a66d3b-db10-4104-9ad4-85f1b227a925";
function submitHandler(event) {
    event.preventDefault();
    const address = input$.value;
    console.log(address);
    axios
        .get(`https://geocode-maps.yandex.ru/1.x/?apikey=${yandexApiKey}&geocode=${encodeURI(address)}`)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
}
form$.addEventListener("submit", submitHandler.bind(this));
//# sourceMappingURL=app.js.map