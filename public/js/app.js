const form = document.querySelector(".form");
const input = document.querySelector(".input");
const info1 = document.querySelector(".info");
const info2 = document.querySelector(".info2");
const addressHtml = document.querySelector(".address");

form.addEventListener("submit", e => {
  e.preventDefault();
  const location = input.value;
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        info1.textContent = data.error;
      } else {
        const { forecast, location, address } = data;
        info1.textContent = forecast;
        info2.textContent = location;
        addressHtml.textContent = address;
      }
    });
  });
  input.value = "";
  info1.textContent = "";
  info2.textContent = "";
  addressHtml.textContent = "";
});
