import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Stack,
  Row,
  FormGroup,
  FormControl,
  Card,
  ListGroup,
  FormLabel,
  FormCheck,
  FormSelect,
  Button,
} from "react-bootstrap";
import { IoMdContact } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AE } from "country-flag-icons/react/3x2";
import { MdPayments } from "react-icons/md";
import { useDispatch, connect } from "react-redux";
import { SEARCH_CUSTOMER_API_CALL, MASTER_API_CALL } from "../../utils/Constant";


function Customerpay(props) {
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chequerefnum, setChequerefnum] = useState(false); // Define chequerefnum state

  const [amount, setAmount] = useState("");
  const [paymentType, setPaymenttype] = useState("");
  const [Referenceno, setReferenceno] = useState("");
  const [Chequedate, setChequedate] = useState("");
  const [Collectiondate, setCollectiondate] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    if (e.target.name === "suppliernamesearch") {
      setCustomerName(e.target.value);
    }
  };

  const customerSelect = () => {
    const searchname = customerName;

    if (searchname) {
      setLoading(true);

      // Add a delay of 1 second
      setTimeout(() => {
        dispatch({
          type: SEARCH_CUSTOMER_API_CALL,
          payload: { query: searchname, businessTypeId: 3 },
        });
      }, 1000);
    }
  };

  useEffect(() => {
    customerSelect();
  }, [customerName]);

  const customerdetails = (item) => {
    if (selectedCustomer === item) {
      setShowInput(!showInput);
    } else {
      setSelectedCustomer(item);
      setShowInput(false);
    }
  };

  useEffect(() => {
    console.log(selectedCustomer);
  }, [selectedCustomer]);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
    console.log(props.message);
  }, []);

  const handleSubmit = () => {
    // setErrormessage("");
    // if (customerName.length === 0) {
    //   setErrormessage("Please enter the supplier name.");
    //   return;
    // }
    // if (amount.length === 0) {
    //   setErrormessage("Please enter Amount.");
    //   return;
    // }

    console.log("Created By:", props.loginUsers.loginId)
    console.log("Supplier Id", selectedCustomer.id)
    
    
    // setTimeout(() => {
    //   window.location.reload(true)
    // }, 500);
  };

  return (
    <>
      <Container fluid className="flex">
        <Row className="w-100 ms-0 mt-2 bg-blur" style={{}}>
          <Col lg={2}></Col>
          <Col
            className="border shadow p-3 w-80 "
            style={{
              minHeight: 520,
              maxHeight: 820,
              backgroundColor: "white ",
            }}
          >
            <Stack
              direction="horizontal"
              className=" mt-2 p-2 "
              gap={3}
              style={{ backgroundColor: "#f0f0f0", height: "50px" }}
            >
              <div
                className="fs-5 text-capitalize fw-bolder"
                style={{ color: "#1d1d5e" }}
              >
                Receive Payment
              </div>
              <button
                className="p-1 ms-auto f-14 btn-blue"
                onClick={handleSubmit}
              >
                Receive
              </button>
              <Link to="/Payment">
                <button className="p-1 f-14 me-2 btn-blue">Cancel</button>
              </Link>
            </Stack>

            <Row className="f-20 mt-3">
              <Col className="ms-3 me-3">
                <p className="f-20 ms-auto d-flex align-items-center">
                  <IoMdContact style={{ fontSize: 40 }} />
                  <span className="ms-2 f-18 text-capitalize">
                    Supplier details
                  </span>
                </p>
                <FormGroup>
                  {showInput && (
                    <FormControl
                      id="name"
                      type="search"
                      name="suppliernamesearch"
                      className="inputfocus f-14 br_b-2 rounded-0 mt-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Search Supplier Name"
                      value={customerName}
                      onChange={(name) => handleSearchChange(name)}
                    />
                  )}
                  {showInput &&
                    props.customers.searchList &&
                    props.customers.searchList.length > 0 && (
                      <Card className="mt-3" style={{ width: "18rem" }}>
                        <ListGroup
                          variant="flush"
                          style={{ maxHeight: "15rem", overflowY: "scroll" }}
                        >
                          {props.customers.searchList.map((item) => (
                            <ListGroup.Item
                              key={item.id}
                              onClick={() => customerdetails(item)}
                              style={{ cursor: "pointer" }}
                            >
                              <strong onClick={() => setShowInput(true)}>
                                Name:
                              </strong>
                              {item.name}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Link to="/VendorForm">
                          <Button variant="link">Add Supplier +</Button>
                        </Link>
                      </Card>
                    )}
                  {selectedCustomer ? (
                    <div
                      xxl={2}
                      lg={2}
                      className="w-80 p-2"
                      style={{ backgroundColor: "#f0f0f0" }}
                    >
                      <h3
                        className="mt-1"
                        onClick={() => setShowInput(!showInput)}
                      >
                        {selectedCustomer.name}
                      </h3>
                      {selectedCustomer.addresses &&
                        selectedCustomer.addresses.length > 0 && (
                          <div
                            style={{
                              fontSize: 20,
                              position: "relative",
                              top: "-2px",
                            }}
                          >
                            <p
                              className=" w-70"
                              style={{
                                fontSize: 16,
                                fontWeight: "500",
                                flex: "flex-wrap",
                              }}
                            >
                              {selectedCustomer.addresses[0].addressLine1},
                              <br />
                              <span className="mt-1">
                                {selectedCustomer.addresses[0].addressLine2},
                              </span>
                              <br />
                              <span>{selectedCustomer.addresses[0].city},</span>
                              <span className="ms-2">
                                {selectedCustomer.addresses[0].state}
                              </span>
                              <br />
                              <span>
                                {selectedCustomer.addresses[0].countryName},
                              </span>
                              <span className="ms-2">
                                {selectedCustomer.addresses[0].zipcode}.
                              </span>
                            </p>
                          </div>
                        )}
                    </div>
                  ) : (
                    <span></span>
                  )}
                  {/* {errormessage && !customerName && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter the supplier name.
                    </p>
                  )} */}
                </FormGroup>
              </Col>

              <Col className="font-large f-20 text-end text-capitalize">
                <p className="d-flex flex-column fs-4 mt-2">
                  Outstanding Amount
                  <span className="f-18 mt-2"> 0.00 AED</span>
                </p>
                <div className="mt-4">
                  <FormLabel className="d-flex justify-content-end align-items-center f-16 txt-ht_blue fw-bold font-bolder ">
                    <span className="mb-1 me-2">
                      <IoCalendar
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </span>
                    <span>Payment Date :</span>
                    <FormControl
                      type="date"
                      label=""
                      className="w-40 ms-2 inputfocus"
                      defaultValue={currentDate}
                      min={currentDate}
                    ></FormControl>
                  </FormLabel>
                </div>
                <div className="mt-4 d-flex justify-content-around">
                  <FormLabel className="d-flex justify-content-end ms-auto align-items-center f-16 txt-ht_blue fw-bold font-bolder me-2">
                    <span>Currency :</span>
                  </FormLabel>
                  <AE
                    className="w-40 mt-1"
                    country="AE"
                    style={{
                      height: "20",
                    }}
                  />
                </div>
              </Col>
            </Row>
            <div
              className=""
              style={{
                margin: "5px 5px 5px 5px",
                width: "98%",
              }}
            >
              <div className="p-1 pt-3">
                <FormGroup className="d-flex align-items-center">
                  <FormLabel className="d-flex align-items-center mt-8 f-16 fw-bold txt_ht-blue">
                    <span className="ms-2 me-2">
                      <MdPayments style={{ fontSize: 20 }} />
                    </span>
                    Payment details
                  </FormLabel>
                </FormGroup>
              </div>

              <div className="p-1">
                <FormGroup className="d-flex justify-content-around">
                  <FormLabel>
                    Payment Type *
                    <FormSelect
                      className="mt-1 inputfocus"
                      name="paymenttype"
                      onChange={(e) =>
                        setChequerefnum(e.target.value === "Cheque")
                      }
                      style={{
                        width: 250,
                      }}
                    >
                      <option defaultChecked>Select the Category</option>
                      {props.masters.paymentTypes.map((payment)=>{
                        return (
                          <option key={payment.id}>{payment.value}</option>
                        )
                      })}
                    </FormSelect>
                  </FormLabel>
                  <FormLabel>
                    Amount <span style={{color:"red"}}>*</span>
                    <FormControl
                      className="mt-1 me-2 inputfocus"
                      type="number"
                      name="amount"
                      placeholder="AED"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        width: 250,
                      }}
                    />
                    {/* {errormessage && !amount && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        Please Enter the Amount.
                      </p>
                    )} */}
                  </FormLabel>
                  <FormLabel>
                    Reference No
                    <FormControl
                      className="mt-1 inputfocus"
                      name="referenceno"
                      style={{
                        width: 250,
                      }}
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
                <div className="p-1">
                  <FormGroup className="d-flex justify-content-evenly">
                    {chequerefnum && (
                      <FormLabel>
                        Cheque Date
                        <FormControl
                          className="mt-1 inputfocus"
                          type="date"
                          name="chequedate"
                          defaultValue={currentDate}
                          min={currentDate}
                          style={{
                            width: 250,
                          }}
                        ></FormControl>
                      </FormLabel>
                    )}
                    {chequerefnum && (
                      <FormLabel className="ms-2 me-2">
                        Collection Date
                        <FormControl
                          className="mt-1 inputfocus"
                          type="date"
                          name="collectiondate"
                          defaultValue={currentDate}
                          min={currentDate}
                          style={{
                            width: 250,
                          }}
                        ></FormControl>
                      </FormLabel>
                    )}
                    {chequerefnum && (
                      <FormLabel className="ms-4">
                        Cheque Number
                        <FormControl
                          className="mt-1 inputfocus"
                          type="text"
                          style={{
                            width: 250,
                          }}
                        ></FormControl>
                      </FormLabel>
                    )}
                  </FormGroup>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column align-item-center text-end pe-3 pt-3">
              <p className="txt-ht_blue f-16 fw-bold">
                <span>Due Amount :</span>
                <span
                  className="fst-normal"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
              <p className="txt-ht_blue f-16 fw-bolder">
                <span>Paid Amount :</span>
                <span
                  className="fst-normal"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
              <p className="txt-ht_blue f-16 fw-bolder">
                <span> Remaining Amount :</span>
                <span
                  className=""
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
    </>
  );
}

const mapsToProps = (state) => {
  return {
    masters: state.masterData,
    customers: state.customers,
    loginUsers: state.users,
  };
};

export default connect(mapsToProps)(Customerpay);