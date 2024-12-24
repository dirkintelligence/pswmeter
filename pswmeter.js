/*
 * v.1.2
 * Give score for password strength
 * give feedback to user
 * library based on https://github.com/pascualmj/pswmeter (v1.1)
 *             
 */
function passwordStrengthMeter(opts) {
    // Add styles inside body
    const customStyles = document.createElement('style')
    document.body.prepend(customStyles)
    customStyles.innerHTML = `
    ${opts.containerElement} {
        height: ${opts.height || 4}px;
        background-color: #eee;
        position: relative;
        overflow: hidden;
        border-radius: ${opts.borderRadius.toString() || 2}px;
    }
    ${opts.containerElement} .password-strength-meter-score {
        height: inherit;
        width: 0%;
        transition: .3s ease-in-out;
        background: ${opts.colorScore1 || '#999'};
    }
    ${opts.containerElement} .password-strength-meter-score.psms-25 {width: 25%; background: ${opts.colorScore1 || '#f00'};}
    ${opts.containerElement} .password-strength-meter-score.psms-50 {width: 50%; background: ${opts.colorScore2 || '#f80'};}
    ${opts.containerElement} .password-strength-meter-score.psms-75 {width: 75%; background: ${opts.colorScore3 || '#4f4'};}
    ${opts.containerElement} .password-strength-meter-score.psms-100 {width: 100%; background: ${opts.colorScore4 || '#292'};}`

    // Container Element
    const containerElement = document.getElementById(opts.containerElement.slice(1))
    containerElement.classList.add('password-strength-meter')

    // Score Bar
    let scoreBar = document.createElement('div')
    scoreBar.classList.add('password-strength-meter-score')

    // Append score bar to container element
    containerElement.appendChild(scoreBar)

    // Password input
    const passwordInput = document.getElementById(opts.passwordInput.slice(1))
    let passwordInputValue = ''
    passwordInput.addEventListener('keyup', function() {
        passwordInputValue = this.value
        checkPassword()
    })

    // Chosen Min Length
    let pswMinLength = opts.pswMinLength || 10

    // Score Message
    let scoreMessage = opts.showMessage ? document.getElementById(opts.messageContainer.slice(1)) : null
    let messagesList = opts.messagesList === undefined ? ['no data', 'too simple', 'simple', 'ok', 'good'] : opts.messagesList
    if (scoreMessage) { scoreMessage.textContent = messagesList[0] || 'No data'}

    // Check Password Function
    function checkPassword() {

        let score = getScore()
        updateScore(score)

    }

    // Get Score Function
    function getScore() {
        /*
            scores
            0: type in password
            1: too simple
            2: simple
            3: ok
            4: great
        */
        let score = 0

        let regexLower = new RegExp('(?=.*[a-z])')
        let regexUpper = new RegExp('(?=.*[A-Z])')
        let regexDigits = new RegExp('(?=.*[0-9])')
        let regexSpecial = new RegExp('(?=.*[^a-zA-Z0-9 ])')
        let regexLength = new RegExp('(?=.{' + pswMinLength + ',})')

        if (passwordInputValue.match(regexLower)) { ++score }
        if (passwordInputValue.match(regexUpper)) { ++score }
        if (passwordInputValue.match(regexDigits)) { ++score }
        if (passwordInputValue.match(regexSpecial)) { ++score }

        // Minium length is mandatory
        if (passwordInputValue.length < pswMinLength) {
          score = Math.min(score, 2);
        }

        // Prevent special expressions in the first 10 characters
        let f10ch = passwordInputValue.substring(0,10);
        const pwlist = [
            // english
            'Password12', 'Welcome123', 'Test123456', 'Admin12345', 'Qwertzuiop', 'Qwertz1234',
            // german
            'Passwort12', 'Geheim1234', 'Benutzer12'
        ];
        if (pwlist.includes(f10ch)) {
            score = Math.min(score, 2);
        }
        return score
    }

    // Show Score Function
    function updateScore(score) {
        switch(score) {
            case 1:
                scoreBar.className = 'password-strength-meter-score psms-25'
                if (scoreMessage) { scoreMessage.textContent = messagesList[1] || 'too simple' }
                containerElement.dispatchEvent(new Event('onScore1', { bubbles: true }))
                break
            case 2:
                scoreBar.className = 'password-strength-meter-score psms-50'
                if (scoreMessage) { scoreMessage.textContent = messagesList[2] || 'simple' }
                containerElement.dispatchEvent(new Event('onScore2', { bubbles: true }))
                break
            case 3:
                scoreBar.className = 'password-strength-meter-score psms-75'
                if (scoreMessage) { scoreMessage.textContent = messagesList[3] || 'better' }
                containerElement.dispatchEvent(new Event('onScore3', { bubbles: true }))
                break
            case 4:
                scoreBar.className = 'password-strength-meter-score psms-100'
                if (scoreMessage) { scoreMessage.textContent = messagesList[4] || 'good' }
                containerElement.dispatchEvent(new Event('onScore4', { bubbles: true }))
                break
            default:
                scoreBar.className = 'password-strength-meter-score'
                if (scoreMessage) { scoreMessage.textContent = messagesList[0] || 'no data' }
                containerElement.dispatchEvent(new Event('onScore0', { bubbles: true }))
           }
    }

    // Return anonymous object with properties
    return {
        containerElement,
        getScore
    }
}