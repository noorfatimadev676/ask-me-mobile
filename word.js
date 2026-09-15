function downloadWordFile() {
    // Option 1: If you have a pre-existing Word file
    const link = document.createElement('a');
    link.href = 'Samsung-Galaxy-A52-Specs.docx'; // Your .docx file path
    link.download = 'Samsung-Galaxy-A52-Full-Specifications.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}