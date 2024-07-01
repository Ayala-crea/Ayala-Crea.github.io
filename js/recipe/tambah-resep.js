document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('LOGIN');

    // Ensure all required elements exist before using them
    const itemForm = document.getElementById('itemForm');
    const btnSave = document.querySelector('.btn-save');

    if (!itemForm || !btnSave) {
        console.error('Required elements are missing from the DOM.');
        return;
    }

    const submitItemForm = (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = parseFloat(document.getElementById('price').value.trim());
        const quantity = parseInt(document.getElementById('quantity').value.trim());
        const category = parseInt(document.getElementById('category').value.trim());

        if (!name || !description || isNaN(price) || isNaN(quantity) || isNaN(category)) {
            Swal.fire('Failed', 'Please fill in all fields.', 'warning');
            return; // Exit the function if any field is empty
        }

        // Confirm before submit
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to submit the item data.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save item!'
        }).then((result) => {
            if (result.isConfirmed) {
                submitItemData(name, description, price, quantity, category);
            }
        });
    };

    const submitItemData = (name, description, price, quantity, category) => {
        const itemData = {
            name,
            description,
            price,
            quantity,
            category
        };

        console.log('Sending item data:', itemData); // Log the payload

        fetch('https://server-pemograman.vercel.app/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(itemData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err });
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: 'Success',
                text: 'Item successfully saved!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    window.location.href = 'dashboard-user.html'; // Redirect to dashboard-user.html
                }
            });
            itemForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'An error occurred while saving the item: ' + (error.message || JSON.stringify(error)), 'error');
        });
    };

    // Event listener for form submit
    itemForm.addEventListener('submit', submitItemForm);

    // Event listener for "Save Item" button
    btnSave.addEventListener('click', function() {
        itemForm.dispatchEvent(new Event('submit')); // Trigger form submit
    });
});
