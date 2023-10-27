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
  const output = await compress(html);
  // modify href in a tag
  document.getElementById("urlCode").href = currentURL + "url.html?" + output;
  document.getElementById("urlCode").innerHTML =
    currentURL + "url.html?" + output;

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
  
  const output = await decompress(input);
  document.getElementById("testhtmlArea").value = output
}

const compress = async (input) => {
  const output = LZUTF8.compress(input, {
    outputEncoding: "Base64",
  });
  return output;
};

const decompress = async (input) => {
  const output = LZUTF8.decompress(input, {
    inputEncoding: "Base64",
  });
  return output;
};
