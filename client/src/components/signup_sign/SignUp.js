// import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const base_url="https://amazon-clonefront.onrender.com";

const Signup = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    // console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;

        // if(fname == ""){
        //     toast.warn("fname provide",{
        //         position:"top-center",
        //     })
        // }else if(email == ""){
        //     toast.warn("email provide",{
        //         position:"top-center",
        //     })
        // }

            const res = await fetch(`${base_url}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                })
            });

            const data = await res.json();
            // console.log(data);

            if (res.status === 422 || !data) {
                // alert("no data");
                toast.warn("Fill up all the details 🫠!", {
                    position: "top-center",
                })
            } else if (res.status === 423) {
                // alert("no data");
                toast.warn("Email Id already exist 🤨!", {
                    position: "top-center",
                })
                setUdata({...udata, email: ""});
            }  else if (res.status === 424) {
                // alert("no data");
                toast.warn("Password doesn't match 🧐!", {
                    position: "top-center",
                })
                setUdata({...udata, password: "", cpassword: ""});
            }  else if (res.status === 425) {
                // alert("no data");
                toast.warn("There is some technical issue refresh the page and register again 😅!", {
                    position: "top-center",
                })
            }  else {
                // alert("data succesfully added");
                toast.success("Registration Successfully done 😃!", {
                                    position: "top-center" ,
                })
                setUdata({...udata, fname: "", email: "", mobile: "", password: "", cpassword: ""});
            }
        }
    //           
    //         }
    //     } catch (error) {
    //         console.log("front end ka catch error hai" + error.message);
    //     }
    // }

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="fname">Your name</label>
                            <input type="text" 
                            onChange={adddata}
                            value={udata.fname}
                            name="fname" id="fname" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email"
                             onChange={adddata}
                             value={udata.email}
                             name="email" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="number"
                             onChange={adddata}
                             value={udata.mobile}
                             name="mobile" id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                             onChange={adddata}
                             value={udata.password}
                             name="password" id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="password"
                             onChange={adddata}
                             value={udata.cpassword}
                             name="cpassword" id="passwordg" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata} >Continue</button>

                        {/* <Divider /> */}
                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Signin</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default Signup;
