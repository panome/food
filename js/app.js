'use strict'

const tabContent = document.querySelectorAll('.tabcontent'),
		tabheaderParent = document.querySelector('.tabheader__items'),
		tabheaderItem = tabheaderParent.querySelectorAll('.tabheader__item')



function hideTabContent() {
	tabContent.forEach(item => {
		item.classList.add('hide')
		item.classList.remove('show')
	})

	tabheaderItem.forEach(item => {
		item.classList.remove('tabheader__item_active')
	})
}

function showTabContent(i = 0) {
		tabContent[i].classList.add('show')
		tabContent[i].classList.remove('hide')
		tabheaderItem[i].classList.add('tabheader__item_active')
}

hideTabContent()
showTabContent()

tabheaderParent.addEventListener('click', (e) => {
	const target = e.target

	if (target && target.classList.contains('tabheader__item')) {
		tabheaderItem.forEach((item, i) => {
			if(target == item) {
				hideTabContent()
				showTabContent(i)
			}
		})
	}
})