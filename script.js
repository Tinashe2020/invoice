let itemList = [];
let totalAmount = 0;


  function displayItems() {
    const itemsListContainer = document.getElementById('itemsList');
    itemsListContainer.innerHTML = '';
  
    itemList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'item';
      listItem.innerHTML = `
        <span>${item.itemName} - Ksh.${item.unitPrice.toFixed(2)} x ${item.quantity} = Ksh.${(item.unitPrice * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      `;
      itemsListContainer.appendChild(listItem);
    });
  }
  
  function addItem() {
    const itemNameInput = document.getElementById('itemName');
    const unitPriceInput = document.getElementById('unitPrice');
    const quantityInput = document.getElementById('quantity');
  
    const itemName = itemNameInput.value.trim();
    const unitPrice = parseFloat(unitPriceInput.value);
    const quantity = parseInt(quantityInput.value);
  

    if (itemName === '' || isNaN(unitPrice) || unitPrice <= 0 || isNaN(quantity) || quantity <= 0) {
        alert('Please enter valid item name, unit price, and quantity.');
        return;
      }
  
    const item = {
      itemName: itemName,
      unitPrice: unitPrice,
      quantity: quantity
    };
  
    itemList.push(item);
    totalAmount += item.unitPrice * item.quantity;
  
    displayItems();
    updateTotalAmount();
  
    // Clear the input fields after adding an item
    itemNameInput.value = '';
    unitPriceInput.value = '';
    quantityInput.value = '';
  }


function removeItem(index) {
  const removedItem = itemList.splice(index, 1)[0];
  totalAmount -= removedItem.unitPrice * removedItem.quantity;
  displayItems();
  updateTotalAmount();
}

function updateTotalAmount() {
  document.getElementById('totalAmount').textContent = `Ksh. ${totalAmount.toFixed(2)}`;
}

document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const clientName = document.getElementById('clientName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
  
   
    function submitInvoice() {
      if (document.getElementById("itemsList").textContent.length > 0) {
        // The `itemsList` div has content, so click the button.
        document.getElementById("submitInvoice").click();
      } else {
        // The `itemsList` div is empty, so do nothing.
      }
    }
    

    if (clientName.trim() === '' || phoneNumber.trim() === '' || itemList.length === 0) {
        alert('Please enter client name, phone number, and add at least one item.');
        return;
    
      }


  // Generate invoice number (in this example, a random number between 1000 and 9999)
  const invoiceNumber = Math.floor(Math.random() * 9000) + 1000;

  const invoiceDate = new Date().toLocaleDateString();

  // Generate invoice HTML
  const invoiceHTML = `
    <h2>Entirety Invoice Summary</h2>
    <p>Invoice Number: ${invoiceNumber}</p>
    <p>Date: ${invoiceDate}</p>
    <p>Client Name: ${clientName}</p>
    <p>Phone Number: ${phoneNumber}</p>
    <h3>Items:</h3>
    <ul>
    ${itemList.map(item => `<li>${item.itemName} - Ksh.${item.unitPrice.toFixed(2)} x ${item.quantity} = Ksh.${(item.unitPrice * item.quantity).toFixed(2)}</li>`).join('')}
    </ul>
    <p>Total Amount: Ksh.${totalAmount.toFixed(2)}</p>
  `;

  
  // Display the invoice preview
  document.getElementById('invoicePreview').innerHTML = invoiceHTML;


  // Add a print invoice button
  const printInvoiceButton = document.createElement('button');
  printInvoiceButton.textContent = 'Print Invoice';
  printInvoiceButton.onclick = function() {
    printInvoice();
  };
  document.getElementById('invoicePreview').appendChild(printInvoiceButton);
});

function printInvoice() {
  const invoicePreview = document.getElementById('invoicePreview');
  const invoiceClone = invoicePreview.cloneNode(true);

  // Remove the navigation bar from the cloned element
  const navbar = invoiceClone.querySelector('.navbar');
  if (navbar) {
    navbar.remove();
  }

  const invoiceHTML = invoiceClone.innerHTML;


  
  // Print the modified invoice HTML
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice Preview</title>
      </head>
      <body>
        ${invoiceHTML}
      </body>
    </html>
  `);

  
  printWindow.document.close();


  
  printWindow.print();

  // Clear the invoice preview section
  invoicePreview.innerHTML = '';

    itemList = [];
  totalAmount = 0;
  displayItems();
  updateTotalAmount();
}

const downloadInvoiceButton = document.getElementById('downloadInvoice');
downloadInvoiceButton.onclick = function() {
  // Download the invoice as a PDF file.
  var url = '/invoice.pdf';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    // Save the PDF file to the user's computer.
    var filename = 'invoice.pdf';
    var blob = xhr.response;
    var download = document.createElement('a');
    download.href = window.URL.createObjectURL(blob);
    download.download = filename;
    download.click();
  };
  xhr.send();
};


  // Function to download the invoice preview as a PDF
  function downloadInvoice() {
    // Get the invoice preview element
    const invoicePreview = document.getElementById('invoicePreview');

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Start Y position for the PDF content


      // Save the PDF to the user's computer
      doc.save('invoice.pdf');
    }

  // Add click event listener to the "Download Invoice" button
  document.getElementById('downloadInvoice').addEventListener('click', downloadInvoice);



