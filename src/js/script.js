const hamburgerBtn = document.querySelector('.hamburger')
const navList = document.querySelector('.nav__list')
const navItems = document.querySelectorAll('.nav__list-item')
const navbar = document.querySelector('.nav')
const offerSubpageBtns = document.querySelectorAll('.offer-subpage__card-btn')
const formName = document.querySelector('#name')
const formEmail = document.querySelector('#mail')
const formMsg = document.querySelector('#msg')
const formBtn = document.querySelector('.contact__form-btn')
const formPopup = document.querySelector('.contact__form-popup')
const formPopupBtn = document.querySelector('.contact__form-popup-btn')

const footerYear = document.querySelector('.footer__year');

let sections = document.querySelectorAll('.scroll-spy')
let navLinks = document.querySelectorAll('.nav__list-item')

function addTransparent() {
	if (window.scrollY >= 100) {
		navbar.classList.add('nav-bg')
	} else {
		navbar.classList.remove('nav-bg')
	}
}

const handleNav = () => {
	hamburgerBtn.classList.toggle('is-active')
	navList.classList.toggle('active-nav')
	document.body.classList.toggle('fixed-body')
}

const closeNav = () => {
	hamburgerBtn.classList.remove('is-active')
	navList.classList.remove('active-nav')
	document.body.classList.remove('fixed-body')
}

const handleOfferCard = e => {
	const offerSubpageContent = e.target.closest('.offer-subpage__box').querySelector('.offer-subpage__content')

	offerSubpageContent.closest('.offer-subpage__content').classList.toggle('active-card')
	e.target.classList.toggle('active-card-btn')

	if (e.target.classList.contains('active-card-btn')) {
		e.target.textContent = 'Ukryj'
	} else {
		e.target.textContent = 'Rozwiń'
	}
}

const showError = (input, text) => {
	const formBox = input.parentElement
	const errorText = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorText.textContent = text
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków.`)
	}
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, 'E-mail jest niepoprawny.')
    }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.contact__form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++
        }
    })

    if(errorCount === 0) {
        formPopup.classList.add('show-popup')
    }
}

const clearForm = () => {
	[formName, formEmail, formMsg].forEach(el => {
		el.value = '';
        clearError(el)
	})
}

const closePopup = () => {
	formPopup.classList.remove('show-popup')
	clearForm()
}


function handleCurrentYear() {
	const year = new Date().getFullYear();
    footerYear.innerText = year;
}

handleCurrentYear();

window.onscroll = () => {
	sections.forEach(sec => {

		let top = window.scrollY
		let offset = sec.offsetTop - 100;
		let height = sec.offsetHeight
		let id = sec.getAttribute('id');

		if (top >= offset && top < offset + height) {
			navLinks.forEach(link => {
				link.classList.remove('active')
				let scrollSpyItem = document.querySelector('ul li a[href*=' + id + ']')
				scrollSpyItem.parentElement.classList.add('active')
			})
		}
	})
}

offerSubpageBtns.forEach(btn => btn.addEventListener('click',handleOfferCard))
navItems.forEach(item => item.addEventListener('click', closeNav))
hamburgerBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', addTransparent)

formBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([formName, formEmail, formMsg])
	checkLength(formName, 3)
	checkMail(formEmail)
	checkLength(formMsg, 5)
	checkErrors()
})
formPopupBtn.addEventListener('click', closePopup)