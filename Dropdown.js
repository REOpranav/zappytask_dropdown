let showingSelectedInput = document.querySelector('#showingSelectedInput')
let selectItemDiv = document.querySelector('#cars')
let inputs = document.querySelectorAll('input')
let footer = document.querySelector('footer')
let done = document.querySelector('#done')

let flag = true
let selectInputLength = 0
let iconsLink = 'Images/cancelImage.png'

function showToast(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.style.backgroundColor = 'red';
    toast.classList.remove('hide');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
    }, 1500);
}

showingSelectedInput.addEventListener('click', () => {
    flag = !flag
    if (flag) {
        selectItemDiv.style.visibility = 'hidden';
        footer.style.visibility = 'hidden'
    } else {
        selectItemDiv.style.visibility = 'visible';
        footer.style.visibility = 'visible'
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
    });
});

done.addEventListener('click', () => {
    let value = 1

    if (checkedValues.length !== 0) {
        showingSelectedInput.textContent.startsWith('Pick users') || showingSelectedInput.textContent.startsWith(`${checkedValues.length} users picked`) ? showingSelectedInput.textContent = '' : null
    }

    checkedValues.map((val) => {
        let span = document.createElement('span')
        let removeUserIconImg = document.createElement('img')

        removeUserIconImg.id = 'removeUserIcon'
        if (checkedValues.length == 0) {
            span.textContent = "Select users"
            return
        }

        span.className = 'selectedSpanName'
        span.textContent = val.value
        removeUserIconImg.setAttribute('src', iconsLink)
        span.appendChild(removeUserIconImg)

        showingSelectedInput.appendChild(span)

        if (showingSelectedInput.childNodes.length > 2) {
            value++
            showingSelectedInput.childNodes[value].style.visibility = 'hidden'
        }

        removeUserIconImg.addEventListener('click', () => {
            console.log(val);
        })
    })

    selectItemDiv.style.visibility = 'hidden';
    footer.style.visibility = 'hidden'
})