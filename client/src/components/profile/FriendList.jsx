import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function FriendList({ addFriend }) {
    const [friends, setFriends] = useState([]);
    const accessToken = useSelector((state) => state.data.token);
    const id = useSelector((state) => state.data.user._id);
    const getAllFriends = () => {
        axios
            .get(`http://localhost:3001/users/${id}/friends`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response);
                setFriends(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllFriends();
    }, []);
    return (
        <>
            <MainContainer>
                <Heading>Friend List</Heading>
                {friends.map((friend) => (
                    <ListBox>
                        <ListItem>
                            <LeftBox>
                                <ProfileImageBox>
                                    <img
                                        src={friend?.avatar?.url}
                                        alt="profile-pic"
                                    />
                                </ProfileImageBox>
                                <InfoBox>
                                    <Name>
                                        {friend?.firstname} {friend?.lastname}
                                    </Name>
                                    <Place>{friend?.location}</Place>
                                </InfoBox>
                            </LeftBox>
                            <RightBox onClick={() => addFriend(friend?._id)}>
                                <img
                                    src={require("../../assets/images/post/add-friend.png")}
                                    alt="add-friend"
                                />
                            </RightBox>
                        </ListItem>
                    </ListBox>
                ))}
            </MainContainer>
        </>
    );
}

export default FriendList;

const MainContainer = styled.div`
    width: 25%;
    padding: 20px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* background-image: linear-gradient(to top, #9970f7 0%, #f284d3 100%); */
    /* background-color: #fff; */
    max-height: 400px;
    overflow-y: scroll;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */
    background-color: #fff;
`;
const Heading = styled.h2`
    margin-bottom: 10px;
`;
const ListBox = styled.div`
    margin-bottom: 20px;
`;
const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
`;
const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;
const ProfileImageBox = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const Name = styled.span`
    margin-bottom: 5px;
    font-size: 18px;
`;
const Place = styled.span`
    font-size: 14px;
`;
const RightBox = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
`;
