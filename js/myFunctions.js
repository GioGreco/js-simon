//Questa funzione restituisce 'true' se la parola inserita è palindroma;
let isPalindrome = function(string){
    let invertedString = string.split('').reverse().join('');
    console.log(invertedString);
    if(string == invertedString){
        return true;
    }
};
//Questa funzione restituisce un numero random tra due estremi;
let randomBetween = function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
//Questa funzione restituisce 'true' se il numero inserito è pari;
let isEven = function(num){
    if(num % 2 === 0){
        return true;
    } else {
        return false;
    }
};
//Questa funzione consente di far apparire un alert di errore con un messaggio a piacere;
let notifyError = function(msgError){
    const alert = document.createElement('div');
    alert.className='alert alert-danger';
    alert.innerHTML = msgError;
    return alert;
}
//Questa funzione rimuove la prima notifica di classe 'alert' che viene trovata nel documento html;
let removeFirstNotification = function(){
    const alertToRemove = document.querySelector('.alert');
    console.log(alertToRemove);
   if(alertToRemove) alertToRemove.remove();
}