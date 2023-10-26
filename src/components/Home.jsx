import { useEffect, useState } from "react";
import pako from "pako";

function Home() {
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");

  useEffect(() => {
    document.title = "anysite";

    const options = {
      level: 9, // Maximum compression level
      strategy: pako.Z_FILTERED, // Filtered strategy
      to: "string",
    };

    const jpCompress = (url) => {
      const compressedUrl = pako.deflate(url, options);
      setCompressedUrl(compressedUrl);
      setNewUrl(currentUrl + compressedUrl); // Move this line inside the jpCompress function
    };

    let currentUrl = window.location.href; // Define currentUrl here

    jpCompress(url); // Call jpCompress to set the compressed URL
  }, [url]);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = newUrl;
  };

  return (
    <div>
      <h1>anysite</h1>
      <form>
        <input type="text" value={url} onChange={(e) => handleChange(e)} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
        <p>{newUrl}</p>
      </form>
    </div>
  );
}

export default Home;
