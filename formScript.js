function showForm(index = null) {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('contactDetails').style.display = 'none';
    selectedContact = index;  
}

function hideForm() {
    document.getElementById('contactForm').style.display = 'none';
    resetButton();
}

function addContact() {
    var civilite = document.getElementById('civilite').value;
    var name = document.getElementById('name').value;
    var prenom = document.getElementById('prenom').value;
    var telephone = document.getElementById('telephone').value;

    if (selectedContact !== null) {
        // Mettre à jour le contact existant
        contacts[selectedContact] = {civilite: civilite, prenom: prenom, name: name, telephone: telephone};
    } else {
        // Ajouter un nouveau contact
        contacts.push({civilite: civilite, prenom: prenom, name: name, telephone: telephone});
        selectedContact = contacts.length - 1;  // Sélectionner le nouveau contact
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    document.getElementById('civilite').value = '';
    document.getElementById('name').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('contactForm').style.display = 'none';
    displayContacts();

    // Déclencher un clic sur l'élément de contact mis à jour
    document.getElementById('contact' + selectedContact).click();
}

function resetButton() {
    document.getElementById('civilite').value = '';
    document.getElementById('name').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('telephone').value = '';
};