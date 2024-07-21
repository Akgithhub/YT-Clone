import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/video/${type}`);
        console.log(res.data); // For debugging purposes
        // Ensure the data field is an array and update the state accordingly
        if (Array.isArray(res.data.data)) {
          setVideo(res.data.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setVideo([]); // Set to an empty array if data is not in expected format
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideo([]); // Handle errors by setting an empty array
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {Array.isArray(video) &&
        video.map((videoItem) => (
          <Card key={videoItem._id} video={videoItem} />
        ))}
    </Container>
  );
};

export default Home;
