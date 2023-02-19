import React, { useCallback, useEffect, useState } from "react";

//PACKAGES
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import * as yup from "yup";

//REDUX IMPORTS
import { useDispatch } from "react-redux";

//BUTTON LOADER
import ButtonLoader from "../loaders/ButtonLoader";

function Register() {
    //IMAGE STATES
    const [imageName, setImageName] = useState("");
    const [preview, setPreview] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [viewCropModal, setViewCropModal] = useState(false);

    //LOADER STATE
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //FORM STATES
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        location: "",
        occupation: "",
        email: "",
        password: "",
        avatar: "",
    });

    //PREVENTING OUTSIDE SCROLL
    useEffect(() => {
        document.body.style.overflow = isModal ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isModal]);

    //FORM FIELDS VALIDATION
    const formSchema = yup.object().shape({
        firstname: yup.string().required("This field is required"),
        lastname: yup.string().required("This field is required"),
        location: yup.string().required("This field is required"),
        occupation: yup.string().required("This field is required"),
        avatar: yup.string().required("This field is required"),
        email: yup.string().email("Invalid email").required("This field is required"),
        password: yup
            .string()
            .test(
                "has-capital-letter",
                "Password must contain at least one capital letter",
                (value) => /[A-Z]/.test(value)
            )
            .test(
                "has-special-character",
                "Password must contain at least one special character",
                (value) => /[!@#$%^&*]/.test(value)
            )
            .min(6, "Password must be at least 6 characters")
            .required("This field is required"),
    });

    //SETTING FIELD DATA
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    //DRAG AND DROP FUNCTION
    const onDrop = useCallback(
        (acceptedFiles) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setFormData({ ...formData, avatar: reader.result });
                    setImageName(acceptedFiles[0].name);
                    setViewCropModal(true);
                    setPreview(
                        Object.assign(acceptedFiles[0], {
                            preview: URL.createObjectURL(acceptedFiles[0]),
                        })
                    );
                    setErrors({ ...errors, avatar: "" });
                }
            };
            reader.readAsDataURL(acceptedFiles[0]);
        },
        [formData, errors]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    });

    //SIGNUP API
    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        await formSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                axios
                    .post("http://localhost:3001/auth/register", formData, config)
                    .then((response) => {
                        console.log(response);
                        navigate("/");
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                const validationErrors = {};
                error.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            });
        setLoading(false);
    };

    // useEffect(() => {
    //     // axios.get(`http://localhost:3001/users/${id}`, {
    //         headers: {
    //         //   'Authorization': `Bearer ${access}`
    //         }
    //       }).then((response) => {
    //         console.log(response)
    //     }).catch((error)=> {
    //         console.log(error)
    //     })
    // // }, [])

    // const login = () => {
    //     axios.post("http://localhost:3001/auth/login",{
    //         email : "banncp@t.com",
    //         password: "123456"
    //     }, {
    //         headers: {
    //         //   'Authorization': `Bearer ${access}`
    //         }
    //       }).then((response) => {
    //         console.log(response)
    //       }).catch((error) => {
    //         console.log(error)
    //       })
    // }

    return (
        <MainContainer>
            <Wrapper className="wrapper">
                <ContentBox>
                    {/* <Heading>Register Now</Heading> */}
                    <Form>
                        <InputBox>
                            <Label htmlFor="firstname">first name*</Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                type="text"
                                placeholder="enter your firstname"
                                onChange={handleChange}
                                value={formData.firstname}
                            />
                            <div>
                                {errors.firstname && (
                                    <p className="error-message">{errors.firstname}</p>
                                )}
                            </div>
                        </InputBox>
                        <InputBox>
                            <Label htmlFor="lastname">last name*</Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                type="text"
                                placeholder="enter your lastname"
                                onChange={handleChange}
                                value={formData.lastname}
                            />
                            <div>
                                {errors.lastname && (
                                    <p className="error-message">{errors.lastname}</p>
                                )}
                            </div>
                        </InputBox>
                        <InputBox>
                            <Label htmlFor="email">email*</Label>
                            <Input
                                id="email"
                                name="email"
                                email
                                type="text"
                                placeholder="enter your email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <div>
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>
                        </InputBox>
                        <InputBox>
                            <Label htmlFor="password">password*</Label>
                            <Input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="enter your password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <div>
                                {errors.password && (
                                    <p className="error-message">{errors.password}</p>
                                )}
                            </div>
                        </InputBox>
                        <InputBox>
                            <Label htmlFor="location">location*</Label>
                            <Input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="enter your location"
                                onChange={handleChange}
                                value={formData.location}
                            />
                            <div>
                                {errors.location && (
                                    <p className="error-message">{errors.location}</p>
                                )}
                            </div>
                        </InputBox>
                        <InputBox>
                            <Label htmlFor="occupation">occupation*</Label>
                            <Input
                                id="occupation"
                                name="occupation"
                                type="text"
                                placeholder="enter your occupation"
                                onChange={handleChange}
                                value={formData.occupation}
                            />
                            <div>
                                {errors.occupation && (
                                    <p className="error-message">{errors.occupation}</p>
                                )}
                            </div>
                        </InputBox>
                        <DropBox>
                            <div
                                className="drop-box"
                                {...getRootProps()}
                            >
                                <div className="drag-drop-box">
                                    <input
                                        name="avatar"
                                        {...getInputProps()}
                                    />
                                    {imageName ? (
                                        <p>{imageName}</p>
                                    ) : (
                                        <p>Drop the files here ...</p>
                                    )}
                                </div>
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="last-error-msg"
                                >
                                    {errors.avatar && (
                                        <p className="error-message">{errors.avatar}</p>
                                    )}
                                </div>
                            </div>
                            <PreviewIconBox
                                id="my-anchor-element"
                                onClick={() => {
                                    preview && setIsModal(true);
                                }}
                            >
                                <img
                                    src={require("../../assets/images/signup/eye.png")}
                                    alt="eye"
                                />
                            </PreviewIconBox>
                            <Tooltip
                                anchorId="my-anchor-element"
                                content={preview ? "view preview" : "upload image to view"}
                                place="bottom"
                                data-tooltip-variant="info"
                                className="custom-style"
                            />
                        </DropBox>

                        <SubmitButton onClick={(e) => signup(e)}>
                            {loading ? <ButtonLoader /> : "Register"}
                        </SubmitButton>
                        <LoginButton to="/">Already have an account? Login here</LoginButton>
                    </Form>
                    {preview && isModal && (
                        <Overlay onClick={() => setIsModal(false)}>
                            {" "}
                            <PreviewBox onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={preview.preview}
                                    alt="preview"
                                />{" "}
                            </PreviewBox>{" "}
                        </Overlay>
                    )}
                </ContentBox>
            </Wrapper>
        </MainContainer>
    );
}

