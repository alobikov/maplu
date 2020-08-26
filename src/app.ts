import axios from "axios";
const form$ = document.querySelector("form")! as HTMLFormElement;
const input$ = form$.querySelector("#address")! as HTMLInputElement;
const yandexApiKey = "52a66d3b-db10-4104-9ad4-85f1b227a925";
var myMap;
var coordinates: any[];

declare var ymaps: any;
// Waiting for the API to load and DOM to be ready.

function init(): void {
  console.log("coordinates:", coordinates);
  /**
   * Creating an instance of the map and binding it to the container
   * with the specified ID ("map").
   */
  myMap = new ymaps.Map(
    "map",
    {
      /**
       * When initializing the map, you must specify
       * its center and the zoom factor.
       */
      center: coordinates.reverse(), // Moscow
      zoom: 10,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );
}

function submitHandler(event: Event) {
  event.preventDefault();
  const address = input$.value;
  console.log(address);
  axios
    .get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexApiKey}&format=json&geocode=${encodeURI(
        address
      )}`
    )
    .then((response: any) => {
      const tmpCoordinates = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        " "
      );
      coordinates = tmpCoordinates;
      // .map((item: string) =>
      //   parseFloat(parseFloat(item).toFixed(2))
      // );
      console.log(...coordinates);
      console.log(response);
      ymaps.ready(init);
    })
    .catch((error: any) => console.error(error));
}

form$.addEventListener("submit", submitHandler.bind(this));
