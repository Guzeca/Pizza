import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => {
              onChangeCategory(i);
            }}
            className={value === i ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

