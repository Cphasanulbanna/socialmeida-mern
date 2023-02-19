import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//PACKAGES
import styled from "styled-components";

function Post({ addFriend }) {
    const [posts, setPosts] = useState([]);
    const accessToken = useSelector((state) => state.data.token);
    const id = useSelector((state) => state.data.user._id);

    const handleSwipeDown = () => {
        fetchPosts();
    };

    const fetchPosts = () => {
        axios
            .get("http://localhost:3001/posts/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // const addFriend = (friendId) => {
    //     axios
    //         .put(
    //             `http://localhost:3001/users/${id}/${friendId}`,
    //             {
    //                 id: id,
    //                 friendId: friendId,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         )
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    return (
        <>
            {posts.map((post, index) => (
                <MainContainer
                    key={index}
                    onSwipeDown={handleSwipeDown}
                >
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
                        <RightBox onClick={() => addFriend(post.userId)}>
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
    /* background-image: linear-gradient(to top, #9970f7 0%, #f284d3 100%); */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    margin-bottom: 25px;
    border-radius: 10px;
    /* background-image: linear-gradient(to top, #9970f7 0%, #f284d3 100%); */
    /* background-image: linear-gradient(to top, #4bc149 0%, #56e297 100%); */
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
