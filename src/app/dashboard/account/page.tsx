"use client";

import * as React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
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
<html>
<head>
  <style>
    @page {
      size: 80mm 297mm;   /* RECEIPT SIZE */
    }

    @media print {
      body { margin: 0; }
    }

    .receipt {
      font-family: Arial, sans-serif;
      width: 80mm;       
      margin: 0 auto;
      box-sizing: border-box;
      text-aglign:center;
    }

    h2, h3 {
      margin: 6px 0;
      text-align: center;
    }

    p {
      margin: 4px 0;
      font-size: 13px;
    }

    hr {
      border: none;
      border-top: 1px solid #aaa;
      margin: 10px 0;
    }
  </style>
</head>

<body>
  <div class="receipt">

    <h3>Payment Confirmation</h3>

    <div style="text-align:center;">
      <img src="/assets/ad-logo.jpg" style="max-width: 32mm;" />
    </div>

    <div style="text-align:center; font-size: 12px; line-height: 1.4; margin-bottom: 10px;">
      <h3>AD SIGN SWIMMING ACADEMY</h3>
      <div>074 2 300 350</div>
      <div>091 2 26 24 25</div>
      <p><strong>Issue date :</strong> ${dateStr}</p>
    </div>

    <p><strong>Student Name:</strong> ${formData.studentName}</p>
    <p><strong>Student ID:</strong> ${formData.studentId}</p>
    <p><strong>Package Name:</strong> ${formData.packageName}</p>
    <p><strong>Amount Paid:</strong> LKR ${formData.packageAmount}</p>

    <hr />

    <p>This receipt confirms that the student has paid the selected package.<br/></p>

    <div style="text-align:center;">
      <img src="/assets/add-qr.svg" style="max-width: 38mm;" />
    </div>

    <div style="margin: 60px 0;">
      <p><strong>Authorized Signature:</strong></p>
      <br/>
       <br/>
      <br/>
    <div style="text-align:center; margin-top: 20px;">
      <p><strong>-----Thank you for your payment.-----</strong></p>
    </div>
    </div>

  </div>
</body>
</html>
  `;
	};

	const handlePrint = () => {
		const html = generateReceipt();
		const w = window.open("", "_blank");
		if (!w) return;

		w.document.open();
		w.document.write(html);
		w.document.close();

		// Wait for popup content + images to load
		w.addEventListener("load", () => {
			w.focus();
			w.print();
		});
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
						defaultValue="Day-Fees-400"
						label="Package Name"
						name="packageName"
						select
						fullWidth
						value={formData.packageName}
						onChange={handleChange}
					>
						<MenuItem value="">Select a package</MenuItem>
						<MenuItem value="Day-Fees-400">Day-Fees - 400</MenuItem>
						<MenuItem value="Day-Fees-500">Day-Fees - 500</MenuItem>
						<MenuItem value="Monthly-2000">Monthly - 2000</MenuItem>
						<MenuItem value="Monthly-2500">Monthly - 2500</MenuItem>
						<MenuItem value="Monthly-3000">Monthly - 3000</MenuItem>
						<MenuItem value="Monthly-3500">Monthly - 3500</MenuItem>
						<MenuItem value="Monthly-5000">Monthly - 5000</MenuItem>
						<MenuItem value="Monthly-6000">Monthly - 6000</MenuItem>
						<MenuItem value="Monthly-7500">Monthly - 7500</MenuItem>
					</TextField>
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
					<Button onClick={handlePrint} variant="contained">
						Save & Print
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}
