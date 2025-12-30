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
<html>
<head>
  <style>
    @page {
      size: 80mm 297mm;   /* RECEIPT SIZE */
      margin: 5mm;        /* adjust if needed */
    }

    @media print {
      body { margin: 0; }
    }

    .receipt {
      font-family: Arial, sans-serif;
      width: 80mm;        /* match page width */
      margin: 0 auto;
      padding: 6mm;
      box-sizing: border-box;
      border: 1px solid #ccc;
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

    <h3>Receipt / Payment Confirmation</h3>

    <div style="text-align:center; margin:10px 0;">
      <img src="/assets/ad-logo.jpg" style="max-width: 60mm;" />
    </div>

    <div style="text-align:center; font-size: 14px; line-height: 1.4; margin-bottom: 10px;">
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

    <div style="text-align:center; margin:15px 0;">
      <img src="/assets/ad-qr.png" style="max-width: 45mm;" />
    </div>

    <div style="margin-top: 25px;">
      <p><strong>Authorized Signature:</strong></p>
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
  // w.document.close();

  w.print();
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
					<Button onClick={handlePrint} variant="contained">
						Save & Print
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}
