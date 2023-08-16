import React from "react";

function Sort({value, onChangeSort}) {
 const [open, setOpen] = React.useState(false);
 const list =[
  {name: 'популярности (DESC)', sortProperty: 'rating' },
  {name: 'популярности (ASC)', sortProperty: '-rating' },
  {name: 'цене (DESC)', sortProperty: 'price' },
  {name: 'цене (ASC)', sortProperty: '-price' },
  {name: 'алфавиту (DESC)', sortProperty: 'title' },
  {name: 'алфавиту (ASC)', sortProperty: '-title' },
 ];

 const onClickListItem = (i) => {
  onChangeSort(i);
  setOpen(false);
 }
  return ( 
    
      <div className="sort">
        <div className="sort__label">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10 L50 50"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по</b>
          <span onClick={() => setOpen(!open)}>{value.name}</span>
        </div> 
        {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li 
              key={i}
              onClick={() => onClickListItem(obj)}
              className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
              {obj.name} 
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    
  );
}

export default Sort;
