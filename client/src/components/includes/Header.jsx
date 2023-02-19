import React, { useState } from "react";
//PACKAGES
import styled from "styled-components";

function Haeder() {
    //STATES
    const [query, setQuery] = useState("");

    //HANDLING SEARCH QUERY
    const handleChange = (e) => {
        let value = e.target.value;
        setQuery(value);
    };
    return (
        <MainContainer>
            <Wrapper className="wrapper">
                <LeftBox>
                    <LogoBox>logo</LogoBox>
                    <SearchBox>
                        <SearchInput
                            type="text"
                            placeholder="Search something"
                            onChange={handleChange}
                            value={query}
                        />
                        <SearchIconBox>
                            <img
                                src={require("../../assets/images/header/search.png")}
                                alt="search"
                            />
                        </SearchIconBox>
                    </SearchBox>
                </LeftBox>
                <RightBox>
                    <BrightnessBox>
                        <img
                            src={require("../../assets/images/header/brightness.png")}
                            alt="brightness"
                        />
                    </BrightnessBox>
                    <MessageBox>
                        <img
                            src={require("../../assets/images/header/message.png")}
                            alt="message"
                        />
                    </MessageBox>
                    <NotificationBox>
                        <img
                            src={require("../../assets/images/header/notification.png")}
                            alt="notification"
                        />
                    </NotificationBox>
                </RightBox>
            </Wrapper>
        </MainContainer>
    );
}

export default Haeder;

const MainContainer = styled.section`
    position: fixed;
    z-index: 2;
    width: 100%;
    padding: 15px 0;
    /* background-image: linear-gradient(to top, #7df17b 0%, #5bc68d 100%); */

    /* background-image: linear-gradient(to top, #51f0c3 0%, #39c9c2 100%); */

    /* background-image: linear-gradient(to top, #51e3f0 0%, #39a5c9 100%); */
    background-color: #fff;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.5);
`;

const Wrapper = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;

const LogoBox = styled.div`
    cursor: pointer;
`;

const SearchBox = styled.div`
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-left: 10px;
`;

const SearchInput = styled.input`
    padding: 10px;
    font-size: 16px;
    /* background-color: #f0e3e3; */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    /* color: #fff; */

    /* background-image: linear-gradient(to top, #51e3f0 0%, #39a5c9 100%); */
    /* background-image: linear-gradient(to top, #51f0c3 0%, #39c9c2 100%); */

    /* background-image: linear-gradient(to top, #a3f5c9 0%, #a1e8a0 100%); */
    &::placeholder {
        /* color: #fff; */
        font-size: 16px;
    }
`;

const SearchIconBox = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const RightBox = styled.div`
    display: flex;
    align-items: center;
`;

const BrightnessBox = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-right: 20px;
`;

const MessageBox = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-right: 20px;
`;

const NotificationBox = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;
