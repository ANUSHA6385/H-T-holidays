import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import { RiAttachment2 } from "react-icons/ri";

import {
  Col,
  Row,
  Button,
  Container,
  Modal,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  FormSelect,
  Alert,
} from "react-bootstrap";
import avtar1 from "../../Assets/avatars/1.jpg";
import avtar2 from "../../Assets/avatars/2.jpg";
import avtar3 from "../../Assets/avatars/3.jpg";
import avtar4 from "../../Assets/avatars/4.png";
import avtar5 from "../../Assets/avatars/5.png";
import profile from "../../Assets/images/profile.jpg";
import AddressForm from "./Addressform";
import Bankform from "./BankForm";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  MASTER_API_CALL,
  CREATE_CUSTOMER_API_CALL,
  REGISTER_API_CALL,
  INITIAL_STATE,
  RESET_CODE,
} from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";

const isEmailValid = (email1) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email1);
};

function CustomerForm(props) {
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);
  const [address, setaddress] = useState(false);
  const [bankdetails, setbankdetails] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [vatError, setVatError] = useState(false);
  const [name, setName] = useState("");
  const [jobposition, setJobposition] = useState("");
  const [trnnum, setTrnnum] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState(0);
  const [customeraddress, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [emirates, setEmirates] = useState("");
  const [country, setCountry] = useState(2);
  const [zip, setZip] = useState("");
  const [title, setTitle] = useState("");
  const [vattreatment, setVattreatment] = useState("false");
  const [customerType, setCustomerType] = useState(1); // individual
  const [attachedFileName, setAttachedFileName] = useState("");
  const [savedbankFormData, setBankFormData] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [success, setSuccess] = useState();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (showAlertModal) {
      const timeoutId = setTimeout(() => {
        setShowAlertModal(false);
        // window.location.reload();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlertModal]);
  const avatars = [
    { id: "1", name: "avatar1", src: avtar1 },
    { id: "2", name: "avatar2", src: avtar2 },
    { id: "3", name: "avatar3", src: avtar3 },
    { id: "4", name: "avatar4", src: avtar4 },
    { id: "5", name: "avatar5", src: avtar5 },
    { id: "6", name: "avatar6", src: profile },
  ];

  const [businessType, setBusinessType] = useState([]);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
    branch: "",
    bankcountry: "",
  });

  useEffect(() => {
    dispatch({ type: RESET_CODE });
    dispatch({ type: MASTER_API_CALL });
  }, []);

  useEffect(() => {
    if (props.customers.goback) {
      // navigation(-1)
      resetValues();
      toast("Successfully registered", {
        type: "success",
        onClose: () => {
          navigation(-1);
          dispatch({ type: RESET_CODE });
        },
      });
    }
  }, [props.customers.goback]);

  useEffect(() => {
    if (props.customers.code === 100) {
      toast(props.customers.error, {
        type: "error",
        onClose: () => {
          dispatch({ type: RESET_CODE });
        },
      });
    }
  }, [props.customers.code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (e.target.name === "customername") setName(e.target.value);
    if (e.target.name === "jobposition") setJobposition(e.target.value);
    if (e.target.name === "trnnumber") setTrnnum(e.target.value);
    if (e.target.name === "phone") setPhone(e.target.value);
    if (e.target.name === "mobile") {
      setMobile(e.target.value);
    }

    if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailError(
        isEmailValid(e.target.value) ? "" : "Invalid email format."
      );
    }

    if (e.target.name === "website") setWebsite(e.target.value);
    if (e.target.name === "customeraddress") setAddress(e.target.value);
    if (e.target.name === "city") setCity(e.target.value);
    if (e.target.name === "emirates") setEmirates(e.target.value);
    if (e.target.name === "country") setCountry(e.target.value);
    if (e.target.name === "zip") setZip(e.target.value);
    if (e.target.name === "title") setTitle(e.target.value);
  };

  const selectBusinessType = (businessType) => {
    if (businessType.id != 1) {
      setNameError(false);
    }
    setNameError(false);
    setMobileError(false);
    setCategoryError(false);
    setCompanyNameError(false);
    setCustomerType(businessType.id);
  };

  const resetValues = () => {
    setName("");
    setCompanyName("");
    setNameError(false);
  };

  const onSelectCategory = (item) => {
    setCategory(item.target.value);
  };

  const handleVatreatment = (item) => {
    setVattreatment(item.target.value);
  };

  const handlesubmit = () => {
    if (customerType === 1 && !name.trim()) {
      setNameError(true);
      // return;


    }

    if (customerType === 2 && !companyName.trim()) {
      setCompanyNameError(true);
    }

    if (!mobile.trim() || mobileError) {
      setMobileError(true);
      // return;
    }

    if (!category || (typeof category === "string" && !category.trim())) {
      setCategoryError(true);
      // return;
    }

    if (
      vattreatment === "true" &&
      (!trnnum || (typeof trnnum === "string" && !trnnum.trim()))
    ) {
      setVatError(true);
      // return;
    }

    if (mobile.trim() && category) {
      console.log("coming inside");
      const tempAddressArray = [];
      if (customeraddress || city || zip) {
        tempAddressArray.push({
          addressLine1: customeraddress ? customeraddress : null,
          addressLine2: city ? city : null,
          city: city ? city : null,
          zipcode: zip ? zip : zip,
          country: country ? country : null,
          state: "",
          addressTypeId: 1,
        });
      }
      const requestData = {
        name: name,
        jobPosition: jobposition,
        trnNo: trnnum,
        phone: phone,
        mobile: mobile,
        email: email,
        website: website,
        isRegistered: vattreatment,
        category: category,
        title: title,
        country: country,
        emirates: emirates,
        zip: zip,
        createdBy: props.loggedInUser.loginId,
        customerCategoryId: category,
        businessTypeId: customerType,
        addresses: tempAddressArray,
        bankAccounts: savedbankFormData.bankName
          ? [
              {
                code: savedbankFormData.iban ? savedbankFormData.iban : null,
                bankName: savedbankFormData.bankName
                  ? savedbankFormData.bankName
                  : null,
                accountNumber: savedbankFormData.accountNumber
                  ? savedbankFormData.accountNumber
                  : null,
                branchName: savedbankFormData.branch
                  ? savedbankFormData.branch
                  : null,
                accountHolderName: savedbankFormData.bankName
                  ? savedbankFormData.bankName
                  : null,
                country: savedbankFormData.bankcountry
                  ? savedbankFormData.bankcountry
                  : null,
              },
            ]
          : [],
      };

      // console.log(requestData)

      dispatch({ type: CREATE_CUSTOMER_API_CALL, payload: requestData });
    }

    // console.log("data", props.customers);
    // setSuccess('Success');
    // setShowAlertModal(true);
    // setBankFormData({ ...formData });
    // handleModalClose();
  };

  const openAvatars = () => {
    setIsAvatarsOpen(!isAvatarsOpen);
  };

  const captureImage = (e) => {
    const selectedImageSrc = e.target.src;
    setSelectedImage(selectedImageSrc);
    setIsAvatarsOpen(false);
  };

  const addressmodal = () => {
    setaddress(!address);
  };
  const bankmodal = () => {
    setbankdetails(!bankdetails);
  };
  const handleModalClose = () => {
    setbankdetails(false);
  };

  useEffect(() => {
    if (props.master.businessTypes.length > 0) {
      setCustomerType(props.master.businessTypes[0].id);
      setBusinessType(
        props.master.businessTypes.filter((item) => {
          return item.id === 1 || item.id === 2;
        })
      );
    }
  }, [props.master.businessTypes]);

  const fileattach = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setAttachedFileName(selectedFile.name);
  };
  return (
    <>
      <ToastContainer />
      <div
        style={{
          backgroundColor: "#F5F5F5",
          paddingBottom: 30,
          paddingTop: 35,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Container fluid className=" f-14 ">
          <Row className=" f-14 ms-1 me-1 pb-1 pt-1 mt-3 mb-3">            
          </Row>
          {/*---------------form starts ---------------------*/}
          <Row
            xs={12}
            sm={12}
            lg={12}
            md={12}
            xxl={12}
            className=""
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center !important",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                xs={6}
                md={12}
                lg={10}
                xxl={10}
                className="border border-2  shadow"
              >
                <Row style={{ flex: 1 }} className=" ms-0 ">
                  <Col
                    xs={6}
                    sm={6}
                    lg={6}
                    md={6}
                    xxl={8}
                    className=" f-14 d-flex p-4"
                    style={{ paddingRight: 100 }}
                  >
                    <div key={`inline-radio`} className="mb-1 mt-2">
                      {businessType.map((item) => {
                        return (
                          <Form.Check
                            inline
                            key={item.id}
                            label={item.value}
                            name="customerType"
                            type="radio"
                            checked={item.id == customerType}
                            value={item.value}
                            onChange={(e) => selectBusinessType(item)}
                            id={item.id}
                          />
                        );
                      })}
                    </div>
                  </Col>

                  <Col
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xxl={2}
                    className="mt-1 d-flex justify-content-end "
                    style={{ zIndex: "9" }}
                  >
                    <Button
                      type="submit"
                      className=" f-14 bg-blue b-none f-14 mt-4 text-uppercase rounded-1 h-max"
                      style={{
                        backgroundColor: "#25316f",
                      }}
                      onClick={handlesubmit}
                    >
                      Save
                    </Button>

                    <Button
                      type="submit"
                      className="fw-bolder f-14 bg-blue b-none f-14 mt-4 ms-2 text-uppercase rounded-1 h-max"
                      style={{
                        backgroundColor: "#bebec3",
                        color: "black",
                      }}
                      onClick={handlesubmit}
                    >
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Cancel{" "}
                      </Link>
                    </Button>
                  </Col>
                
                </Row>

                <Row
                  className="ps-3 pe-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "4%",
                  }}
                >
                  <Col
                    xxl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={7}
                    className=" f-14 "
                    style={{ position: "relative", top: "-40px" }}
                  >
                    <div key={`inline-radio`} className="mb-3">
                      <div className={`mb-3 ${nameError ? "has-error" : ""}`}>
                        {customerType === 1 && (
                          <FormGroup className="d-flex flex-column">
                            <FormControl
                              type="text"
                              value={name}
                              placeholder="Customer Name"
                              className={`f-14 w-100 h-10 br_b-2 pt-3 ps-3 mb-2 rounded-0 inputfocus ${
                                nameError ? "has-error" : ""
                              }`}
                              checked={customerType === "individual"}
                              onChange={(e) => {
                                handleChange(e);
                                setNameError(false);
                              }}
                              style={{ border: "2px dotted #25316f" }}
                              id={`inline-radio-1`}
                              name="customername"
                              required
                            />
                          </FormGroup>
                        )}
                        {nameError && (
                          <p style={{ color: "red" }}>
                            Customer Name is Required
                          </p>
                        )}
                      </div>

                      <FormGroup>
                        <FormControl
                          type="text"
                          placeholder="Company Name"
                          checked={customerType === "company"}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className={`f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0 inputfocus ${
                            companyNameError ? "has-error" : ""
                          }`}
                          style={{ border: "2px dotted #25316f" }}
                          id={`inline-radio-1`}
                          name="companyname"
                        ></FormControl>
                      </FormGroup>
                      {companyNameError && (
                        <p style={{ color: "red" }}>Company Name is Required</p>
                      )}
                    </div>
                    <div
                      className=" f-14 d-flex flex-row"
                      style={{ flex: "1" }}
                    >
                      <FormGroup
                        style={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                          justifyContents: "center",
                        }}
                      >
                        <FormLabel
                          className="f-20 "
                          style={{
                            flex: 2,
                            fontWeight: "bolder",
                            color: "#25316f",
                          }}
                        >
                          Address
                        </FormLabel>
                      </FormGroup>
                      <FormGroup
                        style={{
                          display: "flex",
                          flex: 3,
                          flexDirection: "column",
                        }}
                      >
                        <Form.Control
                          className=" f-14  br_b-2 rounded-0 mt-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Address"
                          name="customeraddress"
                          onChange={(e) => handleChange(e)}
                        ></Form.Control>
                        <FormGroup className=" f-14 d-flex justify-space-between ">
                          <Form.Control
                            className=" f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="City"
                            name="city"
                            onChange={(e) => handleChange(e)}
                          ></Form.Control>
                          <Form.Control
                            className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="Emirates"
                            onChange={(e) => handleChange(e)}
                            name="emirates"
                          ></Form.Control>
                        </FormGroup>
                        <FormGroup className=" f-14 d-flex justify-space-between ">
                          <Form.Select
                            className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="Country"
                            onChange={(e) => handleChange(e)}
                            name="country"
                          >
                            <option value={2}>UAE</option>
                            <option value={1}>INDIA</option>
                          </Form.Select>
                          <Form.Control
                            className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="Zip"
                            onChange={(e) => handleChange(e)}
                            name="zip"
                          ></Form.Control>
                        </FormGroup>
                      </FormGroup>
                    </div>
                    <div
                      className={`mb-1 ${categoryError ? "has-error" : ""}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FormLabel className=" txt-ht_blue  w-100 mt-2 f-16">
                        Customer Category{" "}
                        <span className="f-16" style={{ color: "red" }}>
                          *
                        </span>
                        <Form.Select
                          aria-label="Default select example"
                          type="text"
                          placeholder="Customer Name"
                          className={`f-14 w-100 h-10 br_b-2 pt-1 ps-3  rounded-0 inputfocus ${
                            categoryError ? "has-error" : ""
                          }`}
                          style={{ border: "2px dotted #25316f" }}
                          onChange={(e) => {
                            onSelectCategory(e);
                            setCategoryError(false);
                          }}
                          value={category}
                          name="category"
                        >
                          <option>Select the Category</option>
                          {props.master.customerCategories.map(
                            (categoryitem) => (
                              <option
                                key={categoryitem.id}
                                id={categoryitem.id}
                                value={categoryitem.id}
                              >
                                {categoryitem.value}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </FormLabel>
                    </div>
                    {categoryError && (
                      <p className="f-14" style={{ color: "red" }}>
                        Category is Required
                      </p>
                    )}

                    <FormLabel className=" b txt-ht_blue w-100 f-14">
                      Salutation
                      <FormSelect
                        className="f-14   br_b-2 rounded-0 inputfocus"
                        onChange={(e) => handleChange(e)}
                        name="title"
                        style={{
                          border: "2px dotted #25316f",
                          height: "2.5rem",
                        }}
                      >
                        <option>select Salution</option>
                        <option className="f-16" value="Mr">
                          Mr
                        </option>
                        <option className="f-16" value="Mrs">
                          Mrs
                        </option>
                        <option className="f-16" value="Miss">
                          Miss
                        </option>
                      </FormSelect>
                    </FormLabel>
                  </Col>

                  {/* Second column for job details like that  */}
                  <Col
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xxl={5}
                    className=" f-14 "
                    style={{ position: "relative", top: "-48px" }}
                  >
                    <FormGroup>
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Job Position
                        <FormControl
                          className="f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="jobposition"
                        ></FormControl>
                      </FormLabel>
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Phone
                        <FormControl
                          type="number"
                          className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          name="phone"
                          onChange={(e) => handleChange(e)}
                        ></FormControl>
                      </FormLabel>
                      <div
                        className={`mb-3 ${mobileError ? "has-error" : ""}`}
                        style={{ alignItems: "center" }}
                      >
                        <FormLabel className=" b txt-ht_blue w-100 f-14">
                          Mobile{" "}
                          <span className="f-16" style={{ color: "red" }}>
                            *
                          </span>
                          <div key={`inline-radio`} className="mb-1">
                            <FormControl
                              placeholder="Enter phone number"
                              value={mobile}
                              onChange={(event) => {
                                const inputValue = event.target.value.replace(
                                  /\D/g,
                                  ""
                                );

                                setMobile(inputValue);
                                setMobileError(false);
                              }}
                              className={`inputfocus f-14 br_b-2 rounded-0 ${
                                mobileError ? "has-error" : ""
                              }`}
                              style={{
                                border: "none",
                                backgroundColor: "white",
                                border: "2px dotted #25316f",
                                height: "2rem",
                              }}
                              name="mobile"
                              type="tel"
                              maxLength={10}
                            />
                          </div>
                        </FormLabel>
                        {mobileError && (
                          <span className="" style={{ color: "red" }}>
                            Required
                          </span>
                        )}
                      </div>

                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Email
                        <FormControl
                          type="email"
                          className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          name="email"
                          onChange={(e) => handleChange(e)}
                        ></FormControl>
                      </FormLabel>
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Website
                        <FormControl
                          className="f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          onChange={(e) => handleChange(e)}
                          name="website"
                        ></FormControl>
                      </FormLabel>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel className=" txt-ht_blue w-100 mt-2 f-16">
                        Vat Treatment
                        <Form.Select
                          aria-label="Default select example"
                          type="text"
                          placeholder=""
                          className="f-14 w-100 h-10 br_b-2 pt-1 ps-3 rounded-0 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          defaultValue="Unregistered"
                          value={vattreatment}
                          onChange={(e) => handleVatreatment(e)} // Include this line to handle the change
                          name="vattreatment"
                        >
                          <option value="true">Registered</option>
                          <option value="false">Unregistered</option>
                        </Form.Select>
                      </FormLabel>

                      <div
                        className={`mb-3 ${vatError ? "has-error" : ""}`}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FormLabel className=" b txt-ht_blue w-100 f-14">
                          TRN NO
                          <FormControl
                            className={`f-14 br_b-2 rounded-0 inputfocus ${
                              vatError ? "has-error" : ""
                            }`}
                            style={{
                              border: "2px dotted #25316f",
                              height: "2rem",
                            }}
                            onChange={(e) => {
                              handleChange(e);
                              setVatError(false);
                            }}
                            name="trnnumber"
                          ></FormControl>
                        </FormLabel>

                        <div>
                          {" "}
                          {vatError && (
                            <span style={{ color: "red" }}>Required</span>
                          )}
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* <Col className="mt-2" style={{ paddingLeft: 50, paddingRight: 50 }}>
              <FormGroup>
                <FormLabel>
                  <h4>Log Notes</h4>
                </FormLabel>
                <Form.Control
                  className="inputfocus"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
                <p
                  className="fw-bold"
                  onClick={fileattach}
                  style={{ color: "#25316f" }}
                >
                  <RiAttachment2 /> Attach File
                </p>
                
                <input
                  type="file"
                  id="fileInput"
                  name="inputfile"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                {attachedFileName && (
                  <p style={{ color: "#25316f" }}>upload: {attachedFileName}</p>
                )}
              </FormGroup>
            </Col> */}

            {/*addreess modal for the extra address */}
            {/* {address && (
              <AddressForm
                className="inputfocus"
                addresstoggle={addressmodal}
              />
            )}
            {bankdetails && (
              <Bankform
                banktoggle={bankmodal}
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}
              />
            )} */}
          </Row>
        </Container>
        <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "12px" }}>Product Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {success === "Success" ? (
              <>
                <div className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-circle-check"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#3bb54a"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "31%" }}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                  <p className="mb-0 ml-2">Data Saved Successfully</p>
                </div>
              </>
            ) : (
              <Alert variant="danger">Data Saved Unsuccessfully</Alert>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
const mapsToProps = (state) => {
  return {
    master: state.masterData,
    loggedInUser: state.users,
    customers: state.customers,
  };
};
export default connect(mapsToProps)(CustomerForm);
