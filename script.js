var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
var selectedContact = null;

window.onload = function() {
    document.getElementById('contactDetails').style.display = 'none';
    document.getElementById('contactForm').style.display = 'none';
}

document.addEventListener('DOMContentLoaded',function(){
    displayContacts();
});


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

function displayContactDetails(index) {
    var contact = contacts[index];
    document.getElementById('contactDetails').innerHTML =  contact.civilite+' ' +' '+contact.name+' '+contact.prenom+'<br><br>'+'Télé :'+' '+contact.telephone+'<br><br>';
    document.getElementById('contactDetails').style.display = 'block';
    document.getElementById('contactForm').style.display = 'none';

    // Bnt modifier
    var editButton = document.createElement('button');
    editButton.id = 'editButton';
    editButton.innerHTML = 'Modifier';

    editButton.addEventListener('click', function() {
        var contact = contacts[index];
        document.getElementById('civilite').value = contact.civilite;
        document.getElementById('name').value = contact.name;
        document.getElementById('prenom').value = contact.prenom;
        document.getElementById('telephone').value = contact.telephone;
        showForm(index);
    });

    // Bnt fermer
    var fermButton = document.createElement('button');
    fermButton.id = 'fermButton';
    fermButton.innerHTML = 'Fermer';

    fermButton.addEventListener('click', function() {
        document.getElementById('contactDetails').style.display = 'none';
        document.getElementById('contact' + selectedContact).classList.remove('selected');
    });

    // Ajouter btn modifier et fermer aux détails du contact
    document.getElementById('contactDetails').appendChild(editButton);
    document.getElementById('contactDetails').appendChild(fermButton);

}


function displayContacts() {
    var contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    // Trier les contacts par ordre alphabétique de nom puis de prénom
    contacts.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        var prenomA = a.prenom.toUpperCase();
        var prenomB = b.prenom.toUpperCase();
        if (prenomA < prenomB) {
            return -1;
        }
        if (prenomA > prenomB) {
            return 1;
        }

        return 0;
    });

    if (contacts.length === 0) {
        contactList.innerHTML = "Aucun contact n'est enregistré.";

    } else {
        contacts.forEach(function(contact, index) {
            var contactElement = document.createElement('p');
            contactElement.classList.add('contactElement');
            contactElement.innerHTML = contact.name+' '+contact.prenom;
            contactElement.onclick = function() {
                if (selectedContact !== null) {
                    document.getElementById('contact' + selectedContact).classList.remove('selected');
                }
                displayContactDetails(index);
                selectedContact = index;
                this.classList.add('selected');
                console.log(selectedContact);
            };
            contactElement.id = 'contact' + index;
            contactList.appendChild(contactElement);
        });
    }
}


function resetButton() {
    document.getElementById('civilite').value = '';
    document.getElementById('name').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('telephone').value = '';
};

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

