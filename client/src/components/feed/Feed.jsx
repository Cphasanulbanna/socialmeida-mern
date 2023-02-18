import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
//PACKAGES
import styled from "styled-components";
import Post from "./Post";

function Feed({ userData }) {
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
                <Post />
            </PostContainer>
        </MainContainer>
    );
}

export default Feed;

const MainContainer = styled.div`
    width: 40%;
`;

const TopContainer = styled.div`
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 30px;
`;

const TopBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 1px solid #111;
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
    border-radius: 15px;
    background-color: #f1f1f1;
    font-size: 16px;
    width: 100%;
    &::placeholder {
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

const PostButton = styled.span``;

const PostContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
`;
