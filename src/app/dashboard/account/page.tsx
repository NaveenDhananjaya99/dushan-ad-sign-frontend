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
AD SIGN SWIMMING ACADEMY
123 STORE ST, store@store.com, www.store.com
--------------------------------------------

Receipt / Payment Confirmation

Student Name : ${formData.studentName}
Student ID   : ${formData.studentId}
Package Name : ${formData.packageName}
Amount Paid  : £${formData.packageAmount}
Date         : ${dateStr}

--------------------------------------------
This receipt confirms that the student has paid the selected package.
Thank you for your payment.

Authorized Signature: ______________________
`;
	};

	const handlePrint = () => {
		const text = generateReceipt();
		const w = window.open("", "_blank");
		if (!w) return;

		w.document.title = "Payment Receipt";

		const pre = w.document.createElement("pre");
		pre.textContent = text;
		pre.style.fontFamily = "monospace";
		pre.style.fontSize = "14px";
		pre.style.whiteSpace = "pre-wrap"; // wrap long lines
		pre.style.margin = "20px";
		w.document.body.appendChild(pre);

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
