import { useEffect, useState } from "react";
import pako from "pako";

function Home() {
  const options = {
    level: 9, // Maximum compression level
    strategy: pako.Z_FILTERED, // Filtered strategy
    to: "base64",
  };

  const jpCompress = (url) => {
    return pako.deflate(url, options);
  };

  const [url, setUrl] = useState("");
  let currentUrl = window.location.href;
  const [newUrl, setNewUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");

  useEffect(() => {
    document.title = "anysite";
    setCompressedUrl(jpCompress(url));
    setNewUrl(currentUrl + compressedUrl);
  }, [url, currentUrl, compressedUrl, jpCompress]);

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
