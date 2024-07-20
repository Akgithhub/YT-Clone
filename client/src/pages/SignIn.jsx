import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [email2, setemail2] = useState("");
  const [password2, setpassword2] = useState("");
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:4000/api/auth/signup", {
      name,
      email,
      password,
    });
    if (res) {
      console.log("user signed up successfully", res.data);
      setname("");
      setemail("");
      setpassword("");
    } else {
      console.log("errpr while signing up");
    }
  };
  const handleregister = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signin", {
        email2,
        password2,
      });
      if (res) {
        console.log("User signed in successfully", res.data);
        setemail2("");
        setpassword2("");
      }
    } catch (error) {
      
        console.error(error);

    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube +</SubTitle>
        <Input
          placeholder="email"
          value={email2}
          onChange={(e) => {
            setemail2(e.target.value);
          }}
        />
        
        <Input
          type="text"
          placeholder="password"
          value={password2}
          onChange={(e) => {
            setpassword2(e.target.value);
          }}
        />
        <Button onClick={handleregister}>Sign in</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          value={name}
          required={true}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <Input
          placeholder="email"
          value={email}
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="password"
          value={password}
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <Button onClick={handleLogin}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
