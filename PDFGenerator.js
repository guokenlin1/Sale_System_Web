/**
 * Initialization for pdfkit library
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');

//==========example of Json Object=========
const items = {
    items: [
      {
        image: "product1.png",
        item: "Toyota Car 1996",
        description: "toyota car abcdefghijklmnopqrstuvwxyz ",
        url: "none",
        quantity: 1,
        amount: 59.00
      },
      {
        image: "/Users/chenkairen/Downloads/product2.png",
        item: "desktop",
        description: "table... abcdefghijklmnopqrstuvwxyz",
        url: "none",
        quantity: 1,
        amount: 69.00
      }
    ],
    name: "kai",
    phone: "3478284533",
    email: "renc2@vt.edu"
  };

/**
 * Create PDF document with appropriate functions and file name
 */
function createPdf(itemsJson, path) {
    let doc = new PDFDocument({ margin: 50 });
  
    generateHeader(doc);
    generateTable(doc, itemsJson);
  
    doc.end();
    doc.pipe(fs.createWriteStream(path));
  }

/**
 * Generate a header for the pdf
 */
function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 140 })
        .fillColor("#444444")
        .fontSize(10)
        .text("Name: " + items.name, 450, 65, {align: "left"})
        .text("Phone: " + items.phone, 450, 80, { align: "left" })
        .text("Email: " + items.email, 450, 95, { align: "left" })
        .moveDown();
}
  
/**
 * Generate each items as a row to the table into the pdf file
 */
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
        .fontSize(10)
        .image(c1, 50, y, { width: 70 })
        .text(c2, 150, y)
        .text(c3, 280, y, { width: 90, align: "right" })
        .text(c4, 370, y, { width: 90, align: "right" })
        .text(c5, 0, y, { align: "right" });
}

/**
 * Generate a table where for each loop the items in the json object.
 * Create column name for items ex.("image", "item", "description", "quantity", "price")
 */
function generateTable(doc, items) {
    let i,
    itemsTableTop = 180;

    doc.font("Helvetica-Bold");
    doc
        .fontSize(10)
        .text("Image", 50, itemsTableTop)
        .text("Item", 150, itemsTableTop)
        .text("Description", 280, itemsTableTop, { width: 90, align: "right" })
        .text("Quantity", 370, itemsTableTop, { width: 90, align: "right" })
        .text("Price", 0, itemsTableTop, { align: "right" });

    generateHr(doc, itemsTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < items.items.length; i++) {
        const item = items.items[i];
        const position = itemsTableTop + (i + 1) * 70;
        generateTableRow(
        doc,
        position,
        item.image,
        item.item,
        item.description,
        item.quantity,
        item.amount.toFixed(2)
        );
    }
}

/**
 * generate space 
 */
function generateHr(doc, y) {
doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

createPdf(items, "SampleDocument.pdf");