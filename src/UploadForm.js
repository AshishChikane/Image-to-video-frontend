import React, { useState } from "react";
import axios from "axios";

const VideoGenerator = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState(5);
  const [width, setWidth] = useState(""); // Added for width
  const [height, setHeight] = useState(""); // Added for height

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setVideoUrl(null);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("duration", duration);
    formData.append("width", width); // Added width to form data
    formData.append("height", height); // Added height to form data
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Error generating video", error);
    }
  };

  return (
    <div>
      <h2>Generate Video from Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label>Duration (in seconds):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Width:</label> {/* Input for width */}
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div>
          <label>Height:</label> {/* Input for height */}
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button type="submit">Generate Video</button>
      </form>

      {videoUrl && (
        <>
          <h3>Generated Video</h3>
          <video autoPlay muted width={width} height={height} controls>
            <source src={`http://localhost:5000${videoUrl}`} />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </div>
  );
};

export default VideoGenerator;
