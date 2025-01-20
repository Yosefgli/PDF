// פונקציה להוספת שורה לטבלה
function addRow(data) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    
    // הוספת תאים לפי המידע שהתקבל
    data.forEach(cellData => {
        const cell = document.createElement('td');
        cell.textContent = cellData;
        row.appendChild(cell);
    });
    
    tableBody.appendChild(row);
}

// פונקציה ליצירת PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    
    html2canvas(document.querySelector('table')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('table.pdf');
    });
}

// דוגמה לקבלת נתונים מה-API
async function receiveData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.forEach(row => addRow(row));
        generatePDF();
    } catch (error) {
        console.error('שגיאה בקבלת הנתונים:', error);
    }
}
