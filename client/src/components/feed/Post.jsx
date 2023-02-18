import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//PACKAGES
import styled from "styled-components";

function Post() {
    const [posts, setPosts] = useState([]);
    const accessToken = useSelector((state) => state.data.token);

    useEffect(() => {
        axios
            .get("http://localhost:3001/posts/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken]);
    return (
        <>
            {posts.map((post) => (
                <MainContainer>
                    <TopBox>
                        <LeftBox>
                            <ProfileIconBox>
                                <img
                                    src={post.userPicturePath}
                                    alt="profile"
                                />
                            </ProfileIconBox>
                            <InfoBox>
                                <Name>
                                    {post.firstname} {post.lastname}
                                </Name>
                                <Place>{post.location}</Place>
                            </InfoBox>
                        </LeftBox>
                        <RightBox>
                            <img
                                src={require("../../assets/images/post/add-friend.png")}
                                alt="add-friend"
                            />
                        </RightBox>
                    </TopBox>
                    <BottomBox>
                        <Heading>{post.description}</Heading>
                        <PostImageBox>
                            <img
                                src={post.postImage.url}
                                alt="post"
                            />
                        </PostImageBox>
                    </BottomBox>
                </MainContainer>
            ))}
        </>
    );
}

export default Post;

const MainContainer = styled.section`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;
const TopBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;
const ProfileIconBox = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    margin-right: 10px;
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`
    margin-bottom: 8px;
    font-size: 15px;
`;
const Place = styled.span`
    font-size: 12px;
`;
const RightBox = styled.div`
    cursor: pointer;
    width: 15px;
    height: 15px;
`;
const BottomBox = styled.div``;

const Heading = styled.h2`
    margin-bottom: 15px;
`;

const PostImageBox = styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
`;
