  const sideMenuCategories = document.querySelectorAll('.category');
        const questionsLists = document.querySelectorAll('.questions-list');
        const categoryImage = document.getElementById('category-image');
        const imageCaption = document.getElementById('image-caption');


        // Function to switch category content and image
        function switchCategory(categoryName) {
            
            // 1. Update Active Class on Menu
            sideMenuCategories.forEach(cat => cat.classList.remove('active'));
            document.querySelector(`.category[data-category="${categoryName}"]`).classList.add('active');

            // 2. Show Relevant Questions
            questionsLists.forEach(list => {
                // Ensure all accordion items within lists are closed before switching
                list.querySelectorAll('.accordion-item.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = 0;
                    item.querySelector('.icon').textContent = '+';
                });
                
                list.classList.remove('active');
                if (list.id === categoryName) {
                    list.classList.add('active');
                }
            });

            // 3. Update Image and Caption
            const imageInfo = imageMap[categoryName];
            if (imageInfo) {
                categoryImage.src = imageInfo.src;
                categoryImage.alt = categoryName + ' illustration';
                imageCaption.textContent = imageInfo.caption;
            }
        }

        // Attach click listeners to side menu items
        sideMenuCategories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryName = category.dataset.category;
                switchCategory(categoryName);
            });
        });


        // Accordion Functionality 
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                const accordionItem = button.parentNode;
                const content = button.nextElementSibling;

                // Check if the current item is already active
                const isCurrentlyActive = accordionItem.classList.contains('active');

                // Close all other open accordions (Cleaner UX)
                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = 0;
                    item.querySelector('.icon').textContent = '+';
                });

                if (!isCurrentlyActive) {
                    // Toggle the clicked accordion to open
                    accordionItem.classList.add('active');
                    // Set height based on content
                    content.style.maxHeight = content.scrollHeight + 'px';
                    button.querySelector('.icon').textContent = '−';
                } else {
                    // Toggle the clicked accordion to close (needed if we didn't use the close all logic)
                    accordionItem.classList.remove('active');
                    content.style.maxHeight = 0;
                    button.querySelector('.icon').textContent = '+';
                }
            });
        });
document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('open-modal-button');
    const modal = document.getElementById('support-modal');
    const closeButton = modal.querySelector('.close-button');
    const modalForm = document.getElementById('modal-question-form');
    const modalTextarea = document.getElementById('modal-user-question');
    const successMessage = document.getElementById('modal-submission-message');
    const errorMessage = document.getElementById('modal-error-message');

    // --- Helper Functions ---
    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden'); 
        modalForm.classList.remove('hidden'); 
    }

    function clearMessages() {
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
    }

    function resetModal() {
        modalTextarea.value = '';
        clearMessages();
        modalForm.classList.remove('hidden');
    }
    
    // --- Event Handlers ---

    // 1. Open Modal (Triggers on 'Contact Support' button click)
    openModalButton.addEventListener('click', function() {
        modal.classList.remove('hidden');
        resetModal(); // Form ko clear aur reset karta hai
        modalTextarea.focus(); // Turant typing ke liye focus
    });

    // 2. Close Modal (Clicking the 'x' button or pressing ESC)
    closeButton.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // 3. Close Modal (Clicking outside the modal content)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // 4. Handle Form Submission (Click Submit or press Enter inside modal)
    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const questionContent = modalTextarea.value.trim();
        // Regex check: kya string mein sirf numbers hain?
        const isNumbersOnly = /^\d+$/.test(questionContent);

        clearMessages(); 

        if (isNumbersOnly) {
            // Agar sirf numbers hain, error dikhao
            displayError('Questions cannot be numbers only. Please write your question in words.');
            return; 
        } 
        
        if (!questionContent) {
            // Agar khaali hai (though 'required' helps)
            displayError('Please enter your question before submitting.');
            return;
        }
        
        // --- Successful Submission Logic ---
        
        // Hide the form
        modalForm.classList.add('hidden');

        // Show the success message: 'Your question/request has been submitted...'
        successMessage.classList.remove('hidden');

        // Yahan aapko actual server API call (using fetch) dalna hoga
        console.log("Modal Question Submitted:", questionContent);
    });
});