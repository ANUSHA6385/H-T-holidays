import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Container,
  InputGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Invoice.css";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { GET_ALL_INVOICE_API_CALL, GENERATE_INVOICE_PDF_API_CALL, RESET_INVOICE_CODE } from "../../utils/Constant";

const Newproduct = (props) => {
  //use states
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();
  
  console.log(props)

  useEffect(() => {
    dispatch({ type: GET_ALL_INVOICE_API_CALL });
  }, []);

  useEffect(() => {
    if (props.invoice.code === 100) {
      window.open(props.invoice.fileurl, "_blank")
      dispatch({type: RESET_INVOICE_CODE})
    }
  }, [props.invoice.code])

  //Handlers
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

  //Dummy table headers
  const tableValue = [
    "Invoice No",
    "Customer Name",
    "Invoice Date",
    "Due Date",
    "Net",
    "Total Amount",
    "Action",
  ];

  return (
    <Container fluid className="mt-2">
      <div style={{ paddingLeft: 50, paddingRight: 50,marginTop:75 }}>
        <Row className="ms-1">
          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20"
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10 px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount
                  <br />
                  <span style={{ color: "black" }}>{(props.invoice.totalAmount)} AED</span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "19%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  <span style={{ color: "black" }}>{(props.invoice.unpaidAmount)} AED</span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "26%",
                    color: "blue",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  <span style={{ color: "black" }}>{(props.invoice.paidAmount)} AED</span>
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20 "
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount :{" "}
                  <span style={{ color: "black" }}>{(props.invoice.totalAmount)} AED</span>
                </p>
                <p
                  style={{
                    marginLeft: "51%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid : <span style={{ color: "black" }}>{(props.invoice.unpaidAmount)} AED</span>
                </p>
              </div>
              <ProgressBar
                className="progress"
                now={parseInt(
                  ((props.invoice.paidAmount) /
                    (props.invoice.totalAmount)) *
                    100
                )}
                style={{ width: "93%", marginLeft: "21px" }}
              />
              <div className="d-flex">
                <div class="square"></div>
                <p
                  style={{
                    marginLeft: "-7%",
                    fontSize: "14px",
                    marginTop: "2px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  {(props.invoice.paidAmount).toFixed(2)} AED
                </p>
                <div
                  class="square"
                  style={{ marginLeft: "15%", background: "#d2d4d7" }}
                ></div>
                <p
                  style={{
                    marginLeft: "-6%",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  {(props.invoice.unpaidAmount).toFixed(2)} AED
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "2%" }}>
          <Col className="col-8" style={{ paddingLeft: "2%" }}>
            <div className="d-flex">
              <Link
                to="/NewInvoice"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  style={{
                    backgroundColor: "#1d1d5e",
                    borderColor: "#1d1d5e",
                    width: "80px",
                  }}
                >
                  New +
                </Button>
              </Link>
              <InputGroup
                style={{ height: "10px", width: "39%", marginLeft: "10%" }}
              >
                <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <FormControl
                  placeholder="Search Invoice..."
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "#80808036",
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "white",
                  }}
                />
              </InputGroup>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-end"
            style={{ marginLeft: "75px" }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              dateFormat={"yyyy/MM/dd"}
              placeholderText="Select Date Range"
              className="rounded"
            />
          </Col>
        </Row>
        <div
          style={{ paddingLeft: "1%", paddingRight: "1%", overflowY:"scroll", height:350 }}
          className="mt-3 mb-4"
        >
          <Table striped hover size="sm" bordered>
            <thead>
              <tr>
                {tableValue.map((tablename, index) => (
                  <th
                    key={index}
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    {tablename}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.invoice.invoiceList
                .filter((item) => {
                  const invoiceDate = new Date(item.invoiceDate);
                  return (
                    (search.toLowerCase() === ""
                      ? item
                      : item.customerName
                          .toLowerCase()
                          .includes(search.toLowerCase())) &&
                    (!startDate ||
                      !endDate ||
                      (invoiceDate >= startDate && invoiceDate <= endDate))
                  );
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.invoiceOrderId}</td>
                    <td>{item.customerName}</td>
                    <td>{item.invoiceDate}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.net}</td>
                    <td>{item.totalAmount}</td>
                    <td>
                      {
                        item.products.length > 0 ? <FiDownload style={{cursor:"pointer"}} onClick={() => {
                          if (item.supplierPOUrl) {
                              window.open(item.supplierPOUrl, "_new")
                          }
                          else {
                            dispatch({type: GENERATE_INVOICE_PDF_API_CALL, invoiceId: item.invoiceOrderId})
                          }
                        }} /> : null
                      }
                      
                    </td>
                  </tr>
                ))}
                {props.invoice.invoiceList
                .filter((item) => {
                  const invoiceDate = new Date(item.invoiceDate);
                  return (
                    (search.toLowerCase() === ""
                      ? item
                      : item.customerName
                          .toLowerCase()
                          .includes(search.toLowerCase())) &&
                    (!startDate ||
                      !endDate ||
                      (invoiceDate >= startDate && invoiceDate <= endDate))
                  );
                }).length === 0 && (
                  <tr>
                  <td
                    colSpan={7}
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
      </div>
    </Container>
  );
};

const mapsToProps = (state) => {
  return {
    invoice: state.invoice,
  };
};

export default connect(mapsToProps)(Newproduct);