# The Hollywood Effect
My final project as part of General Assembly’s Software Engineering Immersive Bootcamp, a complex full-stack application built with Django REST Framework and React. This was my first time building an application using python/django as the backend. I decided to make an application that displays movie adaptations of books, the user is able to login and post reviews where they decide whether the movie or the book is better.

Explore here.

<img width="1440" alt="Screenshot 2021-11-03 at 13 56 51" src="https://user-images.githubusercontent.com/87997491/140073504-c22dc0f1-2bd3-4fad-99c6-b0261e0d25f8.png">

# Code Installation
* Install back-end dependencies: __pipenv__
* Enter Shell for project: __pipenv shell__
* Make Migrations: __python manage.py makemigrations__
* Migrate: __python manage.py migrate__
* Load Seed data for genres: __python manage.py loaddata genres/seeds.json__
* Load Seed data for titles: __python manage.py loaddata adaptations/seeds.json__
* Start back-end server: __python manage.py runserver__
* Change into front-end directory: __cd client__
* Install front-end dependencies: __yarn__
* Start front-end server: __yarn start__

# Goal
* Build a full stack application with a React front-end and a Django back-end
* Build a fully functional RESTful api with all CRUD routes (GET, POST, PUT, DELETE)
* Use at least one OneToMany & one ManyToMany relationship
* Custom authentication (register/login) 
* __Timeline__: 10 days.

# Technology Used
__Backend:__
* Python
* Django
* Django REST Framework
* Psycopg2
* pyJWT <br />

__Frontend:__
* React
* Axios
* SCSS
* Http-proxy-middleware
* Nodemon
* React Router Dom <br />

__Development tools:__
* VS code
* Yarn
* Insomnia
* PostgreSQL
* Git
* Github
* Google Chrome dev tools
* Trello Board (planning)

# Approach and Timeline

__Day 1__ <br />
I started the design process by planning. I sketched out how I wanted the list page to look - this would be the page that displays all the titles. I decided I wanted a search bar here as well as a drop down filter bar that would allow users to filter the titles by genre. This would also give me the opportunity to use a many to many relationship in my backend through ascribing genres to each title. It was crucial to my app that users be able to post reviews so I made sure to make note of reviews being an important model to create when developing my backend.

__Day 2 - 4__ <br />
I began developing my backend, starting with basic installation. Once this was done, it was time to create the project. I first created the models, views, and urls for the adaptations before beginning on the genres.
```
class Adaptation(models.Model):
    name = models.CharField(max_length=50, default=None)
    synopsis = models.TextField(max_length=1000, default=None)
    author = models.CharField(max_length=50, default=None)
    book_release_year = models.PositiveIntegerField(default=None)
    book_image = models.CharField(max_length=500, default=None)
    director = models.CharField(max_length=50, default=None)
    movie_release_year = models.PositiveIntegerField(default=None)
    movie_image = models.CharField(max_length=500, default=None)
    book_link = models.CharField(max_length=500, blank=True)
    movie_link = models.CharField(max_length=50, blank=True)
    genres = models.ManyToManyField(
        'genres.Genre',
        related_name = "adaptations",
        blank=True
    )
```
When creating the reviews model, I knew I wanted a spoiler key that would have a checkbox field. My idea for this was that users would tick this box if there was a spoiler in the review they were about to post, this review would then be hidden behind a button that would need to be clicked in order for the review to be revealed. This would mostly be done in the front end but it was important to have the backend for it set up.
```
class Review(models.Model):
    spoilers = models.BooleanField(default=False)
    preference = models.CharField(max_length=30)
    text = models.TextField(max_length=300, blank=True)
    differences = models.TextField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    title = models.ForeignKey(
        "adaptations.Adaptation",
        related_name="reviews",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete=models.CASCADE
    )
 ```
Finally users and authentication needed to be created to allow users to register and login.
```
class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied(detail="Invalid auth token format")

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            user = User.objects.get(pk=payload.get('sub'))

        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Token')

        return (user, token)
```
I then spent my final day on backend seeding and dumping my database.

<img width="982" alt="Screenshot 2021-11-03 at 14 13 15" src="https://user-images.githubusercontent.com/87997491/140076679-54273abf-bfed-498a-a5d4-fcc888b12faf.png">

