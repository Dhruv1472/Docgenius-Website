# Home Page

The DocGenius **Home Page** is the first screen you see when you open the app in Salesforce. It is your central hub for creating, organizing, and managing all your document templates.

![DocGenius Home Page Overview](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/HomePage_1.png)

---

## Overview

The Home Page provides the following core capabilities:

- **Create and manage** all your DocGenius templates from one place.
- **Organize templates** into folders to keep your workspace structured.
- **Filter, sort, and search** to quickly find any template.
- **Perform actions** like edit, generate, clone, move, and delete on templates.

---

## Folder Management

Folders allow you to organize your templates into a structured hierarchy, making it easy to manage large numbers of templates.

### How to Create a Folder

1. Click the **"Create New Folder"** button on the Home Page.
2. Enter the **folder name** in the input field that appears.
3. Select a **parent folder**, or leave it empty to create a root-level folder.
4. Click **Save** to create the folder.

> **Tip:** You can create nested folder structures by selecting a parent folder. This is helpful for organizing templates by department, project, or document type.

![Create New Folder Dialog](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/HomePage_2.png)

### How to Rename a Folder

1. Hover over the folder you want to rename in the folder tree on the left side.
2. Click the **Edit (pencil)** icon that appears next to the folder name.
3. Update the folder name in the input field and click **Save**.

> **Note:** By double-clicking on any folder node, users can also edit the folder name and update its parent folder, allowing easy reorganization of the folder hierarchy.

![Rename Folder Sidebar](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/HomePage_4.png)

### How to Delete a Folder

1. Hover over the folder you want to delete and click the **Delete (trash)** icon.
2. A confirmation dialog will appear. Click **Confirm** to permanently delete the folder.

> **Warning:** Deleting a folder will **move all templates** inside it to the root level — they will not be deleted. However, sub-folders may also be removed, so review the folder contents before deleting.

![Delete Folder Confirmation](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/HomePage_3.png)

---

## Template Management

The main content area displays your templates as cards. Each card shows key information and provides action buttons.

### Template Card Information

Each template card shows:

| Field | Description |
|---|---|
| Template Name | The name of the template |
| Template Type | Word, Google Doc, or CSV |
| Folder | The folder the template belongs to |
| Created Date | When the template was created |
| Modified Date | Last modification timestamp |
| Created By | The user who created the template |

### Template Action Buttons

| Action | Description |
|---|---|
| **Edit** | Open the template editor to modify configuration and key mappings |
| **Generate** | Generate a document from this template using Salesforce record data |
| **Clone** | Create a duplicate of this template with all configurations |
| **Move** | Move this template to a different folder |
| **Delete** | Permanently delete this template (cannot be undone) |

---

## Filter, Sort & Search

The Home Page toolbar provides powerful options to find templates quickly:

### 🔍 Search
Type in the search box to instantly filter templates by name. The search is real-time and case-insensitive.

### 🔽 Filter
Filter templates by **Template Type** (Word, Google Doc, CSV), **Folder**, or **Created By** to narrow down results.

### ↕️ Sort
Sort templates by **Name**, **Created Date**, or **Modified Date** in ascending or descending order.

---

## Key Terms

| Term | Definition |
|---|---|
| **Template** | A reusable document structure with placeholders that get replaced with Salesforce data |
| **Key / Placeholder** | A marker like `{{AccountName}}` that DocGenius replaces with actual field values |
| **Key Mapping** | Configuration that maps a placeholder to a specific Salesforce field |
| **Folder** | A container to organize templates into a hierarchical structure |
| **Generate Document** | The action of combining a template with Salesforce record data to produce a final document |
