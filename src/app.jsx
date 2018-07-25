import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import _ from 'underscore';
import request from 'superagent';

function slugify(name) {
  return name
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}

function replaceNewlines(str) {
  return {__html: '<p>' + (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1</p><p>$2') + '</p>'};
}

function nl2br(str) {
  return {__html: (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2')};
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class FoodInfoBox extends React.Component {
  render() {
    return ( 
      <div className="foodInfoBox three columns">
        <Link to={`/mat/${this.props.category}/${this.props.slug}/`}>
          <img src={`/img/${this.props.image}`} width="450" height="300" className="u-max-full-width" />
          <div className="foodInfoText">
            <h6>{this.props.name}</h6>
            <p>{this.props.info}</p>
          </div>
        </Link>
      </div>
    );
  }
}

class FoodInfo extends React.Component {
  render() {
    let foodInfo = [];
    let categories = _.groupBy(this.props.visibleFood, r => r.category );
    let singleCategory = this.props.visibleCategoryNames.length == 1;
    let nrOfBoxes;
    _.each(this.props.visibleCategoryNames, (categoryName, i) => {

      let foodInfoBoxes = [];
      let foodInfoRows = [];
      nrOfBoxes = Math.min(categories[categoryName].length, 4);
      if(singleCategory) {
        nrOfBoxes = categories[categoryName].length;
      } else if(window.innerWidth < 767) {
        nrOfBoxes = 1;
      }
      foodInfo.push(<TitleRow key={categoryName} categoryName={categoryName} showMore={!singleCategory && categories[categoryName].length > nrOfBoxes} />);
      
      for(let j=1; j<=nrOfBoxes; j++) {
        let food = categories[categoryName][j-1];
        foodInfoBoxes.push(<FoodInfoBox key={food._id} category={food.category} slug={food.slug} name={food.name} image={food.image} info={food.info} />);

        if(j % 4 == 0) {
          foodInfoRows.push(<Row key={i} foodInfoBoxes={foodInfoBoxes} />);
          foodInfoBoxes = [];
        }
      }
      
      foodInfoRows.push(<Row key={Math.round(categories[categoryName].length/2)} foodInfoBoxes={foodInfoBoxes} />);
      foodInfo.push(foodInfoRows);
    });
    return (
      <div className="foodInfo">
        {foodInfo}
      </div>
    );
  }
}

class TitleRow extends React.Component {
  render() {
    return (
      <div className="row">
        <h4 className="title-row" key={this.props.categoryName}><Link to={`/mat/${this.props.categoryName}/`}>{capitalize(this.props.categoryName)}</Link></h4>
        {this.props.showMore ? <Link className="show-more" to={`/mat/${this.props.categoryName}/`}>Fler&nbsp;»</Link> : null}
      </div>
    )
  }
}

class Row extends React.Component {
  render() {
    return (
      <div key={this.props.key} className="row">
        {this.props.foodInfoBoxes}
      </div>
    )
  }
}

class Food extends React.Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
    this.state = {
      allFood: [],
      allCategoryNames: [],
      visibleFood: [],
      categoryName: '',
      visibleCategoryNames: []
    };
  }
  componentDidMount() {
    request.get('/recipes')
      .end((err, res) => {
        this.setState({
          allFood: _.sortBy(res.body, r => r.category),
          visibleFood: _.sortBy(res.body, r => r.category)
        });
        if(typeof this.props.params.category !== 'undefined') {
          this.setState({categoryName: this.props.params.category.charAt(0).toUpperCase() + this.props.params.category.slice(1)});
          this.setState({
            visibleFood: _.where(res.body, {category: this.props.params.category})
          });
        }
      });
      request.get('/recipes/categories')
        .end((err, res) => {
          if(res.statusCode == 404) {
            this.setState({notFound: <NotFound />});
          }
          else {
            this.setState({
              allCategoryNames: _.sortBy(res.body, r => r.category),
            });
            if(typeof this.props.params.category === 'undefined') {
              this.setState({
                visibleCategoryNames: _.sortBy(res.body, r => r.category)
              });
            } else {
              this.setState({
                visibleCategoryNames: [this.props.params.category]
              });
            }
          }
        });
  }
  filter() {
    let sought = this.refs.textFilter.value;
    let foundFood, foundCategoryNames;
    if(sought == '') {
      foundFood = this.state.allFood;
      foundCategoryNames = this.state.allCategoryNames;
    } else {
      let searchableFood = this.state.allFood;
      if(typeof this.props.params.category !== 'undefined') {
        searchableFood = _.where(searchableFood, {category: this.props.params.category});
      }
      foundFood = _.filter(searchableFood, food => {
        let search = new RegExp(`.*${sought}.*`, 'i');
        return search.test(food.name) || search.test(food.category);
      });
      foundCategoryNames = _.uniq(_.pluck(foundFood, 'category'));
    }
    this.setState({
      visibleFood: foundFood,
      visibleCategoryNames: foundCategoryNames
    });
  }
  componentWillReceiveProps(nextProps) {
    if(typeof this.refs.textFilter !== 'undefined') {
      this.refs.textFilter.value = '';
    }
    let visibleFood = this.state.allFood;
    let visibleCategoryNames = this.state.allCategoryNames;
    if(typeof nextProps.params.category !== 'undefined') {
      this.setState({categoryName: nextProps.params.category.charAt(0).toUpperCase() + nextProps.params.category.slice(1)});
      visibleFood = _.where(visibleFood, {category: nextProps.params.category});
      visibleCategoryNames = [nextProps.params.category];
    }
    this.setState({
      visibleFood: visibleFood,
      visibleCategoryNames: visibleCategoryNames
    });
  }
  render() {
    if(!this.props.children) {
      document.title = this.state.visibleCategoryNames.length > 1 ? 'Jul utan djur' : this.state.categoryName + ' - Jul utan djur';
    }
    let notFound = false;
    if(this.state.visibleCategoryNames.length == 1 && this.state.visibleFood.length == 0) {
      document.title = '404 - Jul utan djur';
      notFound = <NotFound />;
    }
    return (
      <div>
        {notFound || 
          <div>
          {this.props.children || 
            <div>
              <input ref="textFilter" type="search" className="u-full-width searchbar" placeholder="Sök på recept eller kategori" onChange={this.filter} />
              <div>
                {typeof this.props.params.category === 'undefined' ? null : <span><Link to="/mat/">Mat</Link>&nbsp;>&nbsp;<Link to={`/mat/${this.props.params.category}/`}>{this.state.categoryName}</Link></span>}
              </div>  
              <FoodInfo visibleCategoryNames={this.state.visibleCategoryNames} visibleFood={this.state.visibleFood} />
            </div>
          }
          </div>
        }
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    document.title = 'Jul utan djur';
    return (
      <div>
        <p>Varje december får hundratusentals djur (<a href="http://www.svensktkott.se/aktuellt/nyheter/fakta-om-julskinka/">400 000 grisar bara för julskinkan</a>) sätta livet till, 
          bara för att vi vill sätta kött på julbordet. Detta är inte bara sorgligt för djuren, utan också
          för miljön – <a href="http://www.livsmedelsverket.se/matvanor-halsa--miljo/miljo/miljosmarta-matval2/kott/">enligt Jordbruksverket står köttproduktionen för nästan 15 % av världens totala utsläpp
          av växthusgaser</a>.</p>
        <p>Så här behöver det inte vara. Det finns ingenting som säger att vi måste äta djur bara för att det
          är jul. Det finns hundratals veganska (fria från kött, mjölk, ägg och andra animaliska produkter) 
          alternativ som är precis lika goda (eller godare!) och som inte kräver något lidande eller död. 
          Låter inte det mycket bättre?</p>
        <p>Vissa tror att veganer bara äter tofu och linser dagarna i ända och lider av sådan
          näringsbrist att de faller ihop för minsta vindpust. Det kunde inte vara längre från sanningen!
          Visst finns det några tofurecept här på sajten (testa ett, du kanske blir förvånad!), men det finns
          en enorm bredd i vegetabiliska livsmedel – ingen risk att du tröttnar! Och näringen? <a href="http://www.vegokoll.se/naringen">Det råder
          ingen brist på den heller.</a></p>
        <p>Välj en vegansk jul i år! För djurens, miljöns och din egen skull.</p>
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    document.title = 'Jul utan djur';
    return (
      <div>
        <p>Jag som har byggt den här sajten heter David, men recepten kommer från massor av olika,
          fantastiska människor. Ett stort tack till alla som har låtit mig låna recept! Besök gärna
          deras sidor för fler recept:</p>
        <ul>
          <li><a href="http://vegania.net/">Vegania</a></li>
          <li><a href="http://veganen.blogspot.se/">Veganrecept & Galna Upptåg</a></li>
          <li><a href="http://veganvrak.blogspot.se/">Veganvrak</a></li>
          <li><a href="http://vegankrubb.se/">Vegankrubb</a></li>
          <li><a href="http://javligtgott.se/">Jävligt gott</a></li>
          <li><a href="http://amyspieceofcake.blogspot.se/">Amy's piece of cake</a></li>
          <li><a href="http://vardagsmatad.se/">Vardagsmatad</a></li>
          <li><a href="http://veganvintage.wordpress.com/">Veganvintage</a></li>
          <li><a href="http://vegokoll.se">Vegokoll</a></li>
          <li><a href="http://goodstore.se">Goodstore</a></li>
          <li><a href="http://pintomagasin.se">Pinto</a></li>
        </ul>
        <p>Stort tack också till podcasten <a href="http://www.veganprat.se/">Veganprat</a> som, förutom att
          vara allmänt grym, gav den ursprungliga inspirationen till denna sajt!</p>
        <p>Om du vill fortsätta göra gott för djuren och miljön även efter jul, eller bara är nyfiken på hur
          veganlivet är, rekommenderas <a href="http://veganutmaningen.se/">Den stora veganutmaningen</a> som samlar många tips, recept och information
          för personer som nyligen blivit veganer eller funderar på att bli det. Det finns också många Facebookgrupper som samlar
	  människor som vill prata om veganism eller inspireras av vad andra äter. Ett exempel är <a href="http://www.facebook.com/groups/liteinspiration/">Bara lite jävla inspiration (om vegansk mat)</a> som rätt och slätt samlar "tips och idéer på god, vegansk mat"
	  (utan några andra krav än just att det ska vara veganskt) och som är väldigt bra.</p>
        <p>Om du vill lära dig mer om djurrätt eller vad veganism faktiskt innebär
          rekommenderas <a href="http://www.djurensratt.se/vara-fragor">Djurens Rätts faktaarkiv</a> där det går att hitta
          information om det mesta. Vill du lära dig mer om hur det går till i djurindustrin rekommenderas
          Djurrättsalliansens fantastiska projekt <a href="http://djurfabriken.se/">Djurfabriken</a>.</p>
      </div>
    )
  }
}

class Admin extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    let recipe = {};
    _.each(this.refs, ref => {
      if(ref.id != 'img') {
        recipe[ref.id] = ref.value;
      }
    });
    recipe.slug = slugify(recipe.name);

    let image = this.refs.image.files[0];
    recipe.image = recipe.slug + image.name.substring(image.name.lastIndexOf('.'));
    let valid = true;
    _.each(recipe, attribute => {
      if(attribute == '') {
        valid = false;
      }
    });
    if(valid) {
      request.post('/recipes/image')
        .field('slug', recipe.slug)
        .attach('img', image)
        .end(res => {
          request.post('/recipes')
            .send(recipe)
            .end(res => {
              this.refs.recipeForm.reset();
            });
        });
    }
  }
  render() {
    return (
      <form ref="recipeForm">
        <label htmlFor="name">Namn</label>
        <input ref="name" type="text" id="name" className="u-full-width" />
        
        <label htmlFor="category">Kategori</label>
        <input ref="category" type="text" id="category" className="u-full-width" />

        <label htmlFor="info">Information</label>
        <textarea ref="info" id="info" className="u-full-width"></textarea>

        <label htmlFor="srcName">Källa</label>
        <input type="text" ref="srcName" id="srcName" className="u-full-width" />

        <label htmlFor="src">Källans URL</label>
        <input type="text" ref="src" id="src" className="u-full-width" />

        <label htmlFor="ingredients">Ingredienser</label>
        <textarea ref="ingredients" id="ingredients" className="u-full-width"></textarea>

        <label htmlFor="text">Text</label>
        <textarea ref="text" id="text" className="u-full-width"></textarea>
    
        <label htmlFor="image">Bild</label>
        <input ref="image" type="file" accept="image/jpeg, image/png" id="image" />

        <button onClick={this.submitForm}>Spara</button>
      </form>
    )
  }
}

class Recipe extends React.Component {
  constructor() {
    super();
    this.state = {food: {name: '',
                    slug: '',
                    category: '',
            		    src: '',
            		    srcName: '',
                    ingredients: '',
                    text: '',
                    image: '',
                    photographer: ''},
                notFound: false};
  }
  componentDidMount() {
    request.get(`/recipes/${this.props.params.category}/${this.props.params.slug}`)
      .end((err, res) => {
        if(res.statusCode == 404) {
          this.setState({notFound: <NotFound />})
        } else {
          this.setState({food: res.body[0]});
        }
      });
  }
  render() {
    let food = this.state.food;
    if(this.state.notFound) {
      document.title = '404 - Jul utan djur';
    } else {
      document.title = food.name + ' - Jul utan djur';
    }
    return (
      <div>
        {this.state.notFound || 
        <div>
          <div>
            <Link to="/mat/">Mat</Link>
            <span>&nbsp;>&nbsp;<Link to={`/mat/${food.category}/`}>{capitalize(food.category)}</Link></span>
            <span>&nbsp;>&nbsp;<Link to={`/mat/${food.category}/${food.slug}/`}>{food.name}</Link></span>
          </div>
          <div className="foodInfo">
            <div className="row">
              <div className="main-food-info seven columns">
                <h2>{food.name}</h2>
                <p>Av <a href={food.src}>{food.srcName}</a>.</p>
                <div dangerouslySetInnerHTML={replaceNewlines(food.info)} />
              </div>
              <img src={`/img/${food.image}`} width="900" height="500" className="u-max-full-width five columns recipe-image" />
              <span className="photographer">Foto: {food.photographer}.</span>
            </div>
            <div className="row">
              <div className="three columns">
                <h4>Ingredienser</h4>
                <div dangerouslySetInnerHTML={nl2br(food.ingredients)} />
              </div>
              <div className="nine columns instructions">
                <h4>Gör så här</h4>
                <div dangerouslySetInnerHTML={replaceNewlines(food.text)} />
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>Projektet <b>Jul utan djur</b> drivs av <a href="http://davidhallberg.se/">David Hallberg Jönsson</a>. 
        Alla recept och bilder tillhör sina respektive upphovspersoner.</p>
        <p>Kontakt: <a href="mailto:d@vidhallberg.se">d@vidhallberg.se</a></p>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    let path = 'food';
    if(this.props.location.pathname == '/') {
      path = 'home';
    } else if(this.props.location.pathname == '/om/') {
      path = 'about';
    }
    return (
      <div className="subwrapper">
        <div className="menu row">
          <h1 className="logo"><Link to="/">Jul utan djur</Link></h1>
          <Link className={"menuitem" + (path == 'home' ? ' active' : '')} to="/">Hem</Link>
          <Link className={"menuitem" + (path == 'food' ? ' active' : '')} to="/mat/">Mat</Link>
          <Link className={"last menuitem" + (path == 'about' ? ' active' : '')} to="/om/">Om</Link>
          </div>
        <div className="container">
          {this.props.children || <Home />}
        </div>
        <Footer />
      </div>
    )
  }
}

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <p>Oj då! Den där sidan kunde inte hittas.</p>
        <p>Kanske var det <Link to="/mat/janssons">Janssons frestelse</Link> du var sugen på?</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="mat" component={Food} />
      <Route path="mat/:category" component={Food}>
        <Route path=":slug" component={Recipe} />
      </Route>
      <Route path="om" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('wrapper')
);
