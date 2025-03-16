# Chennai Super Kings (CSK) Unlisted Shares Portal

![CSK Logo](https://cdn.prod.website-files.com/66dad9c594a45d74898a5fc6/66e9a5d287ad4d164a1788ae_70521baac89be4d4cb2f223bbf67c974%20(1).avif)

## 🏏 Project Overview

A full-stack application that replicates the Chennai Super Kings (CSK) unlisted shares page with real-time data management capabilities. This project includes dynamic price charts, Excel data integration, and Google Sheets form submission integration.

Live Demo: [https://csk-assignment.vercel.app/](https://csk-assignment.vercel.app/)

[View Live Submission Sheet](https://docs.google.com/spreadsheets/d/1L5zM4H27WghroYaGk1yAuNZ1PPDqKup00nzOGPk7x40/edit?gid=0#gid=0)

## ✨ Features

- Pixel-perfect clone of original [CSK Unlisted Shares page](https://www.unlistedsharesindia.com/chennai-super-kings-csk-unlisted-shares)
- Responsive design for all device types
- Interactive price charts with multiple time frames (Daily, Weekly, Monthly)
- Excel-based data management system
- Real-time form submission tracking with Google Sheets
- Complete backend API for data updates via Postman

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Charts**: Recharts
- **Backend**: Node.js, Next.js API Routes
- **Data Processing**: xlsx library
- **Form Integration**: Google Sheets API
- **Deployment**: Vercel

## 📊 Data Flow Architecture

```
                     ┌───────────┐
                     │           │
                     │  Excel    │
                     │  Template │
                     │           │
                     └─────┬─────┘
                           │
                           ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Postman   ├────►│  Backend    ├────►│  Frontend   │
│             │     │  API        │     │  Display    │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │             │
                                        │  Google     │
                                        │  Sheets     │
                                        │             │
                                        └─────────────┘
```

## 🚀 Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Platform account (for Sheets API)
- Postman

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/faisalinfinity/Csk-assignment.git
   cd csk-assignment
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=""
   GOOGLE_PRIVATE_KEY=your_private_key
   GOOGLE_CLIENT_EMAIL=your_client_email
   SPREADSHEET_ID=1L5zM4H27WghroYaGk1yAuNZ1PPDqKup00nzOGPk7x40
   MONGODB_DB=csk
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser


## 🔄 Data Management

### Excel Template

An Excel template is provided for data analysts to update the website content. The template includes:

- Price data (Daily, Weekly, Monthly)
- Company information
- Performance metrics
- Article content

[Download Excel Template](https://docs.google.com/spreadsheets/d/1FiS1AhwNE8fxBFqmaYcWTppao6Mk-FYc/edit?usp=sharing&ouid=103478198087354213159&rtpof=true&sd=true)

### Updating Data via Postman

1. Open Postman
2. Create a POST request to `https://csk-assignment.vercel.app/api`
3. In the "Body" tab, select "form-data"
4. Add a key named "file" of type "File" and upload the completed Excel template
5. Send the request



### Google Sheets Integration

All form submissions from the interest form are automatically added to a Google Sheet:

[View Live Submission Sheet](https://docs.google.com/spreadsheets/d/1L5zM4H27WghroYaGk1yAuNZ1PPDqKup00nzOGPk7x40/edit?gid=0#gid=0)

## 📱 Responsive Design

The application is fully responsive across:
- Mobile devices
- Tablets
- Desktop computers

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 🚢 Deployment

The application is deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in Vercel's dashboard
3. Deploy the application




## 🙏 Acknowledgements

- [Chennai Super Kings](https://www.chennaisuperkings.com/)
- [Unlisted Shares India](https://www.unlistedsharesindia.com/)
- [Next.js](https://nextjs.org/)
- [Recharts](https://recharts.org/)