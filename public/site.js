function adjustTextareaHeight() {
  const textarea = document.getElementById("htmlArea");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}
const makeItButton = document.getElementById("makeItButton");

makeItButton.addEventListener("click", () => {
  const htmlAreaValue = encodeURIComponent(htmlArea.value); // Encode the htmlArea value
  console.log(htmlAreaValue); // Log the encoded htmlArea value to the console

  // Then, post the htmlArea.value to the server
  fetch("/makeIt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    html: htmlAreaValue, // Use the encoded htmlArea value
  }),
})
  .then((response) => {
    if (!response.ok) {
      // Check if the response status is not OK (in the 4xx or 5xx range)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // If response is OK, proceed with parsing JSON
  })
  .then((data) => {
    // Handle the successful response
    window.location.href = data.url;
  })
  .catch((error) => {
    // Handle errors, including network errors and HTTP errors
    console.error("Fetch error:", error);
    alert("Fetch error:", error);
  }
)
});

const lookUrlButton = document.getElementById("lookUrlButton");

lookUrlButton.addEventListener("click", () => {
  const testhtmlAreaValue = testhtmlArea.value;
  console.log(testhtmlAreaValue); // Log the encoded htmlArea value to the console

  // Then, post the htmlArea.value to the server
  fetch("/lookUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: testhtmlAreaValue, // Use the encoded htmlArea value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("testhtmlArea").value = data.url;
    });
});
