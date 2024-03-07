import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Modal,
  Form,
  Alert,
  Pagination,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { useDispatch, connect } from "react-redux";
import {
  GET_ALL_PRODUCTS_API_CALL,
  ADD_PRODUCT_API_CALL,
  GET_ALL_CUSTOMERS_API_CALL,
  MASTER_API_CALL
} from "../../utils/Constant";

const Newproduct = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [search, setSearch] = useState("");  
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [supplierNameError, setSupplierNameError] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [productType, setProductType] = useState(" SERVICES");
  const [productUrl, setProductUrl] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierId, setSupplierId] = useState();
  const [startingIndex, setStartIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(15);
  const [success, setSuccess] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [handtCategories, setHandtCategories] = useState([]);
  const [masterCategory, setMasterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [masterCategoryError, setMasterCategoryError] = useState(false);

  useEffect(() => {
    if (showAlertModal) {
      const timeoutId = setTimeout(() => {
        setShowAlertModal(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlertModal]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL });

    if (props.customers.customersList.length === 0) {
      dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
    }
  }, [dispatch, props.customers.customersList.length]);

  useEffect(() => {
    setFilteredData(props.productsData.products)
  }, [props.productsData.products])


  const handleCloseModal = () => {

    setShowModal(false);
  };

  const handleFilter = (e) => {
    if (e.target.value.length > 0) {
      const tempArray = props.productsData.products.filter((item) => {
        return item.productName.toLowerCase().includes(e.target.value.toLowerCase());
      })
  
      setFilteredData(tempArray)
    }
    else {
      setFilteredData(props.productsData.products)
    }
  }
  
  const handleShowModal = () => setShowModal(true);

  const handleCloseAlertModal = () => setShowAlertModal(false);

  const handleSubmit = () => {
    if (!productName.trim()) {
      setProductNameError(true);
      return;
    }

    if (!masterCategory) {
      setMasterCategoryError(true);
      return;
    }

    const isProductNameExists = props.productsData.products.some(
      (item) => item.productName === productName
    );
    if (isProductNameExists) {
      alert("Product name already exists!");
      return;
    }

    const bodyData = {
      productName: productName,
      supplierId: supplierId,
      productType: masterCategory[0].id,
      productDescription: description,
      supplierName: supplierName,
      createdBy: props.loggedInUser.loginId,
      productUrl: productUrl,
    };

    console.log("Body Data:", bodyData);
    dispatch({ type: ADD_PRODUCT_API_CALL, payload: bodyData });

    setShowModal(false);

    // Reset the input fields
    setProductType("SERVICES");
    setProductName("");
    setProductUrl("");
    setDescription("");
    setMasterCategory("");
    setSupplierNameError(false);
    setProductNameError(false);
    setShowAlertModal(true);
    setSuccess("Success");
  };

  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
  };

  const paginationEvent = (index) => {
    setCurrentPage(index);
    setStartIndex((index - 1) * 15);
    setEndingIndex(index * 15);
  };

  const tableValue = ["Product Name", "Product Type", "Description", "Action"];

  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://68.178.161.233:8080/handt/v2/common/getmaster"
    //     );
    //     console.log(response.data.data);
    //     setHandtCategories(response.data.data.handtCategories);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchCategories();

    dispatch({type: MASTER_API_CALL})
  }, []);

  const renderPagination = useCallback(() => {
    const totalNoOfProducts = filteredData;
    const noOfPages = Math.ceil(totalNoOfProducts.length / 15);
    let startPage = Math.min(1, currentPage);
    let endPage = Math.min(2, noOfPages);

    if (currentPage >= noOfPages - 1) {
      startPage = Math.max(1, noOfPages - 1);
      endPage = noOfPages;
    }

    return (
      <div
        className="pagenation"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pagination>
          <Pagination.First onClick={() => paginationEvent(1)} />
          <Pagination.Prev
            onClick={() => paginationEvent(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: endPage }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => paginationEvent(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          {noOfPages > 2 && (
            <>
              {currentPage < noOfPages - 1 && <Pagination.Ellipsis disabled />}
              <Pagination.Item
                key={noOfPages}
                active={currentPage === noOfPages}
                onClick={() => paginationEvent(noOfPages)}
              >
                {noOfPages}
              </Pagination.Item>
            </>
          )}

          <Pagination.Next
            onClick={() => paginationEvent(currentPage + 1)}
            disabled={currentPage === noOfPages}
          />

          <Pagination.Last
            onClick={() => paginationEvent(noOfPages)}
            disabled={currentPage === noOfPages}
          />
        </Pagination>
      </div>
    );
  }, [filteredData, currentPage]);

  return (
    <div style={{ paddingRight: 50, paddingLeft: 50 }}>
      <Row style={{ marginTop: "2%" }}>
        <Col className="col-8" style={{}}>
          <div className="d-flex">
            <Button
              onClick={handleShowModal}
              style={{
                background: "#1d1d5e",
                color: "white",
                width: "11%",
                height: "31px",
                textAlign: "center",
                border: "none",
                padding: "0px",
                marginTop: "3px",
              }}
            >
              New +
            </Button>

            <p
              style={{
                marginLeft: "38px",
                marginTop: "6px",
                marginRight: "13px",
                color: "#1d1d5e",
                fontWeight: "bold",
              }}
            >
              Products
            </p>

            <InputGroup
              style={{
                height: "10px",
                width: "27%",
                marginLeft: "10%",
                fontWeight: "bold",
              }}
            >
              <FormControl
                placeholder="Search Products..."
                onChange={(e) => {
                  setSearch(e.target.value)
                  handleFilter(e)
                }}
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
      </Row>
      <div className="mt-4" fluid style={{ flex: 1 }}>
        <Table striped hover>
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "#fff",
            }}
          >
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
            {filteredData
              .map((items) => (
                <tr key={items.id}>
                  <td>{items.productName}</td>
                  <td>{items.productType}</td>
                  <td
                    style={{
                      maxWidth: "20px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <div
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      title={items.productDescription}
                    >
                      {items.productDescription
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}
                      {items.productDescription.split(" ").length > 10 && "..."}
                    </div>
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleOptionClick1(items.id)}
                      style={{
                        alignItems: "center",
                        marginLeft: "13px",
                        marginBottom: "-3px",
                      }}
                    />

                    <MdDelete style={{ marginLeft: "13px" }} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px", color: "#1d1d5e" }}>
            New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <p
              style={{
                border: "none",
                marginRight: "10px",
                color: "#1d1d5e",
                marginBottom: "16px",
                fontSize: "16px",
                marginTop: "10px",
                margin: "-2px 6px 17px -4px",
              }}
            >
              General Info
            </p>
          </div>
          <Row>
            <Col>
              <div style={{ display: "flex", flexDirection: "column" }}>
               

                <div
                  className={`mb-3 ${masterCategory ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product Type
                  </label>
                  <Typeahead
                    id="masterCategoryTypeahead"
                    className="inputfocus"
                    style={{ flex: 3, marginRight: "1px" }}
                    selected={masterCategory} // Initialize with current state value
                    options={props.masterData.handtCategories.map((category) => ({
                      id: category.id,
                      label: category.value,
                    }))}
                    labelKey="label"
                    onChange={(selected) => {
                      setMasterCategory(selected);
                      setSupplierNameError(false);
                    }}
                    placeholder="Select Product type"
                  />

                  {masterCategoryError && (
                    <span
                      style={{
                        color: "red",
                        marginTop: "51px",
                        marginLeft: "-32%",
                        fontSize: "12px",
                      }}
                    >
                      Master Category Required
                    </span>
                  )}
                </div>

                <div
                  className={`mb-3 ${productNameError ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{
                      flex: 3,
                      marginLeft: "14px",
                    }}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setProductNameError(false);
                    }}
                  />
                  {productNameError && (
                    <span
                      style={{
                        color: "red",
                        marginTop: "53px",
                        marginLeft: "-29%",
                        fontSize: "12px",
                      }}
                    >
                      Product Name Required
                    </span>
                  )}
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label"
                    style={{ fontSize: "14px", flex: 2 }}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control inputfocus description"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ flex: 3, marginLeft: "20px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="button"
            onClick={handleSubmit}
            style={{
              background: "#1d1d5e",
              color: "white",
              width: "13%",
              height: "31px",
              textAlign: "center",
              border: "none",
              padding: "0px",
              marginTop: "4px",
              marginRight: "22px",
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAlertModal}>
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

      {props.productsData.error ? (
        <Alert clas>[No Customer Data Fount]</Alert>
      ) : null}

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          paddingBottom: 100,
        }}
      >
        {props.productsData.products?.length > 0 ? renderPagination() : null}
      </div>
    </div>
  );
};

const mapsToProps = (state) => {
  return {
    productsData: state.productsData,
    loggedInUser: state.users,
    customers: state.customers,
    masterData: state.masterData
  };
};
export default connect(mapsToProps)(Newproduct);
