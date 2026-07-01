# Template Types

DocGenius supports multiple template types to cater to different document generation requirements.

---

## 1. Simple Template (Word / PDF)

Simple templates allow you to build templates using Microsoft Word format or PDF layout directly. They provide the ability to merge Salesforce fields, tables, and sections into your final output.

### Page Configuration Options

- **Header:** Define a header section that appears at the top of every generated page. You can insert key mappings here.
- **Footer:** Configure a footer section at the bottom of each page, useful for page numbers, confidentiality notes, or dynamic values.
- **Basic Detail:** Contains general template metadata such as the template name, folder placement, primary object mapping, and output file format.

> Simple templates support conditional sections and nesting to dynamically hide or display blocks based on Salesforce field values.

---

## 2. CSV Template

CSV templates are designed specifically for exporting large datasets from Salesforce into spreadsheet-compatible CSV files. Unlike Word or PDF templates, they focus entirely on data columns, filtering, sorting, and row limits.

### Creating a New CSV Template

1. Click the **"Create Template"** button on the home page and select **CSV** as the template type.
2. Enter the basic details (Name, folder, target Salesforce object) and click **Save**.

### Edit Template Tab Options

| Section | Description |
|---|---|
| **Column Selection** | Choose which Salesforce fields appear as columns in your CSV. Define custom column headers for each field. |
| **Apply Filters** | Define SOQL-like filter conditions to export only records that meet specific criteria. |
| **Order By** | Set the sorting logic for exported records (e.g., sort by CreatedDate descending). |
| **Limit** | Restrict the maximum number of records exported in a single CSV file. |

### Template Defaults Tab

Use this tab to set default file names, export behaviors, and custom Salesforce buttons associated with the CSV generation.

---

## 3. Google Doc Template

Google Doc templates let you utilize your existing Google Docs as document layouts. DocGenius integrates with Google Drive to read the document, process key mappings, and output PDF or DOCX formats.

### Editing the Template

- Connect your Google Workspace / Drive account to Salesforce.
- Directly embed key mappings into the Google Doc (e.g., using rich formatting).
- Edit your layout directly inside Google Docs, and DocGenius will automatically fetch the latest version when generating.

### Previewing the Template

Use the **"Save & Preview"** option in DocGenius to test the Google Doc mapping with live Salesforce record data before deploying it.

---

## Choosing the Right Template Type

| Requirement | Recommended Template |
|---|---|
| Generate formatted Word/PDF documents | Simple Template |
| Export tabular data to spreadsheets | CSV Template |
| Use existing Google Docs as layouts | Google Doc Template |
| Complex formatting with conditional sections | Simple Template |