export default Register;

const MainContainer = styled.section`
    background-color: #f1f1f1;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.section`
    width: 85%;
    margin: 0 auto;
`;
const ContentBox = styled.section`
    width: 100%;
`;
const Heading = styled.h2`
    text-align: center;
    font-size: 30px;
    margin-bottom: 25px;
    font-family: "dm_sansboldmedium";
    color: #2cbaea;
`;
const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 20px 20px -20px, rgba(0, 0, 0, 0.3) 0px 10px 20px -20px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const InputBox = styled.div`
    position: relative;
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
    div {
        position: absolute;
        bottom: -15px;
    }
`;
const Label = styled.label`
    position: absolute;
    top: -6px;
    left: 10px;
    font-size: 10px;
    font-family: "dm_sansregular";
    background-color: #fff;
    color: #e0d0d0;
`;
const Input = styled.input`
    font-family: "dm_sansregular";
    border: 1px solid #e0d0d0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 15px 15px -15px, rgba(0, 0, 0, 0.3) 0px 15px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    padding: 12px 10px;
    border-radius: 4px;
    width: 100%;
`;

const DropBox = styled.div`
    margin-bottom: 30px;
    position: relative;
`;

const PreviewIconBox = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
    width: 15px;
    height: 15px;
`;
const SubmitButton = styled.span`
    font-family: "dm_sansregular";
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    padding: 10px 20px;
    border-radius: 4px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 15px 15px -15px, rgba(0, 0, 0, 0.3) 0px 15px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    color: #fff;
    background-image: linear-gradient(to top, #a1e8a0 0%, #a3f5c9 100%);
    max-height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginButton = styled(Link)`
    margin-top: 10px;
    cursor: pointer;
    color: #a3f5c9;
    font-size: 14px;
`;

const Overlay = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: fixed;
    inset: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const PreviewBox = styled.div`
    width: 400px;
    height: 300px;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
