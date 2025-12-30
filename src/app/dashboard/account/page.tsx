"use client";

import * as React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

export default function Page() {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({
		studentName: "",
		studentId: "",
		packageName: "",
		packageAmount: "",
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Generate receipt text
	const generateReceipt = () => {
		const today = new Date();
		const dateStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

		return `
    <div style="font-family: Arial, sans-serif; width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px;">
      <h3 style="text-align: center;">Receipt / Payment Confirmation</h3>
    <!-- Logo -->
      <div style="text-align: center; margin-bottom: 20px;">
       <img src="/assets/ad-logo.jpg" alt="AD SIGN SWIMMING ACADEMY" style="max-width: 100px;" />
      </div>
      <!-- Academy info -->
      <div style="text-align: center; margin-bottom: 20px; font-size: 14px; line-height: 1.4;">
        <h2>AD SIGN SWIMMING ACADEMY</h2>
        <div>AD SIGN SPORTS (PVT) LTD</div>
        <div>074 2 300 350</div>
        <div>091 2 26 24 25</div>
        <p><strong>Issue date :</strong> ${dateStr}</p>
      </div>
      

      <p><strong>Student Name:</strong> ${formData.studentName}</p>
      <p><strong>Student ID:</strong> ${formData.studentId}</p>
      <p><strong>Package Name:</strong> ${formData.packageName}</p>
      <p><strong>Amount Paid:</strong> LKR ${formData.packageAmount}</p>
      <p><strong>Date:</strong> ${dateStr}</p>

      <hr />

      <p>This receipt confirms that the student has paid the selected package.<br/>Thank you for your payment.</p>
    <!-- QR  -->
      <div style="text-align: center; margin-bottom: 20px;">
       <img src="/assets/ad-qr.png" alt="AD SIGN SWIMMING ACADEMY" style="max-width: 100px;" />
      </div>
      <!-- Signature -->
      <div style="margin-top: 50px;">
        <p>Authorized Signature:</p>
      </div>
    </div>;`;
	};

	const handlePrint = () => {
		const html = generateReceipt();
		const w = window.open("", "_blank");
		if (!w) return;

		w.document.title = "Payment Receipt";
  
		// Inject HTML directly
		w.document.body.innerHTML = html;

		w.print();
		// w.close(); // optional
	};
	const handleSave = () => {
		handleClose();
		handlePrint();
	};

	return (
		<Stack spacing={3}>
			<Typography variant="h4">Account</Typography>

			<Grid container spacing={3}>
				<Grid
					size={{
						lg: 8,
						md: 6,
						xs: 12,
					}}
				>
					<Button variant="contained" onClick={handleOpen}>
						Generate Bill
					</Button>
				</Grid>
			</Grid>

			{/* Modal for user input */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Enter Student Payment Details</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Student Name"
						name="studentName"
						fullWidth
						value={formData.studentName}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						label="Student ID"
						name="studentId"
						fullWidth
						value={formData.studentId}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						label="Package Name"
						name="packageName"
						fullWidth
						value={formData.packageName}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						label="Amount Paid (£)"
						name="packageAmount"
						type="number"
						fullWidth
						value={formData.packageAmount}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave} variant="contained">
						Save & Print
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}
