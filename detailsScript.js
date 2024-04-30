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

