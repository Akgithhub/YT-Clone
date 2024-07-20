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
  const [video, setvideo] = useState([]);
  const [search, setsearch] = useState([]);
  const fetchVideo = async () => {
    const res = await axios.get(`http://localhost:4000/api/video/${type}`);
    try {
      if (res.data) {
        setvideo(res.data.data);
        console.log("Fetching vdo for home page : ", video);
      } else {
        console.log("Error while getting random vdos for home page");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, [type]);
  return (
    <Container>
      {video.map((video, index) => (
        <Card key={index} videos={video} />
      ))}
    </Container>
  );
};

export default Home;
