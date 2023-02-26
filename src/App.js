import React from 'react';
import {Collection} from './Collection';
import './index.scss';

function App() {

  const [searchValue, setSearchValue] = React.useState('');
  const [page,setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    fetch('https://63fa96d72027a45d8d59a203.mockapi.io/api/v1/photo_categories')
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка пполучения данных (категории)');
      });
  },[]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `&category=${categoryId}`:``;

    fetch(`https://63fa96d72027a45d8d59a203.mockapi.io/api/v1/photo_collections?page=${page}&limit=3${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка пполучения данных');
      }).finally(() => {setIsLoading(false)});
  },[categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li onClick={() => setCategoryId(0)} className={categoryId === 0 ? 'active': ''}>Все</li>
          {categories.map((obj,index) => (
            <li onClick={() => setCategoryId(index+1)} className={categoryId === index + 1 ? 'active': ''}>{obj.name}</li>
          ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos} />
        )))}

      </div>
      <ul className="pagination">
        {
          [ ...Array(5)].map((_, i) => (
            <li onClick={() => setPage( i + 1 ) } className={page === ( i + 1 )  ? 'active' : ''}>
              { i + 1 }
            </li>
            ))}
      </ul>
    </div>
  );
}

export default App;
