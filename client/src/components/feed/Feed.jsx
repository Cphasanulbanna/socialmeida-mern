import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
//PACKAGES
import styled from "styled-components";
import Post from "./Post";

function Feed({ userData, addFriend }) {
    const [description, setDescription] = useState("");
    const [postImage, setPostImage] = useState("");

    const accessToken = useSelector((state) => state.data.token);
    const id = useSelector((state) => state.data.user._id);

    const onImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPostImage(reader.result);
        };
    };

    const createPost = () => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const formData = new FormData();
        formData.append("description", description);
        formData.append("postImage", postImage);
        formData.append("userId", id);
        axios
            .post("http://localhost:3001/posts/", formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <MainContainer>
            <TopContainer>
                <TopBox>
                    <ProfileImageBox>
                        <img
                            src={userData?.avatar?.url}
                            alt="profile"
                        />
                    </ProfileImageBox>
                    <PostInput
                        type="text"
                        placeholder="What's on your mind..."
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </TopBox>
                <BottomBox>
                    <InputContainer>
                        <Input
                            type="file"
                            onChange={onImageChange}
                        />
                        <InputIcon>
                            <img
                                src={require("../../assets/images/feed/image.png")}
                                alt="icon"
                            />
                        </InputIcon>
                        <span>Image</span>
                    </InputContainer>
                    <InputContainer>
                        <Input type="file" />
                        <InputIcon>
                            <img
                                src={require("../../assets/images/feed/clip.png")}
                                alt="icon"
                            />
                        </InputIcon>
                        <span>Attachment</span>
                    </InputContainer>
                    <InputContainer>
                        <Input type="file" />
                        <InputIcon>
                            <img
                                src={require("../../assets/images/feed/gif.png")}
                                alt="icon"
                            />
                        </InputIcon>
                        <span>Clip</span>
                    </InputContainer>
                    <InputContainer>
                        <Input type="file" />
                        <InputIcon>
                            <img
                                src={require("../../assets/images/feed/mic.png")}
                                alt="icon"
                            />
                        </InputIcon>
                        <span>Audio</span>
                    </InputContainer>
                    <PostButton onClick={() => createPost()}>Post</PostButton>
                </BottomBox>
            </TopContainer>

            <PostContainer>
                <Post addFriend={addFriend} />
            </PostContainer>
        </MainContainer>
    );
}

export default Feed;

const MainContainer = styled.div`
    width: 40%;
    background: inherit;
`;

const TopContainer = styled.div`
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* background-image: linear-gradient(to top, #9970f7 0%, #f284d3 100%); */
    /* background-image: linear-gradient(to top, #4bc149 0%, #56e297 100%); */
    margin-bottom: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */
    background-color: #fff;
`;

const TopBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`;

const ProfileImageBox = styled.div`
    cursor: pointer;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20px;
`;

const PostInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    /* background-color: #bfa8f5; */

    /* background-image: linear-gradient(to top, #51f0c3 0%, #39c9c2 100%); */

    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */

    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    /* color: #fff; */

    font-size: 16px;
    width: 80%;
    &::placeholder {
        /* color: #fff; */
        font-size: 16px;
    }
`;

const BottomBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
`;

const Input = styled.input`
    position: absolute;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
    width: 100%;
`;

const InputIcon = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 8px;
`;

const PostButton = styled.span`
    /* background-color: #6a50a7; */
    /* background-image: linear-gradient(to top, #51f0c3 0%, #39c9c2 100%); */

    /* background-image: linear-gradient(to top, #a3f5c9 0%, #a1e8a0 100%); */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    /* color: #fff; */
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
`;

const PostContainer = styled.div`
    border-radius: 5px;
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
`;
