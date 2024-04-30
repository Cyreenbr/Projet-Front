var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
var selectedContact = null;

window.onload = function() {
    document.getElementById('contactDetails').style.display = 'none';
    document.getElementById('contactForm').style.display = 'none';
}

document.addEventListener('DOMContentLoaded',function(){
    displayContacts();
});

function deleteContact() {
    if (selectedContact !== null) {
        contacts.splice(selectedContact, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
        selectedContact = null;
        document.getElementById('contactDetails').style.display = 'none';
        hideForm();
    }
}

document.getElementById('deleteAllButton').addEventListener('click', function() {
    contacts = [];
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
    document.getElementById('contactDetails').style.display = 'none';
});

