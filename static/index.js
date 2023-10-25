const currentURL = window.location.href.split("index.html")[0];
const lookURLButton = document.getElementById("lookUrlButton");

function adjustTextareaHeight() {
  const textarea = document.getElementById("htmlArea");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
  makeIt(textarea.value);
}

lookURLButton.addEventListener("click", () => {
  const testhtmlAreaValue = testhtmlArea.value;
  lookURL(testhtmlAreaValue);
});

const makeIt = async (html) => {
  const output = LZUTF8.compress(html, {
    outputEncoding: "StorageBinaryString",
  });;
  var output2 = LZUTF8.compress(output, {
    outputEncoding: "Base64",
  });
  // modify href in a tag
  document.getElementById("urlCode").href = currentURL + "url.html?" + output2;
  document.getElementById("urlCode").innerHTML =
    currentURL + "url.html?" + output2;

}

const lookURL = async (input) => {
  if (input == "") {
    alert("Cannot be empty")
    return;
  }

  // cut input to ? and get the value before ?
  input = input.split("?")[1];
  // input has \n, at the end, so we need to remove it
  input = input.slice(0, -1);
  
  const output = LZUTF8.decompress(input, {
    inputEncoding: "Base64",
  });
  
  const output2 = LZUTF8.decompress(output, {
    inputEncoding: "StorageBinaryString",
  });

  var output3 = decodeURIComponent(output2);
  document.getElementById("testhtmlArea").value = output3
}
