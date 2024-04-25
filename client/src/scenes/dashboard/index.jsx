import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, Modal, TextField, Typography, useTheme } from '@mui/material';
import {
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
 
import Header from '@components/Header';
import {DataGrid} from "@mui/x-data-grid"
import FlexBetween from '@components/FlexBetween';
import StatBox from '@components/StatBox';
import { useGetLoansQuery } from '@state/api';
import {useSubmitFormDataMutation} from '@state/api';
import {format} from "date-fns"
import ButtonComponent from '@components/ButtonComponent';

const Dashboard = () => {
  const theme = useTheme();
  var isUser=false ; 
  const id = '63701cc1f03239c72c000182'; 
 
  const { data: loansData, isLoading: loansLoading } = useGetLoansQuery({ id: id });
  if (loansLoading) {
    return <div>Loading...</div>;
  }

  const [openForm, setOpenForm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [formData, setFormData] = useState({
    id:id,
    fullName: '',
    amountNeeded: '',
    loanTenure: '',
    employmentStatus: '',
    reasonForLoan: '',
    employmentAddress: '',
  });

  const [error, setError] = useState('');
  var [submitFormData, isLoading2] = useSubmitFormDataMutation();

  const columns = [
    { field: "reason", headerName: "User Recent Activity", flex: 1 },
    { field: "name", headerName: "Customer Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => format(new Date(params.value), "MMMM dd, yyyy"),
    },
    { field: "status", headerName: "Action", flex: 1 },
  ];
  const rows = loansData.map((loan, index) => ({ ...loan, id: index }));

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
if(id!="63701cc1f03239c72c000181" && id!="63701cc1f03239c72c000182"){
  isUser=true;
}
  const handleSubmit = async () => {
    const mandatoryFields = ['fullName', 'amountNeeded', 'loanTenure', 'employmentStatus', 'reasonForLoan', 'employmentAddress'];
    for (const field of mandatoryFields) {
      if (!formData[field]) {
        setError(`Please fill in the '${field}' field.`);
        return;
      }
    }
    try {
      const { data: responseData } = await submitFormData(formData);
      console.log('Form submitted successfully:', responseData);
      setFormData({
        fullName: '',
        amountNeeded: '',
        loanTenure: '',
        employmentStatus: '',
        reasonForLoan: '',
        employmentAddress: '',
      });
      setError('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      handleCloseForm();
    }
  };

  const handleAgreementChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleAgreementChange2 = (event) => {
    setAgreed2(event.target.checked);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
      if (name === "loanTenure") {
        if (!/^\d*$/.test(value)) {
          return;
        }
      }
      if (name === "amountNeeded") {
        if (!/^\d*$/.test(value)) {
          return;
        }
      }

    setFormData({
      ...formData,
      [name]: value,
    });
  };


    return (
      <Box m="2.5rem 3.5rem" >
        <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {isUser && (
          <Box>
          { <ButtonComponent label="Get A Loan" onClick={handleOpenForm} />}
        </Box>)}
      </FlexBetween>
   
        <Box mt="20px" width="100%">
         {
          !isUser&&(
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
            <StatBox
              title="Total Loans"
              value={100}
              increase="+14%"
              description="Since last month"
              icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
            />
            <StatBox
              title="Loans Today"
              value={123}
              increase="+21%"
              description="Since last month"
              icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
            />
   
            <StatBox
              title="Applied Loans"
              value={100}
              increase="+5%"
              description="Since last month"
              icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
            />
            <StatBox
              title="Rejected Loans"
              value={100}
              increase="+43%"
              description="Since last month"
              icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
            />
          </Box>
          )
         }
        
          <Box mt="20px" width="100%">
            <Typography variant="h6">Applied Loans</Typography>
            <DataGrid rows={rows} columns={columns} autoHeight pageSize={5} />
          </Box>
        </Box>
        <Modal
            open={openForm}
            onClose={handleCloseForm}
            aria-labelledby="loan-form-modal"
            aria-describedby="loan-form-modal-description"
          >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="loan-form-modal" sx={{ marginBottom: 2 }}>
            APPLY FOR A LOAN
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel htmlFor="full-name">Full Name (as it appears on bank account)</InputLabel>
              <TextField
                fullWidth
                id="full-name"
                name="fullName"
                margin="normal"
                placeholder="Full Name (as it appears on bank account)"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="amount-needed">How much do you need?</InputLabel>
              <TextField
                fullWidth
                id="amount-needed"
                name="amountNeeded"
                margin="normal"
                placeholder="How much do you need?"
                value={formData.amountNeeded}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="loan-tenure">Loan Tenure (in Months)</InputLabel>
              <TextField
                fullWidth
                id="loan-tenure"
                name="loanTenure"
                margin="normal"
                placeholder="Loan Tenure (in Months)"
                value={formData.loanTenure}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="employment-status">Employment Status</InputLabel>
              <TextField
                fullWidth
                id="employment-status"
                name="employmentStatus"
                margin="normal"
                placeholder="Employment Status"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="reason-for-loan">Reason for Loan</InputLabel>
              <TextField
                fullWidth
                id="reason-for-loan"
                name="reasonForLoan"
                margin="normal"
                multiline
                rows={4}
                placeholder="Reason for Loan"
                value={formData.reasonForLoan}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="employment-address">Employment Address</InputLabel>
              <TextField
                fullWidth
                id="employment-address"
                name="employmentAddress"
                margin="normal"
                placeholder="Employment Address"
                value={formData.employmentAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={agreed} onChange={handleAgreementChange} />}
                label="I agree to the terms and conditions"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={agreed2} onChange={handleAgreementChange2} />}
                label="Any personal and credit information obtained may be disclosed"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!agreed || !agreed2}>
                Submit
              </Button>
              <Button onClick={handleCloseForm}>Close</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      </Box>
    );
};

export default Dashboard;
