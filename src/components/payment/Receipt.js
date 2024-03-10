import React, { useEffect, useState } from "react";
import {
  Container,
  FormSelect,
  Pagination,
  Row,
  Table,
  Button,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useDispatch, connect } from "react-redux";
import { GET_ALL_RECEIPT_API_CALL } from "../../utils/Constant";

const  Receipt = (props) => {
  const [getcustomer, setgetcustomer] = useState([]);
  const [entitiesPerPage, setEntitiesPerPage] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredReceipt, setFilteredReceipt] = useState([])

  const dispatch = useDispatch();

  console.log(props)

  const handleDateChange = (dates) => {
    if (dates === NaN) {
      setStartDate();
      setEndDate();
    } else {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  useEffect(() => {
    dispatch({type: GET_ALL_RECEIPT_API_CALL})
  }, [])

  useEffect(() => {
    setFilteredReceipt(props.receipt.listAllReceipt);
  }, [props.receipt.listAllReceipt])

  // useEffect(() => {
  //   // dispatch({type: GET_ALL_CUSTOMERS_API_CALL, data: 3})
  //   axios
  //     .post("http://68.178.161.233:8080/handt/v2/payment/getAllReceipts")
  //     .then((response) => {
  //       setgetcustomer(response.data.data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  //   console.log(entitiesPerPage);
  // }, [entitiesPerPage]);

 

  // console.log("the data pages",entitiesPerPage);

  return (
    <div style={{ marginTop: 75, paddingLeft: 50, paddingRight: 50 }}>
      <Container fluid>
        <div
          className="d-flex mt-4 pt-4 "
          style={{
            // border: "1px solid #80808042",
            paddingLeft: "1%",
            paddingRight: "1%",
            marginBottom: "1%",
          }}
        >
          <Col>
            <Link to="/Customerpay">
              <Button
                className="b-none fw-bolder"
                style={{ backgroundColor: "#1d1d5e", color: "white" }}
              >
                New Receipt
              </Button>
            </Link>
          </Col>
          <Col>
            <InputGroup style={{ height: "10px", width: "100%" }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Customer..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setFilteredReceipt(props.receipt.listAllReceipt.filter((item) => {
                    console.log(item)
                    return item.customerName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
                  }));
                }}
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                  height: "35px",
                }}
              />
            </InputGroup>
          </Col>

          <Col className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex align-items-start pt-1 ms-3">
              <span className="showentity mt-1">Show entities</span>
              <FormSelect
                className="d-flex form-select align-item-center ms-2 w-40 mb-3 fs-6 inputfocus"
                onChange={(e) => {
                  setEntitiesPerPage(e.target.value);
                }}
                value={entitiesPerPage}
              >
                <option className="f-10" value={10}>
                  10
                </option>
                <option className="f-10" value={25}>
                  25
                </option>
                <option className="f-10" value={50}>
                  50
                </option>
              </FormSelect>
            </div>
          </Col>
        </div>
        <div style={{ height: 350, overflowY: "scroll" }}>
          <Table striped hover size="sm" bordered>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Customer Name
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Mode of Pay
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Reference Number
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipt.map((item) => (
                  <tr key={item.id}>
                    <td>{item.customerId}</td>
                    <td>{item.customerName}</td>
                    <td>{item.paymentTypeName}</td>
                    <td>{item.amount}</td>
                    <td>{item.referenceNumber}</td>
                  </tr>
                ))}
              {filteredReceipt.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="fst-italic"
                    style={{ color: "red" }}
                  >
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center ms-auto text-center mt-3">
          <Pagination size="md"></Pagination>
        </div>
      </Container>
    </div>
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    receipt: state.receipt
  };
};

export default connect(mapsToProps)(Receipt);
