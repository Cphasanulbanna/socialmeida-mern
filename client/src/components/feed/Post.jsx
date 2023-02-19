import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//PACKAGES
import styled from "styled-components";

//IMAGES
import like from "../../assets/images/post/heart.png";
import redHeart from "../../assets/images/post/heart-red.png";

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

    const likePost = (postId) => {
        axios
            .put(
                `http://localhost:3001/posts/${postId}/like`,
                {
                    userId: id,
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
                    <BottomContainer>
                        <Heading>{post.description}</Heading>
                        <PostImageBox>
                            <img
                                src={post.postImage.url}
                                alt="post"
                            />
                        </PostImageBox>
                        <BottomBox>
                            <LefIconsBox>
                                <LikeBox onClick={() => likePost(post._id)}>
                                    <img
                                        src={like}
                                        alt="like"
                                    />
                                    {Object.keys(post?.likes).length}
                                    {console.log(post)}
                                </LikeBox>
                                <CommentBox>
                                    <img
                                        src={require("../../assets/images/post/comment.png")}
                                        alt="comment"
                                    />
                                </CommentBox>
                            </LefIconsBox>
                            <RightIconBox>
                                <img
                                    src={require("../../assets/images/post/share.png")}
                                    alt="share"
                                />
                            </RightIconBox>
                        </BottomBox>
                    </BottomContainer>
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

    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */
    background-color: #fff;
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
const BottomContainer = styled.div``;

const Heading = styled.h2`
    margin-bottom: 15px;
`;

const PostImageBox = styled.div`
    border-radius: 10px;
    overflow: hidden;
    max-height: 500px;
    width: 100%;
`;

const BottomBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
`;

const LefIconsBox = styled.div`
    display: flex;
    align-items: center;
`;
const LikeBox = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 25px;
    display: flex;
    align-items: center;
    img {
        margin-right: 5px;
    }
`;
const CommentBox = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
`;
const RightIconBox = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
`;
