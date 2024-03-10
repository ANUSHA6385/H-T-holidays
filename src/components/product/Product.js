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
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; 
import InputGroup from "react-bootstrap/InputGroup";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { useDispatch, connect } from "react-redux";
import { GET_ALL_PRODUCTS_API_CALL, ADD_PRODUCT_API_CALL, GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";
const Newproduct = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModaledit = () => setShowModaledit(false);
  const handleCloseAlertModal = () => setShowAlertModal(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [supplierNameError, setSupplierNameError] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [productType, setProductType] = useState(" SERVICES");
  const [productUrl, setProductUrl] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierId, setSupplierId] = useState();
  const [startingIndex, setStartIndex] = useState(0)
  const [endingIndex, setEndingIndex] = useState(10)
  const [success, setSuccess] = useState();
  const [customerCategories, setCustomerCategories] = useState([]);
  const [masterCategory, setMasterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [masterCategoryError, setMasterCategoryError] = useState(false);

  


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
  
    if (props.customers.customersList.length === 0) {
      dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
    }
  }, [dispatch, props.customers.customersList.length]);
  
  const handleSubmit = () => {
    try {
      if (!productName.trim()) {
        setProductNameError(true);
        return;
      }
      if (!masterCategory) {
        setMasterCategoryError(true);
        return;
      }
  
      const isProductNameExists = props.productsData.products.some(item => item.productName === productName);
      if (isProductNameExists) {
        alert("Product name already exists!");
        return;
      }
  
      const bodyData = {
        productName: productName,
        supplierId: supplierId,
        productType: productType,
        productDescription: description,
        supplierName: supplierName,
        createdBy: props.loggedInUser.loginId,
        productUrl: productUrl,
        masterCategory: masterCategory,
      };
  
      console.log("Body Data:", bodyData);
      dispatch({ type: ADD_PRODUCT_API_CALL, payload: bodyData });
      setShowModal(false);
      setProductType("SERVICES");
      setProductName("");
      setProductUrl("");
      setDescription("");
      setMasterCategory("");
      setSupplierNameError(false);
      setProductNameError(false);
      setShowAlertModal(false);
      resetInputFields();

      toast.success("Data Saved Successfully");
    } catch (error) {
      console.error("Error adding product:", error);

      toast.error("Failed to save data");
    }
    
  };
  
  const resetInputFields = () => {
    setProductType("SERVICES");
    setProductName("");
    setProductUrl("");
    setDescription("");
    setMasterCategory("");
    setSupplierNameError(false);
    setProductNameError(false);
    
  };
  
  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
    handleCloseModaledit();
  };
  const paginationEvent = (index) => {
    setCurrentPage(index);
    setStartIndex((index - 1) * 10);
    setEndingIndex(index * 10);
  };
  const tableValue = [
    "Product Name",
    "Product Type",
    "Description",
    "Action",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://68.178.161.233:8080/handt/v2/common/getmaster');
        console.log(response.data.data);
        setCustomerCategories(response.data.data.handtCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderPagination = useCallback(() => {
  const totalNoOfProducts = props.productsData.products;
  const noOfPages = Math.ceil(totalNoOfProducts.length / 10);
  let startPage = Math.min(1, currentPage);
  let endPage = Math.min(startPage + 2, noOfPages); 

  if (currentPage >= noOfPages - 1) {
    startPage = Math.max(1, noOfPages - 2);
    endPage = noOfPages;
  } else if (currentPage > 1) {
    startPage = currentPage - 1;
    endPage = Math.min(currentPage + 1, noOfPages); 
  }
  return (
    <div className="pagenation" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Pagination>
        <Pagination.First onClick={() => paginationEvent(1)} />
        <Pagination.Prev
          onClick={() => paginationEvent(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <Pagination.Item
            key={startPage + index}
            active={currentPage === startPage + index}
            onClick={() => paginationEvent(startPage + index)}
          >
            {startPage + index}
          </Pagination.Item>
        ))}
        {noOfPages > 3 && currentPage < noOfPages - 2 && (
          <>
            <Pagination.Ellipsis disabled />
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
}, [props.productsData.products, currentPage]);
  return (
    <div style={{ paddingRight: 50, paddingLeft: 50 ,marginTop:70}}>
        <ToastContainer position="top-right" autoClose={3000} />
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
                fontWeight:'bold'
              }}
            >
              Products
            </p>

            <InputGroup
              style={{ height: "10px", width: "27%", marginLeft: "10%",fontWeight: 'bold' }}
            >
              <FormControl
                placeholder="Search Products..."
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
      </Row>
      <div
        className="mt-4"
        fluid
        style={{ flex: 1 }}
      >
        <Table striped hover>
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
            {props.productsData.products.filter((items) => {
              return search.toLowerCase() === ""
                ? items
                : items.productName
                  .toLowerCase()
                  .includes(search.toLowerCase());
            })
              .sort((a, b) => b.id - a.id)
              .slice(startingIndex, endingIndex)
              .map((items) => (
                <tr key={items.id}>

                  <td>{items.productName}</td>
                  <td>{items.productType}</td>
<td style={{ maxWidth: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} title={items.productDescription}>
    {items.productDescription.split(' ').slice(0, 10).join(' ')}
    {items.productDescription.split(' ').length > 10 && '...'}
  </div>
</td>
                  <td>
          <FaEdit onClick={() => handleOptionClick1(items.id)} style={{ alignItems: 'center', marginLeft: '13px', marginBottom: '-3px' }} />
          <MdDelete style={{ marginLeft: '13px' }} />
        </td>
      </tr>
    ))}
  {props.productsData.products.length === 0 && (
    <tr>
      <td colSpan="4" style={{ textAlign: 'center' }}>No data found</td>
    </tr>
  )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton onClick={resetInputFields}>
        
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
            

                <div className={`mb-3 ${masterCategoryError ? "has-error" : ""}`} style={{ display: "flex", alignItems: "center" }}>

  <label className="control-label mr-3" style={{ fontSize: "14px", padding: "0px", flex: 2 }}>
    Master Category <span style={{ color: 'red' }}>*</span>
  </label>
  <Typeahead
    id="masterCategoryTypeahead"
    className="inputfocus"
    style={{ flex: 3, marginRight: '1px' }} 
    selected={masterCategory} // Initialize with current state value
    options={customerCategories.map((category) => ({
      id: category.id,
      label: category.value
    }))}
    labelKey="label"
    onChange={(selected) => {
      setMasterCategory(selected);
      setMasterCategoryError(false); // Reset the error when a selection is made
    }}
    placeholder="Search..." 
  />
  {masterCategoryError && !masterCategory && (
    <span style={{ color: "red", marginTop: '48px', marginLeft: '-32%', fontSize: '12px' }}>Master Category Required</span>
  )}
</div>
                <div className={`mb-3 ${masterCategoryError ? "has-error" : ""}`} style={{ display: "flex", alignItems: "center" }}>

                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{
                      flex: 3,
                 marginLeft:17,
                    }}
                   
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setProductNameError(false);
                    }}
                  />
                  {productNameError && (
                    <span style={{ color: "red", marginTop: '53px', marginLeft: '-29%', fontSize: '12px' }}>Product Name Required</span>
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
                    style={{ flex: 3, marginLeft: '20px' }}
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
      <Modal
        show={showModaledit}
        onHide={handleCloseModaledit}
        className="modelcontent"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px", color: "#1d1d5e" }}>
            Edit Product
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
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px" }}
                  >
                    Product Type
                  </label>

                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "22%", width: "50%", padding: "2px", background: '#d9e1ee8c' }}
                    defaultValue="  H_T HOLIDAYS"
                    readOnly
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Supplier Name
                  </label>
                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "89px", width: "50%", padding: "2px" }}

                  />
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Product Name
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "20%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label className="control-label" style={{ fontSize: "14px" }}>
                    Description
                  </label>
                  <textarea
                    className="form-control inputfocus"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ marginLeft: "25%", width: "50%" }}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="button"
            onClick={handleCloseModaledit}
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
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingBottom: 100 }}>
        {
          props.productsData.products?.length > 0 ? renderPagination() : null
        }
      </div>

    </div>
  );
};


const mapsToProps = (state) => {
  return {
    productsData: state.productsData,
    loggedInUser: state.users,
    customers: state.customers
  }
}

export default connect(mapsToProps)(Newproduct);