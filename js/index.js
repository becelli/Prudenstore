const body = document.querySelector('body')
const page = document.querySelector('#page')
let cart = [],
	db = [],
	lastDisplayed = []

readJSON()
async function readJSON() {
	await fetch('./database/data.json')
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			db = data
			recoverInfo()
			Responsivity()
			listAllCategories()
			listAllSorters()
			listProducts(db[0])

			// orderByPrice()
		})
}

const recoverInfo = () => {
	const data = JSON.parse(sessionStorage.getItem('items'))
	if (data) {
		cart = data
		const button = document.querySelector('#buy-button')
		if (cart) button.removeAttribute('disabled')
		const span = document.querySelector('#cart-items')
		span.innerHTML = cart.length
	}
}
// CONTROL SHOW PRODUCTS
const listProducts = (array) => {
	const main = document.createElement('main')
	main.setAttribute('id', 'products')
	array.forEach((item) => {
		const card = document.createElement('section')
		const name = document.createElement('h1')
		const category = document.createElement('p')
		const price = document.createElement('h1')
		const button = document.createElement('button')
		const image = document.createElement('img')
		button.setAttribute('onclick', `addItemToCart(${item.id})`)
		button.classList.add('add-button')
		card.classList.add('card')
		image.setAttribute('src', item.image)
		name.innerHTML = item.name
		category.innerHTML = item.category
		price.classList.add('price')
		price.innerHTML = `R$ ${item.price.toFixed(2)}`
		button.innerHTML = 'Adicionar ao Carrinho'

		card.appendChild(image)
		card.appendChild(name)
		card.appendChild(category)
		card.appendChild(price)
		card.appendChild(button)
		main.appendChild(card)
	})
	page.appendChild(main)
	lastDisplayed = array
}
const removeShownProducts = () => {
	const main = document.querySelector('main')
	main.remove()
}

// ADD ITEM TO THE CART
const addItemToCart = (id) => {
	const button = document.querySelector('#buy-button')
	if (cart) button.removeAttribute('disabled')
	cart.push(db[0][id - 1])
	const span = document.querySelector('#cart-items')
	span.innerHTML = cart.length
}
const CloseCart = () => {
	const dataToSend = JSON.stringify(cart)
	sessionStorage.setItem('items', dataToSend)
}
// FILTERS AND ORDERS
const listAllCategories = () => {
	const section = document.querySelector('sidebar')
	const ul = document.createElement('ul')
	ul.classList.add('list-ul')
	const h1 = document.createElement('h1')
	h1.innerHTML = 'Filtrar'
	ul.appendChild(h1)
	const liAllProducts = document.createElement('li')
	liAllProducts.innerHTML = 'Todos'
	liAllProducts.setAttribute(
		'onclick',
		`removeShownProducts();
        listProducts(db[0]);`,
	)

	ul.appendChild(liAllProducts)
	db[1].forEach((item) => {
		const li = document.createElement('li')
		li.innerHTML = item
		li.setAttribute('onclick', `filterByCategory('${item}')`)
		ul.appendChild(li)
	})
	section.appendChild(ul)
	page.appendChild(section)
}
const listAllSorters = () => {
	let i = 0
	const sorters = ['Crescente', 'Decrescente']
	const section = document.querySelector('sidebar')
	const ul = document.createElement('ul')
	ul.classList.add('list-ul')
	const h1 = document.createElement('h1')
	h1.innerHTML = 'Ordernar'
	ul.appendChild(h1)
	sorters.forEach((item) => {
		const li = document.createElement('li')
		li.innerHTML = item
		li.setAttribute('onclick', `orderByPrice(${i})`)
		ul.appendChild(li)
		i++
	})
	section.appendChild(ul)
	page.appendChild(section)
}
const filterByCategory = (category) => {
	let filtered = []
	db[0].forEach((item) => {
		if (item.category == category) filtered.push(item)
	})
	removeShownProducts()
	listProducts(filtered)
}
// Fix bad designs in mobile
const Responsivity = () => {
	const width = window.innerWidth
	if (width > 540) {
		const flex = document.getElementById('page')
		flex.classList.add('flex')
	}
}

const orderByPrice = (type) => {
	lastDisplayed.sort((a, b) => (a.price >= b.price ? 1 : -1))
	if (type) lastDisplayed.reverse()
	removeShownProducts()
	listProducts(lastDisplayed)
}
