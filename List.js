import React, { useEffect, useState } from "react";
import readExcelFile from "./readExcelFile";
import ExcelData from "./export29913.xlsx";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Box,
  Grid,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Selects from "react-select";

const pageSx = {
  pageContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "#4747ff",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "400 !important",
    fontSize: "16px",
    height: "max-content",
    padding: "30px",
    "& .MuiTable-root": {
      borderBottom: "none !important",
      paddingTop: "20px",
      paddingBottom: "20px",
    },
    "& .MuiTableCell-root": {
      fontSize: "16px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4a7bf7 !important",
    },
    "&.css-ypiqx9-MuiDialogContent-root": {
      overflow: "visible",
    },
  },
};

const SupplierDropdown = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [ponumbers, setPoNumbers] = useState([]);
  const [excelDatas, setExcelDatas] = useState([]);
    const [newForm, setNewForm] = useState({
    name: "",
    starttime: "",
    endtime: "",
    hoursworked: "",
    rateperhour: "",
    supplier: "",
    ponumber: "",
  });

  const [savedData, setSavedData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // Fetch supplier data from Excel file
    const fetchSuppliers = async () => {
      try {
        // Load the Excel file
        const file = await fetch(ExcelData);
        const blob = await file.blob();

        // Read the Excel file and extract the supplier data
        const data = await readExcelFile(blob);

        const transformedArray = data.map((item) => {
          const transformedItem = {};
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const lowercaseKey = key.replace(/ /g, "").toLowerCase();
              transformedItem[lowercaseKey] = item[key];
            }
          }
          return transformedItem;
        });

        const filledArray = transformedArray.map((item, index, arr) => {
          if (item.supplier === "") {
            const samePoNumber = arr.find(
              (otherItem) =>
                otherItem.ponumber === item.ponumber &&
                otherItem.supplier !== ""
            );
            if (samePoNumber) {
              item.supplier = samePoNumber.supplier;
            }
          }
          return item;
        });
        setExcelDatas(filledArray);
        const uniq = filledArray.map((data) => ({
          ...data,
          label: data.supplier,
          value: data.supplier,
        }));

        // Create a new array with duplicates removed based on the 'supplier' property
        const uniqueArray = uniq.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.supplier === item.supplier)
        );

        setSuppliers(uniqueArray);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplier = (e) => {
    // Use the filter method to get all items with the specified supplier value
    const filteredData = excelDatas.filter((item) => item.supplier === e.value);

    let uniqPono = filteredData.map((data) => ({
      ...data,
      value: data.ponumber,
      label: `${data.ponumber} - ${data.description}`,
    }));

    setPoNumbers(uniqPono);
  };

  const handleHours = () => {
    // Get the start and end times from the newForm object.
    const start = newForm?.starttime;
    const end = newForm?.endtime;

    // If either start or end is null or undefined, return.
    if (!start || !end) {
      return;
    }

    // Split the start and end times into hours and minutes.
    const startHour = parseInt(start.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const endHour = parseInt(end.split(":")[0]);
    const endMinute = parseInt(end.split(":")[1]);

    // Calculate the difference between the start and end times in minutes.
    const minutesBetween =
      (endHour - startHour) * 60 + (endMinute - startMinute);

    // Calculate the number of hours between the start and end times.
    const hoursBetween = minutesBetween / 60;
    setNewForm({ ...newForm, hoursworked: hoursBetween });
  };

  useEffect(() => {
    handleHours();
  }, [newForm.starttime, newForm.endtime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Load existing data from localStorage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("docketData")) || [];

    // Append the new data (newForm) to the array
    existingData.push(newForm);

    // Store the updated array in localStorage
    localStorage.setItem("docketData", JSON.stringify(existingData));
    handleClose();
    setNewForm({
      ...newForm,
      name: "",
      starttime: "",
      endtime: "",
      hoursworked: "",
      rateperhour: "",
      supplier: "",
      ponumber: "",
    });
    let localdata = localStorage.getItem("docketData");

    let addId = JSON.parse(localdata);

    let addSerial = addId.map((d, i) => ({
      ...d,
      id: i + 1,
    }));
    setSavedData(addSerial);
  };

  useEffect(() => {
    let localdata = localStorage.getItem("docketData");

    let addId = JSON.parse(localdata);

    let addSerial = addId?.map((d, i) => ({
      ...d,
      id: i + 1,
    }));
    setSavedData(addSerial);
  }, []);


    

  return (
    <Box>
      <Typography variant="h4"  sx={{fontFamily:"serif"}}>Supplier List</Typography>
      <br />
      <Box sx={pageSx.wholecontainer}>
        <Grid sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleOpen} variant="contained">
            ADD
          </Button>
        </Grid>

        <TableContainer >
          <br/>
          <Table aria-label="simple table" id="table" style={{  }}>
            <TableHead sx={{ fontWeight: "600" }}>
              <TableRow>
              <TableCell sx={{ backgroundColor:"#0047AB" , color:"whitesmoke" , fontWeight:"bold"}}>S.No</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" , color:"whitesmoke" ,fontWeight:"bold"}}>Name</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" , color:"whitesmoke" , fontWeight:"bold"}}>Start time</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" ,  color:"whitesmoke" ,fontWeight:"bold"}}>End time</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" ,  color:"whitesmoke" ,fontWeight:"bold"}}>No.of hours worked</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" , color:"whitesmoke" ,fontWeight:"bold"}}>Rate per hour</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" ,  color:"whitesmoke" ,fontWeight:"bold"}}>Supplier</TableCell>
                <TableCell sx={{backgroundColor:"#0047AB" , color:"whitesmoke" , fontWeight:"bold"}}>Po Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {Array.isArray(savedData) && savedData.length > 0 ? (
                savedData.map((row, index) => (
                  <TableRow key={index} sx={{backgroundColor:index   % 2 !== 0  ? "#ececec"  : "white"  }}>
                     <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.starttime}</TableCell>
                    <TableCell>{row.endtime}</TableCell>
                    <TableCell>{row.hoursworked}</TableCell>
                    <TableCell>{row.rateperhour}</TableCell>
                    <TableCell>{row.supplier}</TableCell>
                    <TableCell>{row.ponumber}</TableCell>
                    
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell  sx={{textAlign:"center"}} colSpan={10}>  No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
        >
          <DialogTitle>
            <Typography variant="h4" fontFamily={'serif'}>Add Supplier Details  </Typography>
          </DialogTitle>  
          <DialogContent
            style={{ height: "420px" }}
            sx={pageSx.pageContainer}
            dividers
          >
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2">  <b>Name</b></InputLabel>
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    type="text"
                    value={newForm.name}
                    placeholder="Enter your name"
                    onChange={(e) => {
                      setNewForm({ ...newForm, name: e.target.value });
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2">  <b>Start time</b></InputLabel>

                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    type="time"
                    id="appt"
                    name="appt"
                    value={newForm.starttime}
                    onChange={(e) => {
                      setNewForm({ ...newForm, starttime: e.target.value });
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2">  <b>End time</b></InputLabel>

                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    type="time"
                    id="ccc"
                    value={newForm.endtime}
                    onChange={(e) => {
                      setNewForm({ ...newForm, endtime: e.target.value });
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2"><b>No.of hours worked</b>   </InputLabel>
                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    type="text"
                    value={newForm.hoursworked}
                    onChange={(e) => {}}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2"> <b>Rate per hour</b>  </InputLabel>

                <FormControl size="small" fullWidth>
                  <OutlinedInput
                    type="number"
                    value={newForm.rateperhour}
                    onChange={(e) => {
                      setNewForm({ ...newForm, rateperhour: e.target.value });
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2"><b>Supplier name</b>     </InputLabel>

                <FormControl fullWidth>
                  <Selects
                    fullWidth
                    size="small"
                    id="combo-box-demo"
                    options={suppliers}
                    onChange={(e) => {
                      handleSupplier(e);
                      setNewForm({ ...newForm, supplier: e.value });
                    }}
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 9999,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} xs={12} sm={12}>
                <InputLabel variant="body2"><b>Purchase order</b></InputLabel>

                <FormControl size="small" fullWidth>
                  <Selects
                    size="small"
                    id="combo-box-demo"
                    options={ponumbers}
                    sx={{ width: 500 }}
                    onChange={(e) => {
                      setNewForm({ ...newForm, ponumber: e.value });
                    }}
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 9999,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12} sm={12}></Grid>
              <Grid item md={4} xs={12} sm={12}></Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
              
               
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  
                >
                  Submit
                </Button>
                &emsp;
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SupplierDropdown;
