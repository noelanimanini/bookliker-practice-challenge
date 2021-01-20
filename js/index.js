document.addEventListener("DOMContentLoaded", function() {});
const bookUrl = 'http://localhost:3000/books'
fetchBooks(); 

// DATA
function fetchBooks() {
    fetch(bookUrl)
    .then(response => response.json())
    .then(books => books.forEach(book => renderBooks(book)))
}

// DOM
function renderBooks(book) {
    const bookTitleUl = document.querySelector('#list-panel')
    const bookDiv = document.createElement('li')
    bookDiv.textContent = book.title
    bookTitleUl.appendChild(bookDiv)

    bookDiv.addEventListener('click', () => bookStuff(book))


}

    
/* iterate over the users, for each user, we have to create an element to contain them
put the array information into the new html element i create. 
1. iterate through all the users using .forEach()
2. create an element for the user using createElement('div')
3. To insert into the div tag, change the text content of the newly made element to the username
4. append into the #list 
*/



function bookStuff(book) {
    
    const bookThumbnail =  document.createElement('img')
    const bookDescription = document.createElement('div')
    const bookList = document.querySelector('#show-panel')
    const bookUl = document.createElement('div')
    const btn = document.createElement('button')
    btn.innerText = 'Like'
    bookList.innerHTML = ""
    bookDescription.innerText = book.description
    bookThumbnail.src = book.img_url
    bookThumbnail.style.width = '200px'

    bookList.append(bookThumbnail, bookDescription, bookUl)

    book.users.forEach( user => {
    
        const bookUsers = document.createElement('li')
        bookUsers.innerText = user.username
        bookUl.appendChild(bookUsers)
    })
    bookList.appendChild(btn)
    

    btn.addEventListener('click', () => updateBook(book))
}

function updateBook(book) {
  
    /*
    1. first a way to show the current user
    2. concatenate ? the old array and show it in the JSON body
    */
    newArray = [...book.users, {id: 1, username: "crystal"}] 

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: newArray
        })
      })
      .then(response => response.json())
      .then(book => {
        bookStuff(book)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

//event listeners

