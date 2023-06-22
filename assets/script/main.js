window.addEventListener('DOMContentLoaded', function(){
    //regex pour verifiction de valeur d'un input
    let courrielRegex = /(.+)@(.+){1,}\.(.+){1,}/,
        telRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        nameRegex = /^[a-zA-Z]+(([,][a-zA-Z ])?[a-zA-Z]*)*$/;
   
    let elsPanneau = document.querySelectorAll('[data-js-panneau]'),
        elsBtnSuivant = document.querySelectorAll('[data-js-suivant]'),
        elsBtnPrecedent = document.querySelectorAll('[data-js-precedent]');

    // évènement click bouton pour avancer
    for (let i = 0, l = elsBtnSuivant.length; i < l; i++) {

        elsBtnSuivant[i].addEventListener('click', function(e){
            e.preventDefault();
            let indexPanneau = parseInt(e.target.dataset.jsSuivant);
                           
            switch (indexPanneau) {
                case 1:

                    let valid = validePanneau(elsPanneau[indexPanneau-1]);

                    if (valid) {
                        prochainePanneau(elsPanneau[indexPanneau-1],
                            elsPanneau[indexPanneau]);
                    }
                    break;
                case 2:

                    let valid2 = validePanneau(elsPanneau[indexPanneau-1]);
                    
                    if (valid2) {
                        prochainePanneau(elsPanneau[indexPanneau-1],
                            elsPanneau[indexPanneau]);
                        traitePanneau2(elsPanneau[indexPanneau-1]);
                    }
                    
                    break;
                case 3:
                    let valid3 = validePanneau(elsPanneau[indexPanneau-1]);
                    if (valid3) {
                        prochainePanneau(elsPanneau[indexPanneau-1],
                            elsPanneau[indexPanneau]); 
                        
                        traitePanneau3(elsPanneau[indexPanneau-1]);
                    }
                    
                    break;
            }
        })
    }

    // évènement click bouton pour reculer
    for (let i = 0, l = elsBtnPrecedent.length; i < l; i++) {

        elsBtnPrecedent[i].addEventListener('click', function(e){
            e.preventDefault();
            let indexPanneau = parseInt(e.target.dataset.jsPrecedent);
            let inputs = elsPanneau[indexPanneau-1].querySelectorAll('input');
            switch (indexPanneau) {
                case 1:
                    prochainePanneau(elsPanneau[indexPanneau],
                        elsPanneau[indexPanneau-1]);
                
                    break;
                case 2:
                    prochainePanneau(elsPanneau[indexPanneau],
                        elsPanneau[indexPanneau-1]);
                    break;
                case 3:
                    prochainePanneau(elsPanneau[indexPanneau],
                        elsPanneau[indexPanneau-1]);
                    break;
                case 4:
                    prochainePanneau(elsPanneau[indexPanneau],
                        elsPanneau[indexPanneau-1]);   
                    break;
            }
        })
         
    }

    /**
     * 
     * @param {*} elsPanneau 
     */
    function traitePanneau2(elsPanneau) {

        elsPanneau = document.querySelector('[data-js-panneau="2"]')
        let loisir = document.querySelector('[id="loisirs"]').value,
            mets = document.querySelector('[id="mets"]').value,
            villes = document.querySelector('[id="villes"]').value;
        let arrMets = mets.split(', '),
            arrLoisir = loisir.split(', '),
            arrVilles = villes.split(', ');
        for (let i = 0, l = arrLoisir.length; i < l; i++) {
            arrLoisir[i] = arrLoisir[i].charAt(0).toUpperCase() + arrLoisir[i].slice(1);
        }

        for (let i = 0, l = arrMets.length; i < l; i++) {
            arrMets[i] = arrMets[i].charAt(0).toUpperCase() + arrMets[i].slice(1);
        }

        for (let i = 0, l = arrLoisir.length; i < l; i++) {
            villes[i] = villes[i].charAt(0).toUpperCase() + villes[i].slice(1);
        }
            
        removeDuplicates(arrLoisir);
        removeDuplicates(arrMets);
        removeDuplicates(arrVilles);
    
        let elsQuestion = document.querySelectorAll('[data-js-cote]');
        for (let i = 0, l = elsQuestion.length; i < l; i++) {

            let index = parseInt(elsQuestion[i].dataset.jsCote);
            
            switch (index) {
                    case 1:
                        if ((arrLoisir.length > 1)) {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour vos choix de 'Loisirs'</h3>`;
                        } else {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour votre choix de 'Loisirs'</h3>`;
                        }
                        injecteRadios(elsQuestion[index-1], arrLoisir);
                        break;
                    case 2:
                        
                        if ((arrMets.length > 1)) {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour vos choix de 'Mets'</h3>`;
                        } else {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour votre choix de 'Mets'</h3>`;
                        }
                        injecteRadios(elsQuestion[index-1], arrMets);
                        break;
                        
                    case 3:
                        if ((arrVilles.length > 1)) {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour vos choix de 'Villes'</h3>`;
                        } else {
                            elsQuestion[index-1].innerHTML = `<h3>Donner une côte de 1 (gauche) à 5 (droite) pour votre choix de 'Villes'</h3>`;
                        }
                        injecteRadios(elsQuestion[index-1], arrVilles);
                        break;
                }
                
            }
    }
    /**
     * 
     * @param {*} elsPanneau 
     */
    function traitePanneau3(elsPanneau) {
            // recupération de valeur d'un input
        let elForm =  document.querySelector('[data-js-panneau="1"]'),
            elNom = elForm.querySelector('[id="name"]').value,
            elPrenom = elForm.querySelector('[id="surname"]').value,
            elCourriel = elForm.querySelector('[id="email"]').value,
            elTel = elForm.querySelector('[id="phone"]').value,
            elDateNaissance = elForm.querySelector('[id="birthday"]').value,
            elRevenu1 = parseInt(elForm.querySelector('[id="revenu1"]').value), 
            elRevenu2 = parseInt(elForm.querySelector('[id="revenu2"]').value),
            elRevenu3 = parseInt(elForm.querySelector('[id="revenu3"]').value),
            elRevenu4 = parseInt(elForm.querySelector('[id="revenu4"]').value),
            elRevenu5 = parseInt(elForm.querySelector('[id="revenu5"]').value);

        let panneauResume = document.querySelector('[data-js-panneau="4"]'),
            champLoisir = panneauResume.querySelector('[data-js-resume-loisir]'),
            champMets = panneauResume.querySelector('[data-js-resume-mets]'),
            champVilles = panneauResume.querySelector('[data-js-resume-villes]'),
            elCoteLoisir = elsPanneau.querySelector('[data-js-cote="1"]'),
            elCoteMets = elsPanneau.querySelector('[data-js-cote="2"]'),
            elCoteVilles = elsPanneau.querySelector('[data-js-cote="3"]');

        let elsCoteLoisirWraper = elCoteLoisir.querySelectorAll('[data-js-control-wrapper="required"]'),
            elsCoteMetsWraper = elCoteMets.querySelectorAll('[data-js-control-wrapper="required"]'),
            elsCoteVillesWraper = elCoteVilles.querySelectorAll('[data-js-control-wrapper="required"]');

        let elTitreLoisir = champLoisir.querySelector('ul'),
            elTitreMets = champMets.querySelector('ul'),
            elTitreVilles = champVilles.querySelector('ul');
        let MoyenneRevenue = (elRevenu1+elRevenu2+elRevenu3+elRevenu4+elRevenu5)/5;
        let elInfo = panneauResume.querySelector('[data-js-resume-info]');
            elInfo.innerHTML = `<p>Nom: <strong>${elNom}</strong></p>
                                <p>Prénom: <strong>${elPrenom}</strong></p>
                                <p>Courriel: <strong>${elCourriel}</strong></p>
                                <p>Téléphone: <strong>${elTel}</strong></p>
                                <p>Date de naissance: <strong>${elDateNaissance}</strong></p>
                                <p>Revenu des 5 derniéres années:</p>
                                <ul>
                                <li>${elRevenu1} &#x24;</li>
                                <li>${elRevenu2} &#x24;</li>
                                <li>${elRevenu3} &#x24;</li>
                                <li>${elRevenu4} &#x24;</li>
                                <li>${elRevenu5} &#x24;</li>
                                </ul>
                                <p>Moyenne des revenues: <strong>${MoyenneRevenue}</strong> &#x24;</p>`;

        for (let i = 0; i < elsCoteLoisirWraper.length; i++) {
            
            let elem = elsCoteLoisirWraper[i].querySelector('span').textContent;
            elem = elem.replace(':',' '); 
            //elem = elem.charAt(0).toUpperCase() + elem.slice(1); 
            let coteElsLoisir = elsCoteLoisirWraper[i].querySelectorAll('input');
            for (let j = 0; j < coteElsLoisir.length; j++) {
                
                if (coteElsLoisir[j].checked) {
                    
                    let cote = coteElsLoisir[j].value;
                    elTitreLoisir.innerHTML += `<li>${elem} (${cote}/5)</li>`
                }
            }
        }

        for (let i = 0; i < elsCoteMetsWraper.length; i++) {
            
            let elem = elsCoteMetsWraper[i].querySelector('span').textContent;
            elem = elem.replace(':',' ');
            //elem = elem.charAt(0).toUpperCase() + elem.slice(1);   
            let coteElsMets = elsCoteMetsWraper[i].querySelectorAll('input');
            for (let j = 0; j < coteElsMets.length; j++) {
                
                if (coteElsMets[j].checked) {
                    
                    let cote = coteElsMets[j].value;
                    elTitreMets.innerHTML += `<li>${elem} (${cote}/5)</li>`
                }
            }
        }

        for (let i = 0; i < elsCoteVillesWraper.length; i++) {
            
            let elem = elsCoteVillesWraper[i].querySelector('span').textContent;
            elem = elem.replace(':',' ');
            //elem = elem.charAt(0).toUpperCase() + elem.slice(1);  
            let coteElsVillses = elsCoteVillesWraper[i].querySelectorAll('input');
            for (let j = 0; j < coteElsVillses.length; j++) {
                
                if (coteElsVillses[j].checked) {
                    
                    let cote = coteElsVillses[j].value;
                    elTitreVilles.innerHTML += `<li>${elem} (${cote}/5)</li>`
                }
            }
        }
    }
    /**
     * 
     * @param {*} elsRadio 
     * @returns tableau sans double
     */
    function removeDuplicates(elsRadio) {
        
        for (let i = 0, l = elsRadio.length; i < l; i++) {
          let currentValue = elsRadio[i];
            
          while (elsRadio.indexOf(currentValue) !== elsRadio.lastIndexOf(currentValue)) { 
            elsRadio.splice(elsRadio.lastIndexOf(currentValue), 1);
          }
        }
      
        return elsRadio;
      }
    /**
     * 
     * @param {*} elParent 
     * @param {*} arrPrefferance 
     */
    function injecteRadios(elParent, arrPrefferance) {

        for (let j = 0, m = arrPrefferance.length; j < m; j++) {
           let elsCote = `<div data-js-control-wrapper="required">
                            <span>${arrPrefferance[j]}:</span>
                            <label>
                                <input type="radio" name="cote-${arrPrefferance[j]}" value="1">
                            </label>
                            <label>
                                <input type="radio" name="cote-${arrPrefferance[j]}" value="2">
                            </label>
                            <label>
                                <input type="radio" name="cote-${arrPrefferance[j]}" value="3">
                             </label>
                            <label>
                                <input type="radio" name="cote-${arrPrefferance[j]}" value="4">
                            </label>
                            <label>
                                <input type="radio" name="cote-${arrPrefferance[j]}" value="5">
                            </label>
                            </div>`;
            elParent.innerHTML += elsCote;
        }
    }
    /**
     * 
     * @param {*} PanneauActuel 
     * @param {*} PanneauSuivant 
     */
    function prochainePanneau(PanneauActuel, PanneauSuivant) {
        PanneauActuel.classList.replace('actif', 'inactif');
        PanneauSuivant.classList.replace('inactif', 'actif');
    }

    /**
     * 
     * @param {*} elForm 
     */
    function validePanneau(elForm) {
        
        /**
         * Tout les champs
         */
        let valid = true;

        let elsRequired = elForm.querySelectorAll('[required]');
        
        for (let i = 0, l = elsRequired.length; i < l; i++) {
            let elParent = elsRequired[i].parentNode,
                elError = elParent.querySelector('[data-js-error]');
            if (elsRequired[i].value !== '') {
                //cas valide
                if (elParent.classList.contains('error')) {
                    supprimeError(elParent, elError);                 
                }

            } else {
                //cas error
                ajouteError(elParent, elError, 'Ce champs est requis')
                valid = false;
            }
            
        }

        /**
         * Champs de type email
         */

        let elsEmailInput = elForm.querySelectorAll('input[type="email"]');

        for (let i = 0, l = elsEmailInput.length; i < l; i++) {
            
            if (elsEmailInput[i].value != '') {

                let courriel = elsEmailInput[i].value,
                    elWrapper = elsEmailInput[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg = elWrapper.querySelector('[data-js-error]');
            
                if (courrielRegex.test(courriel)) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeError(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'L\'adresse courriel saisie n\'est pas valide.';
                    ajouteError(elWrapper, elErrorMsg, msg);
                    valid = false;
                }
            }
        }


        /**
         * Champs de type tel
         */

        let elsTelInput = elForm.querySelectorAll('input[type="tel"]');

        for (let i = 0, l = elsTelInput.length; i < l; i++) {

            if (elsTelInput[i].value != '') {

                let telephone = elsTelInput[i].value,
                    elWrapper = elsTelInput[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg = elWrapper.querySelector('[data-js-error]');
            
                if (telRegex.test(telephone)) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeError(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'Le numéro de téléphone saisi n\'est pas valide.';
                    ajouteError(elWrapper, elErrorMsg, msg);
                    valid = false;
                }
            }
        }

        /**
         * Champs de type number
         */

        let elsInputRevenu = elForm.querySelectorAll('input[type="number"]');
        for (let i = 0, l = elsInputRevenu.length; i < l; i++) {

            if (elsInputRevenu[i].value != '') {
                let revenu = elsInputRevenu[i].value,
                elWrapper = elsInputRevenu[i].closest('[data-js-control-wrapper]'),
                elErrorMsg = elWrapper.querySelector('[data-js-error]');
                
                if (elsInputRevenu[i].value >= 0) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeError(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'La valeur saisie doit être positive';
                    ajouteError(elWrapper, elErrorMsg, msg);
                    valid = false;
                }
                if(elsInputRevenu[i].value.indexOf(0)==0 && elsInputRevenu[i].value.length > 1)
                    if (elWrapper.classList.contains('error')) {
                        supprimeError(elWrapper, elErrorMsg);
                    } else {
                        let msg = 'La valeur saisie ne peut commencer par 0';
                            ajouteError(elWrapper, elErrorMsg, msg);
                            valid = false;
                    }
            }   
        }

        /**
         * Champs de types radio et checkbox
         */
        let elsRequiredControlWrapper = elForm.querySelectorAll('[data-js-control-wrapper="required"]');

        for (let i = 0, l = elsRequiredControlWrapper.length; i < l; i++) {

            // Récupère les éléments DOM à valider
            let elInputs = elsRequiredControlWrapper[i].querySelectorAll('input'),
                elErrorMsg = elsRequiredControlWrapper[i].querySelector('[data-js-error]'),
                estSelectionne = false;

                
            // Valide si un radio/checkbox a été coché
            for (let n = 0, m = elInputs.length; n < m; n++) {
                if (elInputs[n].checked) estSelectionne = true;
            }
            
            // Comportements si un radio/checkbox a été coché, ou pas
            if (estSelectionne) {
                if (elsRequiredControlWrapper[i].classList.contains('error')) {
                    supprimeErrorRadio(elsRequiredControlWrapper[i]);
                }
            // En cas de erreur    
            } else {
                ajouteErrorRadio(elsRequiredControlWrapper[i]);
                valid = false;
            }
        }
        return valid;
    }

    /**
     * 
     * @param {*} elem 
     * @param {*} elErrorMsg 
     * @param {*} msg 
     */
    function ajouteError(elem, elErrorMsg, msg) {
        elem.classList.add('error');
        elErrorMsg.textContent = msg;
        
    }

    /**
     * 
     * @param {*} elem 
     * @param {*} elErrorMsg 
     */
    function supprimeError(elem, elErrorMsg) {
        elem.classList.remove('error');
        elErrorMsg.textContent = '';
    }
    /**
     * 
     * @param {*} elem 
     */
    function ajouteErrorRadio(elem) {
        elem.classList.add('error');
    }
    /**
     * 
     * @param {*} elem 
     */
    function supprimeErrorRadio(elem) {
        elem.classList.remove('error');
    }
})