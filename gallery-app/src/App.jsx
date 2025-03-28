import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './components/Collection';

const cats = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
];

function App() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const category = activeCategory ? `category=${activeCategory}` : "";

        fetch(
            `https://67e309c197fc65f535388842.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
        )
            .then((res) => res.json())
            .then(setCollections)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [activeCategory, page]);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {cats.map((obj, i) => (
                        <li
                            key={i}
                            onClick={() => setActiveCategory(i)}
                            className={activeCategory === i ? "active" : ""}
                        >
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Поиск по названию"
                />
            </div>

            <div className="content">
                {isLoading ? (
                    <h2>Идёт загрузка...</h2>
                ) : (
                    collections
                        .filter((obj) =>
                            obj.name.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((obj) => (
                            <Collection key={obj.id} name={obj.name} images={obj.photos} />
                        ))
                )}
            </div>

            <ul className="pagination">
                {[...Array(3)].map((_, i) => (
                    <li
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;