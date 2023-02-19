import React, { useState } from "react";
//PACKAGES
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin, setUserInfo } from "../../redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    //FORM STATES
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SETTING FIELD DATA
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    //FORM FIELDS VALIDATION
    const formSchema = yup.object().shape({
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

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        await formSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                axios
                    .post("http://localhost:3001/auth/login", formData)
                    .then((response) => {
                        dispatch(setLogin(response.data.token));
                        dispatch(setUserInfo(response.data.user));
                        navigate("/home");
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
    return (
        <MainContainer>
            <Wrapper>
                <ContentBox>
                    <Form>
                        <InputBox>
                            <Label htmlFor="email">Email*</Label>
                            <Input
                                id="email"
                                name="email"
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
                            <Label htmlFor="password">Password*</Label>
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
                        <SubmitButton onClick={(e) => login(e)}>
                            {loading ? "" : "Login"}
                        </SubmitButton>
                        <Register to="/register">Don't have an account? register here</Register>
                    </Form>
                </ContentBox>
            </Wrapper>
        </MainContainer>
    );
}

export default Login;

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

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
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
`;

const Register = styled(Link)`
    color: #a1e8a0;
    cursor: pointer;
    margin-top: 5px;
    font-size: 14px;
`;
