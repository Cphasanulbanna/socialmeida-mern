import React, { useEffect, useState } from "react";
//packages
import styled from "styled-components";
import Haeder from "../includes/Header";
import Feed from "../feed/Feed";
import ProfilePage from "../profile/ProfileBox";
import { useSelector } from "react-redux";
import axios from "axios";
import FriendList from "../profile/FriendList";

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
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userInfo, id, accessToken]);

    const addFriend = (friendId) => {
        axios
            .put(
                `http://localhost:3001/users/${id}/${friendId}`,
                {
                    id: id,
                    friendId: friendId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Haeder />
            <MainContainer>
                <Wrapper className="wrapper">
                    <ProfilePage userData={userData} />
                    <Feed
                        userData={userData}
                        addFriend={addFriend}
                    />
                    <FriendList addFriend={addFriend} />
                </Wrapper>
            </MainContainer>
        </>
    );
}

export default Home;

const MainContainer = styled.section`
    width: 100%;
    /* height: 100vh; */
    padding-top: 80px;
    /* background-color: #8693ab; */
    /* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */
    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */

    /* background-image: linear-gradient(to top, #51f0c3 0%, #39c9c2 100%); */
    background-color: #f1f1f1;
`;

const Wrapper = styled.section`
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
`;
