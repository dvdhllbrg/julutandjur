import { useState } from 'react';
import Head from 'next/head';
import RecipeInfo from '../../components/RecipeInfo';
import { Recipe } from '../../components/RecipeInfoBox';
import recipes from '../../recipes.json';

type RecipesProps = {
  recipes: Recipe[];
};

export default function Recipes({ recipes }: RecipesProps) {
  const [allCategoryNames] = useState([...new Set(recipes.map((r) => r.category))]);
  const [visibleRecipes, setVisibleRecipes] = useState(recipes);
  const [visibleCategoryNames, setVisibleCategoryNames] = useState(allCategoryNames);

  const filter = (sought: string) => {
    let foundRecipes;
    let foundCategoryNames;
    if (sought === '') {
      foundRecipes = recipes;
      foundCategoryNames = allCategoryNames;
    } else {
      foundRecipes = recipes.filter((r) => {
        const search = new RegExp(`.*${sought}.*`, 'i');
        return search.test(r.name) || search.test(r.category);
      });
      foundCategoryNames = [...new Set(foundRecipes.map((r) => r.category))];
    }
    setVisibleRecipes(foundRecipes);
    setVisibleCategoryNames(foundCategoryNames);
  };

  return (
    <>
      <Head>
        <title>Mat - Jul utan djur</title>
      </Head>
      <div>
        <input type="search" className="u-full-width searchbar" placeholder="Sök på recept eller kategori" onChange={(e) => filter(e.target.value)} />
        <RecipeInfo visibleCategoryNames={visibleCategoryNames} visibleRecipes={visibleRecipes} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      recipes,
    },
  };
};
