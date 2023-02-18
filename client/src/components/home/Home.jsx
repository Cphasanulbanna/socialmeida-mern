import React, { useEffect, useState } from "react";
//packages
import styled from "styled-components";
import Haeder from "../includes/Header";
import Feed from "../feed/Feed";
import ProfilePage from "../profile/ProfileBox";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
    const [userData, setUserData] = useState(null);

    const userInfo = useSelector((state) => state.data.user);
    const id = useSelector((state) => state.data.user._id);
    const accessToken = useSelector((state) => state.data.token);
    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3001/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userInfo, id, accessToken]);
    return (
        <>
            <Haeder />
            <MainContainer>
                <Wrapper className="wrapper">
                    <ProfilePage userData={userData} />
                    <Feed userData={userData} />
                </Wrapper>
            </MainContainer>
        </>
    );
}

export default Home;

const MainContainer = styled.section`
    width: 100%;
    height: 100vh;
    padding-top: 80px;
    background-color: #eee9e9;
`;

const Wrapper = styled.section`
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
`;
