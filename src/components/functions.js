import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// let leftMargin = (100 * 50) / a4Paper.width;
// let fullLength = 100 - leftMargin * 2; // 83.2
// let firstHalf = fullLength / 2; // 41.6
// let firstQtr = firstHalf / 2 + leftMargin; // 20.8
// let secondQtr = firstHalf / 2 + leftMargin; // 20.8
// let thirdQtr = (fullLength * 3) / 4 + leftMargin; // 20.8
// let fourthQtr = (fullLength * 3) / 4 + leftMargin; // 20.8

// Invoice - 17.72px
// 8.86px
// 4.64px
// 4.21px
// 4.85px
// 5.91px
// 3.8px

// h1 - 18 17 16
// h2 - 9 8.5 8
// h3 - 5 4.75 4.5
// h4 - 4 3.9 3.8

let fraction = 9 / 5;

let h1 = fraction * 18;
let h2 = fraction * 9;
let h3 = fraction * 7;
let h4 = fraction * 5;
let h5 = fraction * 4;
let bMarginXS = [0, 0, 0, 2];
let bMarginSM = [0, 0, 0, 4];
let bMarginMD = [0, 0, 0, 6];
let bMarginLG = [0, 0, 0, 8];
let bMarginXL = [0, 0, 0, 10];
let tMarginXS = [0, 2, 0, 0];
let tMarginSM = [0, 4, 0, 0];
let tMarginMD = [0, 6, 0, 0];
let tMarginLG = [0, 8, 0, 0];
let tMarginXL = [0, 10, 0, 0];
let hMargin50 = [50, 0, 50, 0];
let rMargin50 = [0, 0, 50, 0];

function styles() {
  return {
    hMargin50: { margin: hMargin50 },
    rMargin50: { margin: rMargin50 },
    margin5: { margin: [5, 5, 5, 5] },
    marginV5: { margin: [0, 5, 0, 5] },
    marginV10: { margin: [0, 10, 0, 10] },
    h1: { fontSize: h1 },
    h2: { fontSize: h2 },
    h3: { fontSize: h3 },
    h4: { fontSize: h4 },
    h5: { fontSize: h5 },
    bMarginXS: { margin: bMarginXS },
    bMarginSM: { margin: bMarginSM },
    bMarginMD: { margin: bMarginMD },
    bMarginLG: { margin: bMarginLG },
    bMarginXL: { margin: bMarginXL },
    tMarginXS: { margin: tMarginXS },
    tMarginSM: { margin: tMarginSM },
    tMarginMD: { margin: tMarginMD },
    tMarginLG: { margin: tMarginLG },
    tMarginXL: { margin: tMarginXL },
    right: { alignment: "right" },
    left: { alignment: "left" },
    center: { alignment: "center" },
    bold: { bold: true },
    italics: { italics: true }
  };
}

const spacer = height => {
  return {
    svg: '<svg width="10" height="' + height + '"><rect style="fill:transparent" /></svg>'
  };
};

const coloredRect = (height, color) => {
  return {
    layout: "noBorders",
    headerRows: 0,
    table: {
      widths: ["*"],
      heights: [height],
      body: [[{ text: "", fillColor: color }]]
    }
  };
};

const labelText = (text = "TEXT", color = "black", style = ["h4", "left"]) => {
  return {
    text: text,
    color: color,
    style: style
  };
};

const textWithRule = () => {
  return {
    table: {
      widths: ["auto"],
      // widths: [ '*', 'auto', 100, '*' ],
      body: [[labelText("labelInvoice", "red", ["h1", "right"])], [""]]
    },
    layout: {
      hLineWidth: function(i, node) {
        return i === 0 || i === node.table.body.length ? 0 : 1;
      },
      vLineWidth: number0
    }
  };
};

const setTopMarginOfCellForVerticalCentering = (ri, node) => {
  const cellHeights = node.table.body[ri].map(cell => {
    if (cell._inlines && cell._inlines.length) {
      return cell._inlines[0].height;
    } else if (cell.stack) {
      return cell.stack[0]._inlines[0].height * cell.stack.length;
    }
    return null;
  });

  const maxRowHeight = Math.max(...cellHeights);
  node.table.body[ri].forEach((cell, ci) => {
    if (cellHeights[ci] && maxRowHeight > cellHeights[ci]) {
      let topMargin = (maxRowHeight - cellHeights[ci]) / 2;
      if (cell._margin) {
        cell._margin[1] = topMargin;
      } else {
        cell._margin = [0, topMargin, 0, 0];
      }
    }
  });

  return 2;
};

const lightenDarkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00ff) + amt;
  let g = (num & 0x0000ff) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

// hLineWidth
const hOuterBorder = (i, node) => {
  return i === 0 || i === node.table.body.length ? 1 : 0;
};

const vOuterBorder = (i, node) => {
  return i === 0 || i === node.table.widths.length ? 1 : 0;
};

const bottomBorderThickThin = (i, node) => {
  return i === 0 ? 0 : i === 1 ? 2 : 0.5;
};

const bottomBorderThin = (i, node) => {
  return i === 0 ? 0 : 0.5;
};