__Day 5 - 7__
These days were spent on the front end. Initially I just wanted to get all my data mapped out on the list component and on the individual titles.
```
<div className="movie-book">
              <div className="movie">
                <h4>MOVIE</h4>
                <img className="movie-image" src={title.movie_image} alt={title.movie_image} />
                <h3>{title.director}</h3>
                <p>{title.movie_release_year}</p>
                <a href={title.movie_link} className="movie-link" rel="noreferrer" target="_blank">
                  <p className="learn-more-btn">Learn more</p>
                </a>
              </div>
              {/* <div className="synopsis">
              <h3>{title.synopsis}</h3>
              {titlesToRender}
            </div> */}
              <div className="book">
                <h4>BOOK</h4>
                <img className="book-image" src={title.book_image} alt={title.book_image} />
                <h3>{title.author}</h3>
                <p>{title.book_release_year}</p>
                <a href={title.book_link} className="movie-link" rel="noreferrer" target="_blank">
                  <p className="learn-more-btn">Learn more</p>
                </a>
              </div>
            </div>
```
Once everything was mapped out I began building my search function, this was pretty simple as I’d done it multiple times before.
```
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredTitles(titles.filter(title => {
      return regexSearch.test(title.name) 
    }))
  }, [setFilteredTitles, filters, titles])
```
What proved to be more challenging was building the filter function that allowed users to filter by genre. Even though this was something that I’d done before, the data seemed to be slow to render this time which caused some bugs. After a couple of hours of playing around with it , I discovered that mapping through the genres and pushing them into a different array seemed to work. I’ve included some clearer elaboration in my code snippet.
```
const handleFilters = (e) => {
    let handleTrue = []
    // map through titles each title we map through as well
    const newFilter = titles.map(t => {
      let trueOrFalse = []
      // genre if it matches e.target.value returns true or false
      t.genres.map(g => {
        if (g.name === e.target.value) {
          // return <p>g.name</p>
          console.log(g.name === e.target.value)
          trueOrFalse.push(g.name === e.target.value)
          console.log(e.target.value)
          // return <p>{e.target.value}</p>
        }
      }),
      // spreads and adds that true value if 
      handleTrue = [...handleTrue, trueOrFalse]
      trueOrFalse = []
      console.log(handleTrue, 'handle true')
    })
    console.log(newFilter, 'new one')
    console.log(handleTrue, ' handle')
    let filteredObjects = []
    let counter = 0
    // map through and checks whether it's true, if it is it pushes that movie into filtered objects. 
    titles.map(movie => {
      if (handleTrue[counter][0] === true) { 
        filteredObjects.push(movie)
      }
      counter = counter += 1
    })
    // if it's all filtered objetcs is equal to all titles. 
    if (e.target.value === 'all') { 
      filteredObjects = titles
    }
    
    setFilteredTitles(filteredObjects)
    console.log('filtered generes data', filteredObjects)
  }
```
Finally I built the spoiler function, where users that posted reviews with spoilers would have their reviews hidden until a button was clicked.
```
{t.spoilers === true ?
          <>
            <button onClick={(e) => handleMoreClick(e.target)}>
              {showMore ? 'Hide' : 'This Review Contains Spoilers'}
            </button>
            {showMore &&
            <>
              <p className='owner-review'>👤 {t.owner.username}</p>
              <span className='key'>Book or Movie? <p>{t.preference}</p></span>
              <span className='key'><p>{t.text}</p></span>
              <span className='key'><p>{t.differences}</p></span>
              {userIsOwner(t.owner.id) && 
              <button className='delete-button' onClick={handleDelete} name={t.id}>DELETE</button>
              }
            </>
            }
          </>
          :
          <>
            <p className='owner-review'>👤 {t.owner.username}</p>
            <span className='key'>Book or Movie? <p>{t.preference}</p></span>

            <span className='key'><p>{t.text}</p></span>
            <span className='key'><p>{t.differences}</p></span>
            {userIsOwner(t.owner.id) && 
            <button className='delete-button' onClick={handleDelete} name={t.id}>DELETE</button>
            }
          </>
        }
```

__Day 8 -10__
My final days were spent on the design. I knew I wanted a hamburger navigation bar. I also added animation to some of the text. I wanted the colors to be muted and elude to a sort of old Hollywood feel, as the app is called The Hollywood Effect - a reference to the way Hollywood often changes details in movie adaptations of books. 

<img width="1217" alt="Screenshot 2021-11-03 at 14 20 04" src="https://user-images.githubusercontent.com/87997491/140077974-aeaa15fc-7878-4844-9ee9-12b8fb8d35dc.png">

<img width="642" alt="Screenshot 2021-11-03 at 14 20 45" src="https://user-images.githubusercontent.com/87997491/140078085-532084a7-6a44-44a2-b30c-2258dbe15e5e.png">

# Wins and Challenges

* The biggest win was making a functional fullstack app using python on the backend.
* I’m delighted with the spoiler feature as this was something I’d never done before.
* I think the styling is very slick but also playful!
* I would’ve liked to style the reviews better but I didn’t have enough time!
* Ideally I would’ve liked to make this a sort of polling app where users could vote whether a movie or book was better but this proved to be more difficult in such a short time-frame. I think this is something I’d definitely like to implement at some point.

# Bugs
* This app is not mobile-responsive as of writing this but I hope to fix that soon!
* Error handling on the login form does not work as of now but that also hopefully is something that can easily be fixed!

# Future Features
* Voting function that allows users to click a button to vote on which they prefer between the book and movie.
* A recommended-for-you function that presents users with titles they might enjoy. This would be informed by a key in registration where users can state the genres they prefer.

# Key Learning
Working alone definitely has its pros and cons. I missed out on the collaborative experience of working with a team - bouncing ideas off each other, etc. I also didn’t get to create as ambitious a project as I would’ve liked to. On the flip side I'm happy that I decided to trust my ability to build a full-stack app on my own, as all the challenges I faced and was able to overcome in this project helped boost my confidence as a developer.



