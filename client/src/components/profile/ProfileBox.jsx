import React from "react";
//PACKAGES
import styled from "styled-components";

function ProfileBox({ userData }) {
    return (
        <MainContainer>
            <ContentBox>
                <TopBox>
                    <ProfileInfoBox>
                        <ProfilePic>
                            <img
                                src={userData?.avatar?.url}
                                alt="profile"
                            />
                        </ProfilePic>
                        <PersonalInfoBox>
                            <Name>
                                {userData?.firstname} {userData?.lastname}
                            </Name>
                            <FriendsCount>friends :{userData?.friends?.length}</FriendsCount>
                        </PersonalInfoBox>
                    </ProfileInfoBox>
                    <SettingsBox className="icon-box">
                        <img
                            src={require("../../assets/images/profile/settings.png")}
                            alt="settings"
                        />
                    </SettingsBox>
                </TopBox>
                <AdditionalInfoBox>
                    <LocationInfoBox>
                        <LocationBox className="icon-box">
                            <img
                                src={require("../../assets/images/profile/location.png")}
                                alt="location"
                            />
                        </LocationBox>
                        <Location>{userData?.location}</Location>
                    </LocationInfoBox>
                    <OccupationInfoBox>
                        <OccupationBox className="icon-box">
                            <img
                                src={require("../../assets/images/profile/occupation.png")}
                                alt="occupation"
                            />
                        </OccupationBox>
                        <Occupation>{userData?.occupation}</Occupation>
                    </OccupationInfoBox>
                </AdditionalInfoBox>
                <MiddleBox>
                    <CountBox>
                        <Title>who's viewed your profile</Title>
                        <Count>{userData?.viewedProfile}</Count>
                    </CountBox>
                    <CountBox>
                        <Title>Impression of your post</Title>
                        <Count>{userData?.impressions}</Count>
                    </CountBox>
                </MiddleBox>
                <BottomBox>
                    <SubHeading>Social Profiles</SubHeading>
                    <SocialNetworkBox>
                        <LeftBox>
                            <IconBox className="icon-box">
                                <img
                                    src={require("../../assets/images/profile/twitter.png")}
                                    alt="twitter"
                                />
                            </IconBox>
                            <NameBox>
                                <SocialNetworkName>Twitter</SocialNetworkName>
                                <Type>Social Network</Type>
                            </NameBox>
                        </LeftBox>
                        <EditIconBox className="icon-box">
                            <img
                                src={require("../../assets/images/profile/edit.png")}
                                alt="edit"
                            />
                        </EditIconBox>
                    </SocialNetworkBox>
                    <SocialNetworkBox>
                        <LeftBox>
                            <IconBox className="icon-box">
                                <img
                                    src={require("../../assets/images/profile/linkedin.png")}
                                    alt="linkedin"
                                />
                            </IconBox>
                            <NameBox>
                                <SocialNetworkName>Linkedin</SocialNetworkName>
                                <Type>Network Platform</Type>
                            </NameBox>
                        </LeftBox>
                        <EditIconBox>
                            <img
                                src={require("../../assets/images/profile/edit.png")}
                                alt="edit"
                            />
                        </EditIconBox>
                    </SocialNetworkBox>
                </BottomBox>
            </ContentBox>
        </MainContainer>
    );
}

export default ProfileBox;

const MainContainer = styled.div`
    padding: 20px;
    border-radius: 5px;
    /* background-image: linear-gradient(to top, #4bc149 0%, #56e297 100%); */
    width: 25%;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    /* background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%); */
    background-color: #fff;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const TopBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
`;

const ProfileInfoBox = styled.div`
    display: flex;
`;

const ProfilePic = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
`;

const PersonalInfoBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span``;

const FriendsCount = styled.span``;

const SettingsBox = styled.div``;

const AdditionalInfoBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const LocationInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const LocationBox = styled.div`
    margin-right: 10px;
`;

const Location = styled.span``;

const OccupationInfoBox = styled.div`
    display: flex;
    align-items: center;
`;

const OccupationBox = styled.div`
    margin-right: 10px;
`;

const Occupation = styled.span``;

const MiddleBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const CountBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const Title = styled.span``;

const Count = styled.span``;

const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubHeading = styled.h4`
    margin-bottom: 15px;
`;

const SocialNetworkBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;

const IconBox = styled.div`
    margin-right: 10px;
`;

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const SocialNetworkName = styled.span``;

const Type = styled.span``;

const EditIconBox = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
`;
