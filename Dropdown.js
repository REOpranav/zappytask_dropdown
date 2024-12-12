let main = document.querySelector('main')
let showingSelectedInput = document.querySelector('#showingSelectedInput')
let user_header = document.querySelector('.user_header')
let dropDownIcon = document.querySelector('.dropDownIcon')
let inputItemheader = document.querySelector('#cars')
let showRemainigCount = document.querySelector('.remainingCount')
let footer = document.querySelector('footer')
let clearAllButton = document.querySelector('#clearAll')
let doneButton = document.querySelector('#done')
let cancelButton = document.querySelector('#cancel')

let pTag = document.createElement('p')
let img = document.createElement('img')
let label = document.createElement('label')
let inputTag = document.createElement('input')

// utils function
const showCssForMain = (element) => {
    element.style.borderColor = '1px solid #ddd'
    element.style.boxShadow = '1px 1px 10px #ddd'
}

const hideCssForMain = (element) => {
    element.style.borderColor = ''
    element.style.boxShadow = ''
}

// utils
let flag = false
let selectInputLength = 0
let iconsLink = 'Images/cancelImage.png'

let usersNames = ['Ben', 'Bheem', 'Captain', 'Gwen', 'Heat_blast', 'Kevin', 'Jaggu', 'Raju']
let URLs = []

let displayMessageUser = 'Select users' // Display Messages

let counter = 0
usersNames.forEach((value) => { // creating the list of users based in array values
    let pTag = document.createElement('p')

    let img = document.createElement('img')
    let label = document.createElement('label')
    let inputTag = document.createElement('input')

    img.setAttribute('src', URLs.length > 0 && URLs[counter] ? URLs[counter] : 'Images/empytyImage.png')
    counter++
    label.setAttribute('for', value)
    label.textContent = value
    inputTag.setAttribute('type', 'checkbox')
    inputTag.setAttribute('value', value.toLocaleLowerCase())
    inputTag.setAttribute('name', value.toLocaleLowerCase())
    inputTag.id = value

    pTag.appendChild(img)
    pTag.appendChild(label)
    pTag.appendChild(inputTag)

    inputItemheader.appendChild(pTag)
})
let inputs = document.querySelectorAll('input')

// toast message
function showToast(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
    }, 1500);
}

user_header.addEventListener('click', () => {
    flag = !flag
    if (flag) {
        inputItemheader.style.display = 'none';
        inputItemheader.className = 'hideInputs'
        footer.style.display = 'none';
        hideCssForMain(main)
    } else {
        inputItemheader.style.display = 'block';
        inputItemheader.className = 'showInputs'
        footer.style.display = 'flex';
        showCssForMain(main)
    }
})

let checkedValues = [];
inputs.forEach((val) => {
    val.addEventListener('change', () => {
        if (val.checked) {
            if (!checkedValues.includes(val.value)) {
                if (checkedValues.length > 4) {
                    showToast('Maximum Users Allowed : 5')
                    val.checked = false
                    return
                }
                checkedValues.push(val);
            }
        } else {
            checkedValues = checkedValues.filter(value => value !== val);
        }

        if (checkedValues.length >= 3) {
            showingSelectedInput.textContent = `${checkedValues.length} users picked`
        } else {
            showingSelectedInput.textContent = `Pick users`
        }

        buttonDisable()

    });
});

function done() {
    let count = 1
    let numberOfCount = 0

    showingSelectedInput.innerHTML = ''
    if (checkedValues.length !== 0) {
        showingSelectedInput.textContent.startsWith('Pick users') || showingSelectedInput.textContent.startsWith(`${checkedValues.length} users picked`) ? showingSelectedInput.textContent = '' : null
    } else {
        showingSelectedInput.textContent = displayMessageUser
    }

    checkedValues.map((val) => {
        let span = document.createElement('span')
        let removeUserIconImg = document.createElement('img')
        removeUserIconImg.id = 'removeUserIcon'
        if (checkedValues.length == 0) {
            span.textContent = displayMessageUser
            return
        }

        span.className = 'selectedSpanName'
        span.textContent = val.value
        removeUserIconImg.setAttribute('src', iconsLink)
        span.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
        })
        span.appendChild(removeUserIconImg)

        showingSelectedInput.appendChild(span)
        if (showingSelectedInput.childNodes.length > 2) {
            ++count
            ++numberOfCount
            showingSelectedInput.childNodes[count].style.display = 'none'
            showRemainigCount.textContent = `+${numberOfCount}`
        }

        removeUserIconImg.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            val.checked = false
            checkedValues = checkedValues.filter(value => value !== val);
            span.remove()

            --count
            if (count <= 0) {
                elementCheckForMessage(showingSelectedInput)
            } else {
                let NextValueCount = checkedValues.length - 1
                count ? showingSelectedInput.childNodes[NextValueCount].style.display = 'block' : null
                --numberOfCount
                if (numberOfCount < 1) {
                    showRemainigCount.innerHTML = ''
                } else {
                    showRemainigCount.textContent = `+${numberOfCount}`
                }
            }
        })
    })
    inputItemheader.style.display = 'none';
    footer.style.display = 'none'
    hideCssForMain(main)
    buttonDisable()
}

function buttonDisable() {
    if (checkedValues.length > 0) {
        doneButton.disabled = false
        doneButton.style.color = 'green'
        doneButton.style.border = '1px solid rgb(0, 227, 0)'
        clearAllButton.disabled = false
        clearAllButton.style.color = 'darkblue'
        clearAllButton.style.border = '1px solid darkblue'
    }else{
        doneButton.disabled = true
        doneButton.removeAttribute('style')
        clearAllButton.disabled = true
        clearAllButton.removeAttribute('style')
    }
}

function cancel() {
    inputItemheader.style.display = 'none';
    footer.style.display = 'none'
}

function clearAll() {
    inputs.forEach(value => value.checked = false)
    checkedValues = []
    showingSelectedInput.innerHTML = displayMessageUser
}

const elementCheckForMessage = (element) => {
    if (checkedValues == 0) {
        element.textContent = displayMessageUser
        inputItemheader.style.display = 'block';
        footer.style.display = 'flex';
    }
}