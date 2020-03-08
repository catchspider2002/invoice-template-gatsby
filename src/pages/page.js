import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import PDFJS from "pdfjs-dist";
import lib from "../components/functions";

import PDFJS from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

function ContactPage() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  let a4Paper = { width: 595.28, height: 841.89 };
  // let letterPaper = { width: 612, height: 792 };
  let paperSize = a4Paper;

  // Colors
  let colorPrimary = "#2a7fff";
  // let colorSecondary = "#676778";
  let colorLightGray = "#e2e8f0";
  let colorDarkGray = "#4a5568";
  // let colorError = "#b71c1c";
  // let colorBackground = "#ffffff";

  let colorLightPrimary = lib.lightenDarkenColor(colorPrimary, 60);
  let colorDarkPrimary = lib.lightenDarkenColor(colorPrimary, -60);
  let dateFormat = "MMMM Do YYYY"; // February 19th 2020
  // let footerLeft = "NEW FOOTER LEFT\nNEW FOOTER LEFT";
  // let footerCenter = "NEW FOOTER CENTER";
  // let footerRight = "NEW FOOTER RIGHT";

  let labelInvoice = "INVOICE";
  let labelInvoiceNum = "Invoice #";
  let labelInvoiceDate = "Invoice Date";
  let labelDueDate = "Due Date";
  let invoiceNum = "000021";
  let invoiceDate = moment("20200131").format(dateFormat);
  let dueDate = moment("20200205").format(dateFormat);

  let labelBillingFrom = "Billing From";
  let sellerName = "Your Name";
  let sellerCompany = "Your Company";
  let labelSellerAddress = "Address";
  let sellerAddressLine1 = "9999 Street Name";
  let sellerAddressLine2 = "Some Area";
  let sellerAddressLine3 = "Some Place";
  let sellerAddressLine4 = "New York City";
  let sellerAddressLine5 = "NY 00010 USA";

  let labelBillingTo = "Bill To";
  let clientName = "Client Name";
  let clientCompany = "Client Company";
  let labelClientAddress = "Address";
  let clientAddressLine1 = "1111 Street Name";
  let clientAddressLine2 = "Some Area";
  let clientAddressLine3 = "Some Place";
  let clientAddressLine4 = "New York City";
  let clientAddressLine5 = "NY 00011 USA";

  let labelShipTo = "Bill To";
  let clientShipName = "Client Name";
  let clientShipCompany = "Client Company";
  let labelClientShipAddress = "Address";
  let clientShipAddressLine1 = "1111 Street Name";
  let clientShipAddressLine2 = "Some Area";
  let clientShipAddressLine3 = "Some Place";
  let clientShipAddressLine4 = "New York City";
  let clientShipAddressLine5 = "NY 00011 USA";

  let labelAmountDue = "Amount Due";
  let amountDue = "$2000";
  let labelTerms = "Payment Terms";
  let terms = "5 Days";
  let labelPurchaseOrder = "Purchase Order";
  let purchaseOrder = "454523";
  let labelPaymentMethod = "Payment Method";
  let paymentMethod = "Paypal, Visa, MasterCard";

  let labelPhone = "Phone";
  let phone = "+91 9292929292";
  let labelEmail = "E-mail";
  let email = "email@website.com";
  let labelWebsite = "Website";
  let website = "www.website.com";
  let labelFacebook = "Facebook";
  let facebook = "fb-page";
  let labelTwitter = "Twitter";
  let twitter = "twitter-page";
  let labelInstagram = "Instagram";
  let instagram = "insta-page";

  let notes = "Thank you for your business";

  let variables = {
    paperSize: paperSize,
    colorPrimary: colorPrimary,
    colorLightPrimary: colorLightPrimary,
    colorDarkPrimary: colorDarkPrimary,
    colorLightGray: colorLightGray,
    colorDarkGray: colorDarkGray,
    labelInvoice: labelInvoice,
    labelInvoiceNum: labelInvoiceNum,
    labelInvoiceDate: labelInvoiceDate,
    labelDueDate: labelDueDate,
    invoiceNum: invoiceNum,
    invoiceDate: invoiceDate,
    dueDate: dueDate,
    labelBillingFrom: labelBillingFrom,
    sellerName: sellerName,
    sellerCompany: sellerCompany,
    labelSellerAddress: labelSellerAddress,
    sellerAddressLine1: sellerAddressLine1,
    sellerAddressLine2: sellerAddressLine2,
    sellerAddressLine3: sellerAddressLine3,
    sellerAddressLine4: sellerAddressLine4,
    sellerAddressLine5: sellerAddressLine5,
    labelBillingTo: labelBillingTo,
    clientName: clientName,
    clientCompany: clientCompany,
    labelClientAddress: labelClientAddress,
    clientAddressLine1: clientAddressLine1,
    clientAddressLine2: clientAddressLine2,
    clientAddressLine3: clientAddressLine3,
    clientAddressLine4: clientAddressLine4,
    clientAddressLine5: clientAddressLine5,
    labelShipTo: labelShipTo,
    clientShipName: clientShipName,
    clientShipCompany: clientShipCompany,
    labelClientShipAddress: labelClientShipAddress,
    clientShipAddressLine1: clientShipAddressLine1,
    clientShipAddressLine2: clientShipAddressLine2,
    clientShipAddressLine3: clientShipAddressLine3,
    clientShipAddressLine4: clientShipAddressLine4,
    clientShipAddressLine5: clientShipAddressLine5,
    labelAmountDue: labelAmountDue,
    amountDue: amountDue,
    labelTerms: labelTerms,
    terms: terms,
    labelPurchaseOrder: labelPurchaseOrder,
    purchaseOrder: purchaseOrder,
    labelPaymentMethod: labelPaymentMethod,
    paymentMethod: paymentMethod,
    notes: notes,
    labelPhone: labelPhone,
    phone: phone,
    labelEmail: labelEmail,
    email: email,
    labelWebsite: labelWebsite,
    website: website,
    labelFacebook: labelFacebook,
    facebook: facebook,
    labelTwitter: labelTwitter,
    twitter: twitter,
    labelInstagram: labelInstagram,
    instagram: instagram
  };
  let docDef = lib.layout1(variables);
  //  docDef = docDefinition2;

  function id(text) {
    return typeof document !== `undefined` ? document.getElementById(text) : null;
  }

  if (id("downloadButton")) id("downloadButton").addEventListener("click", download, false);
  if (id("layout1")) id("layout1").addEventListener("click", renderlayout1, false);
  if (id("layout2")) id("layout2").addEventListener("click", renderlayout2, false);

  function renderlayout1() {
    console.log("renderlayout1");
    render(lib.layout1(variables));
  }

  function renderlayout2() {
    console.log("renderlayout2");
    render(lib.layout2(variables));
  }

  function render(def) {
    console.log("render");
    pdfMake.createPdf(def).getDataUrl(function(dataURL) {
      renderPDF(dataURL);
    });
  }
  function download() {
    console.log("download");
    var pdf = pdfMake.createPdf(docDef);
    pdf.download("PPRA.pdf");
  }

  render(docDef);

  function renderPDF(url, options) {
    options = options || { scale: 0.95 };

    function renderPage(page) {
      console.log("During renderPages");
      var viewport = page.getViewport(options.scale);
      var wrapper = document.createElement("div");
      wrapper.className = "canvas-wrapper";
      console.log("canvas");
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      wrapper.appendChild(canvas);
      if (id("canvas")) id("canvas").appendChild(wrapper);

      page.render(renderContext);
    }

    function renderPages(pdfDoc) {
      if (typeof document !== `undefined`) {
        for (var num = 1; num <= pdfDoc.numPages; num++) pdfDoc.getPage(num).then(renderPage);
      }
    }
    if (PDFJS.getDocument) {
      console.log("Before renderPages");
      PDFJS.disableWorker = true;
      PDFJS.getDocument(url).then(renderPages);
      console.log("After renderPages");
    }
  }

  return (
    <Layout>
      <SEO keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]} title="Contact" />
      <section>
        <div className="container p-0 m-0 list-none flex bg-blue-500 justify-around flex-row flex-wrap">
          <div className="left item p-5 h-full mt-5 font-bold text-center">
            <button id="downloadButton">Download</button>
            <button id="layout1">Layout 1</button>
            <button id="layout2">Layout 2</button>
          </div>

          <div className="right item p-5 h-64 mt-5 font-bold text-center">
            <div id="canvas" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