const number0 = (i, node) => {
  return 0;
};

const dashLine = (i, node) => {
  return { dash: { length: 4, space: 4 } };
};

const dottedLine = (i, node) => {
  return { dash: { length: 1, space: 4 } };
};

const paddingLeftEdge = (i, node) => {
  return i === 0 ? 0 : 10;
};

const paddingLeft = (i, node) => {
  return i === 0 ? 5 : 10;
};

const paddingRightEdge = (i, node) => {
  return i === node.table.widths.length - 1 ? 0 : 10;
};

const paddingRight = (i, node) => {
  return i === node.table.widths.length - 1 ? 5 : 10;
};

let layout1 = val => {
  pdfMake.tableLayouts = {
    verticalDividerLayout: {
      hLineWidth: number0,
      vLineWidth: function(i, node) {
        return i > 1 && i < node.table.widths.length - 1 ? 1 : 0;
      }
    },
    dashOutline: {
      hLineWidth: hOuterBorder,
      vLineWidth: vOuterBorder,
      vLineColor: val.colorPrimary,
      hLineColor: val.colorPrimary,
      hLineStyle: dottedLine,
      vLineStyle: dottedLine
    },
    itemLayout1: {
      hLineWidth: bottomBorderThickThin,
      vLineWidth: number0,
      hLineColor: val.colorPrimary,
      paddingLeft: paddingLeftEdge,
      paddingRight: paddingRightEdge,
      paddingTop: setTopMarginOfCellForVerticalCentering
    },
    itemLayout1a: {
      hLineWidth: bottomBorderThin,
      vLineWidth: number0,
      hLineColor: val.colorPrimary,
      paddingTop: function(i, node) {
        return 8;
      },
      paddingRight: paddingRightEdge
    },
    itemLayout2: {
      fillColor: function(i, node, columnIndex) {
        return (i % 2 === 0) & (i !== node.table.headerRows - 1) ? val.colorLightGray : null;
      },
      hLineWidth: function(i, node) {
        return i === 0 ? 0 : i === 1 ? 2 : 0.5;
      },
      vLineWidth: number0,
      hLineColor: val.colorPrimary,
      hLineStyle: function(i, node) {
        if (i === 1) {
          return null;
        }
        return { dash: { length: 1, space: 4 } };
      },
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      paddingTop: setTopMarginOfCellForVerticalCentering
    },
    itemLayout2a: {
      hLineWidth: bottomBorderThin,
      vLineWidth: number0,
      hLineColor: val.colorPrimary,
      hLineStyle: function(i, node) {
        return { dash: { length: 1, space: 4 } };
      },
      paddingTop: function(i, node) {
        return 8;
      },
      paddingLeft: function(i, node) {
        return i === 0 ? 5 : 10;
      },
      paddingRight: function(i, node) {
        return i === node.table.widths.length - 1 ? 5 : 10;
      }
    }
  };

  return {
    pageSize: {
      width: val.paperSize.width,
      height: val.paperSize.height
    },
    pageMargins: [0, 0, 0, 40],
    footer: {
      // columns: [
      // {
      // layout: "noBorders",
      table: {
        widths: ["*", "auto", "auto", "auto", "auto", "*"],
        body: [
          [
            {},
            { text: val.labelWebsite + ":  " + val.website },
            { text: val.labelFacebook + ":  " + val.facebook },
            { text: val.labelTwitter + ":  " + val.twitter },
            { text: val.labelInstagram + ":  " + val.instagram },
            {}
          ]
        ]
      },
      style: ["hMargin50", "h5", "center"],
      layout: "verticalDividerLayout"
      // }
      // ]
    },
    content: [
      {
        svg: '<svg width="' + val.paperSize.width + '" height="10"><rect width="100%" height="10" style="fill:' + val.colorPrimary + '" /></svg>'
      },
      spacer(50),
      {
        table: {
          widths: ["*", 15, "*", 15, "*"],
          body: [
            [
              {
                image:
                  "data:image/png;base64,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",
                width: 150
              },
              {},
              {
                stack: [
                  labelText(val.labelInvoice, val.colorPrimary, ["h1", "left", "bold", "bMarginXL"]),
                  labelText(val.labelInvoiceNum, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                  labelText(val.invoiceNum, "", ["h2", "left", "bMarginXL"]),
                  labelText(val.labelInvoiceDate, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                  labelText(val.invoiceDate, "", ["h2", "left", "bMarginXL"]),
                  labelText(val.labelDueDate, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                  labelText(val.dueDate, "", ["h2", "left", "bMarginXL"])
                ]
              },
              {},
              {
                stack: [
                  labelText(val.labelBillingFrom, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                  labelText(val.sellerName, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerCompany, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerAddressLine1, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerAddressLine2, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerAddressLine3, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerAddressLine4, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.sellerAddressLine5, "", ["h4", "left", "bMarginXL"]),
                  labelText(val.labelBillingTo, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                  labelText(val.clientName, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientCompany, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientAddressLine1, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientAddressLine2, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientAddressLine3, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientAddressLine4, "", ["h4", "left", "bMarginXS"]),
                  labelText(val.clientAddressLine5, "", ["h4", "left"])
                ]
              }
            ]
          ]
        },
        style: "hMargin50",
        layout: {
          hLineWidth: number0,
          vLineWidth: function(i, node) {
            return i === 3 ? 1 : 0;
          },
          vLineColor: "black"
        }
      },
      spacer(30),
      // Items
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto", "auto", "auto"],
          body: [
            // Table Header
            [
              labelText("Product", val.colorPrimary, ["h3", "bold", "left"]),
              labelText("Qty", val.colorPrimary, ["h3", "bold", "center"]),
              labelText("Price", val.colorPrimary, ["h3", "bold", "right"]),
              labelText("Tax", val.colorPrimary, ["h3", "bold", "right"]),
              labelText("Discount", val.colorPrimary, ["h3", "bold", "right"]),
              labelText("Total", val.colorPrimary, ["h3", "bold", "right"])
            ],
            // Items
            // Item 1
            [
              [
                labelText("Item1", "", ["h3"]),
                labelText("Item Description", "", ["h3"]),
                labelText("Item Description", "", ["h3"]),
                labelText("Item Description", "", ["h3"])
              ],
              labelText(1, "", ["h3", "center"]),
              labelText("$999.99", "", ["h3", "right"]),
              labelText("0%", "", ["h3", "right"]),
              labelText("0%", "", ["h3", "right"]),
              labelText("$999.99", "", ["h3", "right"])
            ],
            // Item 2
            [
              [labelText("Item2", "", ["h3"]), labelText("Item Description", "", ["h3"])],
              labelText(1, "", ["h3", "center"]),
              labelText("$999.99", "", ["h3", "right"]),
              labelText("0%", "", ["h3", "right"]),
              labelText("0%", "", ["h3", "right"]),
              labelText("$999.99", "", ["h3", "right"])
            ]
            // END Items
          ]
        }, // table
        style: ["hMargin50"],
        layout: "itemLayout1"
        // layout: { paddingTop: setTopMarginOfCellForVerticalCentering }
      },
      // TOTAL
      {
        columns: [
          { width: "*", text: "" },
          {
            table: {
              headerRows: 0,
              widths: ["*", "*"],
              heights: 20,
              body: [
                // Total
                [labelText("Subtotal", val.colorPrimary, ["h3", "bold"]), labelText("$2000.00", "", ["h3", "right"])],
                [labelText("Tax 21%", val.colorPrimary, ["h3", "bold"]), labelText("$523.13", "", ["h3", "right"])],
                [labelText("TOTAL", val.colorPrimary, ["h3", "bold"]), labelText("$999.99", "", ["h3", "right"])]
              ]
            }, // table
            style: "hMargin50",
            layout: "itemLayout1a"
          }
        ]
      },
      spacer(20),
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: ["*", "*", "*", "*"],
          heights: [3, 20, 3],
          body: [
            // Total
            [{}, {}, {}, {}],
            [
              labelText(val.labelDueDate, val.colorPrimary, ["h4", "right", "tMarginMD"]),
              labelText(val.dueDate, val.colorPrimary, ["h2", "bold"]),
              labelText(val.labelAmountDue, val.colorPrimary, ["h4", "right", "tMarginMD"]),
              labelText(val.amountDue, val.colorPrimary, ["h2", "bold"])
            ],
            [{}, {}, {}, {}]
          ]
        }, // table
        style: ["hMargin50"],
        layout: "dashOutline"
      },
      spacer(20),
      {
        layout: "noBorders",
        table: {
          widths: ["*"],
          //   headerRows: 0,
          heights: [150, 350],
          body: [
            [
              {
                table: {
                  widths: ["65%", "35%"],
                  body: [
                    [
                      {
                        stack: [
                          labelText(val.labelPaymentMethod, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                          labelText(val.paymentMethod, "", ["h2", "left", "bMarginXL"]),
                          spacer(40),
                          { text: val.notes }
                        ]
                      },
                      {
                        stack: [
                          labelText(val.labelTerms, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                          labelText(val.terms, "", ["h2", "left", "bMarginXL"]),
                          labelText(val.labelPurchaseOrder, val.colorPrimary, ["h3", "left", "bMarginSM"]),
                          labelText(val.purchaseOrder, "", ["h2", "left", "bMarginXL"])
                        ]
                      }
                    ]
                  ]
                },
                style: "hMargin50",
                layout: "noBorders"
              }
            ]
          ]
        }
      }
    ],
    styles: styles()
  };
};

let layout2 = val => {
  return {
    pageSize: {
      width: val.paperSize.width,
      height: val.paperSize.height
    },
    pageMargins: [0, 0, 0, 40],
    content: [
      {
        columns: [
          {
            text: "labelBillingFrom",
            style: ["bold", "left"]
          },
          {
            svg: '<svg width="100" height="40"><rect width="100%" height="100%" style="fill:green" /></svg>'
          },
          coloredRect(40, val.colorPrimary),
          {
            text: "labelBillingTo",
            style: ["bold", "left"]
          }
        ]
      }
    ],
    styles: styles()
  };
};

export default { lightenDarkenColor, layout1, layout2 };
